import { Feather, Ionicons } from "@expo/vector-icons"; // npx expo install @expo/vector-icons
import { ReactNode, useState } from "react";
import {
  FlatList,
  Image,
  ImageSourcePropType,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context"; // npx expo install react-native-safe-area-context

const RED = "#D9001B";
const BORDER = "#E5E5E5";

export type SizeInfo = { label: string; value: string };

export type ContentBlock =
  | { type: "heading"; text: string }
  | {
      type: "image";
      source: ImageSourcePropType | null;
      aspectRatio?: number;
      rounded?: boolean;
    }
  | { type: "size"; source: ImageSourcePropType | null; info: SizeInfo[] };

export type Product = {
  id: string;
  name: string;
  price: number;
  isNew?: boolean;
  globalExpress?: boolean;
  images: (ImageSourcePropType | null)[];
  details: string[];
  shipping: string;
  content?: ContentBlock[]; // rich description shown below the accordions
};

// Replace each `images` entry with { uri: '...' } or require('./assets/xyz.png')
const DEFAULT_PRODUCT: Product = {
  id: "hirono-hundreds-blister",
  name: "Hirono × The Hundreds Blister",
  price: 1700,
  isNew: true,
  globalExpress: true,
  images: [null, null, null],
  details: [
    "Brand: POP MART",
    "Product size: Height about 9.5cm",
    "Main material: PVC/ABS",
  ],
  shipping:
    "Shipping fees and delivery times are calculated at checkout. Please check our after-sale policy for returns and exchanges.",
  // Set each `source` to { uri: '...' } or require('./assets/xyz.png')
  content: [
    { type: "image", source: null, aspectRatio: 1107 / 640 },
    { type: "heading", text: "PRODUCT SIZE" },
    {
      type: "size",
      source: null,
      info: [
        { label: "Height", value: "about 9.5cm" },
        { label: "iPhone 16 Pro Height", value: "about 15cm" },
      ],
    },
    { type: "heading", text: "PRODUCT SHOW" },
    { type: "image", source: null, aspectRatio: 1049 / 700, rounded: true },
    { type: "image", source: null, aspectRatio: 1049 / 700, rounded: true },
  ],
};

const formatPrice = (n: number): string =>
  `₱${n.toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

/* ---------- Pieces ---------- */

type GalleryProps = {
  images: (ImageSourcePropType | null)[];
  onBack: () => void;
  onShare: () => void;
};

function Gallery({ images, onBack, onShare }: GalleryProps) {
  const { width } = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const insets = useSafeAreaInsets();

  return (
    <View style={{ width, height: width, backgroundColor: "#F5F5F5" }}>
      <FlatList
        data={images}
        keyExtractor={(_, i) => String(i)}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e: NativeSyntheticEvent<NativeScrollEvent>) =>
          setIndex(Math.round(e.nativeEvent.contentOffset.x / width))
        }
        renderItem={({ item }) => (
          <View
            style={{
              width,
              height: width,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {item && (
              <Image
                source={item}
                style={styles.galleryImg}
                resizeMode="contain"
              />
            )}
          </View>
        )}
      />

      <View
        style={[styles.galleryTop, { paddingTop: insets.top }]}
        pointerEvents="box-none"
      >
        <View style={styles.galleryTopRow} pointerEvents="box-none">
          <Pressable onPress={onBack} hitSlop={12}>
            <Feather name="arrow-left" size={24} color="#111" />
          </Pressable>
          <Pressable onPress={onShare} hitSlop={12}>
            <Feather name="share" size={22} color="#111" />
          </Pressable>
        </View>
      </View>

      <Text style={styles.counter}>
        {index + 1} / {images.length}
      </Text>
    </View>
  );
}

type StickyHeaderProps = {
  title: string;
  onBack: () => void;
  onShare: () => void;
};

// Compact white header that appears once the gallery has scrolled away
function StickyHeader({ title, onBack, onShare }: StickyHeaderProps) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.sticky, { paddingTop: insets.top }]}>
      <View style={styles.stickyRow}>
        <Pressable onPress={onBack} hitSlop={12} style={styles.stickyBtn}>
          <Feather name="arrow-left" size={24} color="#111" />
        </Pressable>
        <Text style={styles.stickyTitle} numberOfLines={1}>
          {title}
        </Text>
        <Pressable
          onPress={onShare}
          hitSlop={12}
          style={[styles.stickyBtn, { alignItems: "flex-end" }]}
        >
          <Feather name="share" size={22} color="#111" />
        </Pressable>
      </View>
    </View>
  );
}

function ContentImage({
  source,
  aspectRatio = 16 / 10,
  rounded,
}: {
  source: ImageSourcePropType | null;
  aspectRatio?: number;
  rounded?: boolean;
}) {
  return (
    <View
      style={[
        styles.contentImage,
        { aspectRatio },
        rounded && styles.contentImageRounded,
      ]}
    >
      {source && (
        <Image
          source={source}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
        />
      )}
    </View>
  );
}

function SizeBlock({
  source,
  info,
}: {
  source: ImageSourcePropType | null;
  info: SizeInfo[];
}) {
  return (
    <View style={styles.sizeRow}>
      <View style={styles.sizeImage}>
        {source && (
          <Image
            source={source}
            style={StyleSheet.absoluteFill}
            resizeMode="contain"
          />
        )}
      </View>
      <View style={styles.sizeInfo}>
        {info.map((i) => (
          <View key={i.label} style={styles.sizeItem}>
            <Text style={styles.sizeLabel}>{i.label}</Text>
            <Text style={styles.sizeValue}>{i.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function ContentBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <View style={styles.contentSection}>
      {blocks.map((b, i) => {
        switch (b.type) {
          case "heading":
            return (
              <Text key={i} style={styles.contentHeading}>
                {b.text}
              </Text>
            );
          case "image":
            return (
              <ContentImage
                key={i}
                source={b.source}
                aspectRatio={b.aspectRatio}
                rounded={b.rounded}
              />
            );
          case "size":
            return <SizeBlock key={i} source={b.source} info={b.info} />;
        }
      })}
    </View>
  );
}

type QtyButtonProps = {
  icon: "plus" | "minus";
  onPress: () => void;
  disabled?: boolean;
};

function QtyButton({ icon, onPress, disabled }: QtyButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[styles.qtyBtn, { borderColor: disabled ? "#CFCFCF" : "#111" }]}
    >
      <Feather name={icon} size={16} color={disabled ? "#8A8A8A" : "#111"} />
    </Pressable>
  );
}

type AccordionProps = {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
};

function Accordion({ title, open, onToggle, children }: AccordionProps) {
  return (
    <View style={styles.accordion}>
      <Pressable style={styles.accordionHeader} onPress={onToggle}>
        <Text style={styles.accordionTitle}>{title}</Text>
        <Feather
          name={open ? "chevron-up" : "chevron-down"}
          size={18}
          color="#111"
        />
      </Pressable>
      {open && <View style={styles.accordionBody}>{children}</View>}
    </View>
  );
}

/* ---------- Screen ---------- */

type NavigationLike = {
  goBack: () => void;
  canGoBack?: () => boolean;
};

type ProductDetailScreenProps = {
  product?: Product;
  navigation?: NavigationLike; // passed automatically by React Navigation
  onBack?: () => void;
  onOpenCart?: () => void;
  onAddToCart?: (product: Product, qty: number) => void;
  onBuyNow?: (product: Product, qty: number) => void;
};

export default function ProductDetailScreen({
  product = DEFAULT_PRODUCT,
  navigation,
  onBack,
  onOpenCart,
  onAddToCart,
  onBuyNow,
}: ProductDetailScreenProps) {
  const [qty, setQty] = useState<number>(1);
  const [liked, setLiked] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(true);
  const [shippingOpen, setShippingOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(false);
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  // Show the compact header once the gallery is (almost) scrolled out of view
  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const past = e.nativeEvent.contentOffset.y > width - 90 - insets.top;
    if (past !== showHeader) setShowHeader(past);
  };

  const share = () => Share.share({ message: product.name });
  
  const handleBack = () => {
    if (onBack) onBack();
    else if (navigation?.canGoBack?.() ?? true) navigation?.goBack();
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        <Gallery images={product.images} onBack={handleBack} onShare={share} />

        {product.globalExpress && (
          <View style={styles.express}>
            <Ionicons name="planet-outline" size={17} color="#2F80D8" />
            <Text style={styles.expressText}>GLOBAL EXPRESS</Text>
          </View>
        )}

        <View style={styles.content}>
          <View style={styles.badgeRow}>
            {product.isNew ? (
              <View style={styles.newBadge}>
                <Text style={styles.newText}>NEW</Text>
              </View>
            ) : (
              <View />
            )}
            <Pressable onPress={() => setLiked((v) => !v)} hitSlop={12}>
              <Ionicons
                name={liked ? "heart" : "heart-outline"}
                size={26}
                color={RED}
              />
            </Pressable>
          </View>

          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>{formatPrice(product.price)}</Text>

          <Text style={styles.qtyLabel}>Quantity</Text>
          <View style={styles.qtyRow}>
            <QtyButton
              icon="minus"
              disabled={qty <= 1}
              onPress={() => setQty((q) => Math.max(1, q - 1))}
            />
            <Text style={styles.qtyValue}>{qty}</Text>
            <QtyButton icon="plus" onPress={() => setQty((q) => q + 1)} />
          </View>

          <Accordion
            title="Details"
            open={detailsOpen}
            onToggle={() => setDetailsOpen((v) => !v)}
          >
            {product.details.map((line) => (
              <Text key={line} style={styles.bodyText}>
                {line}
              </Text>
            ))}
          </Accordion>

          <Accordion
            title="Shipping & Aftersale Service"
            open={shippingOpen}
            onToggle={() => setShippingOpen((v) => !v)}
          >
            <Text style={styles.bodyText}>{product.shipping}</Text>
          </Accordion>
        </View>

        {product.content && <ContentBlocks blocks={product.content} />}
      </ScrollView>

      {showHeader && (
        <StickyHeader
          title={product.name}
          onBack={handleBack}
          onShare={share}
        />
      )}

      {/* Sticky bottom bar */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom }]}>
        <View style={styles.bottomRow}>
          <Pressable onPress={onOpenCart} hitSlop={10} style={styles.bagBtn}>
            <Feather name="shopping-bag" size={24} color="#111" />
          </Pressable>
          <Pressable
            style={styles.addBtn}
            onPress={() => onAddToCart?.(product, qty)}
          >
            <Text style={styles.addText}>ADD TO CART</Text>
          </Pressable>
          <Pressable
            style={styles.buyBtn}
            onPress={() => onBuyNow?.(product, qty)}
          >
            <Text style={styles.buyText}>BUY NOW</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff" },

  // Gallery
  galleryImg: { width: "85%", height: "85%" },
  galleryTop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    elevation: 10,
  },
  galleryTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingTop: 10,
  },
  counter: {
    position: "absolute",
    right: 11,
    bottom: 8,
    fontSize: 13,
    color: "#444",
  },

  // Banner
  express: {
    height: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    backgroundColor: "#DDEBFA",
  },
  expressText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#2F80D8",
    letterSpacing: 0.3,
  },

  // Content
  content: { paddingHorizontal: 13, paddingTop: 13 },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  newBadge: {
    backgroundColor: "#000",
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  newText: { color: "#fff", fontSize: 10, fontWeight: "500" },
  name: { fontSize: 18, fontWeight: "800", color: "#111", marginTop: 13 },
  price: { fontSize: 15, color: RED, marginTop: 14 },

  qtyLabel: { fontSize: 13, fontWeight: "800", color: "#111", marginTop: 15 },
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 9,
    marginBottom: 16,
  },
  qtyBtn: {
    width: 30,
    height: 30,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  qtyValue: { width: 32, textAlign: "center", fontSize: 13, color: "#111" },

  // Accordion
  accordion: { borderTopWidth: 1, borderTopColor: BORDER },
  accordionHeader: {
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  accordionTitle: { fontSize: 13, color: "#111" },
  accordionBody: { paddingBottom: 16 },
  bodyText: { fontSize: 13, lineHeight: 24, color: "#6B6B6B" },

  // Sticky header
  sticky: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 20,
    elevation: 20,
    backgroundColor: "#fff",
  },
  stickyRow: {
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
  },
  stickyBtn: { width: 40 },
  stickyTitle: { flex: 1, textAlign: "center", fontSize: 17, color: "#111" },

  // Rich content
  contentSection: { paddingTop: 8 },
  contentHeading: {
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
    color: "#000",
    marginTop: 44,
    marginBottom: 36,
  },
  contentImage: {
    marginHorizontal: 12,
    backgroundColor: "#EDEDED",
    overflow: "hidden",
  },
  contentImageRounded: {
    marginHorizontal: 22,
    borderRadius: 10,
    marginBottom: 14,
  },
  sizeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 40,
    marginBottom: 40,
  },
  sizeImage: { width: 110, height: 125, backgroundColor: "#F2F2F2" },
  sizeInfo: { alignItems: "flex-end", gap: 18 },
  sizeItem: { alignItems: "flex-end", gap: 4 },
  sizeLabel: { fontSize: 17, fontWeight: "700", color: "#000" },
  sizeValue: { fontSize: 15, color: "#111" },

  // Bottom bar
  bottomBar: {
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: BORDER,
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    paddingHorizontal: 13,
    paddingTop: 13,
    paddingBottom: 9,
  },
  bagBtn: { width: 26, alignItems: "center", marginRight: 4 },
  addBtn: {
    flex: 1,
    height: 53,
    borderWidth: 2,
    borderColor: "#111",
    alignItems: "center",
    justifyContent: "center",
  },
  addText: { fontSize: 13, color: "#111" },
  buyBtn: {
    flex: 1,
    height: 53,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  buyText: { fontSize: 13, color: "#fff" },
});
