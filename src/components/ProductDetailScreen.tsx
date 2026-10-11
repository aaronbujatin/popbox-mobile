import { Product, ProductUnit } from "@/types/Product";
import { Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ReactNode, useEffect, useState } from "react";
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
import { useSafeAreaInsets } from "react-native-safe-area-context";
import RecommendProduct from "./RecommendProduct";

const RED = "#D9001B";
const BORDER = "#E5E5E5";

const DEFAULT_PRODUCT: Product = {
  id: "hirono-hundreds-blister",
  name: "Hirono × The Hundreds Blister",
  price: 1700,
  isNew: true,
  globalExpress: true,
  images: [
    {
      uri: "https://prod-apac-r2.popmart.com/cdn-cgi/image/width=1080%2Cformat=webp/https://prod-apac-r2.popmart.com/uploads/y7MYxfX00I1FepbkFNPTDpuENxGL0eym/5IDvucC01gVbtgqn-1787297275-1.jpg",
    },
    {
      uri: "https://prod-apac-r2.popmart.com/cdn-cgi/image/width=640%2Cformat=webp/https://prod-apac-r2.popmart.com/uploads/y7MYxfX00I1FepbkFNPTDpuENxGL0eym/xNMlcV68x9lYGAOP-1787297275-2.jpg",
    },
    {
      uri: "https://prod-apac-r2.popmart.com/cdn-cgi/image/width=640%2Cformat=webp/https://prod-apac-r2.popmart.com/uploads/y7MYxfX00I1FepbkFNPTDpuENxGL0eym/IAiave6q5ixzI6pi-1787297275-3.jpg",
    },
  ],
  details: [
    "Brand: POP MART",
    "Product size: Height about 9.5cm",
    "Main material: PVC/ABS",
  ],
  shipping:
    "Shipping fees and delivery times are calculated at checkout. Please check our after-sale policy for returns and exchanges.",
  imageContents: [
    "https://prod-apac-r2.popmart.com/cdn-cgi/image/width=828%2Cformat=webp/https://prod-apac-r2.popmart.com/uploads/y7MYxfX00I1FepbkFNPTDpuENxGL0eym/aZ6xsHKZUuwKHNkk-1787297216-%E5%AE%98%E7%BD%91-EN_01.jpg",
    "https://prod-apac-r2.popmart.com/cdn-cgi/image/width=828%2Cformat=webp/https://prod-apac-r2.popmart.com/uploads/y7MYxfX00I1FepbkFNPTDpuENxGL0eym/4nI9ApgObMpYKf5O-1787297216-%E5%AE%98%E7%BD%91-EN_02.jpg",
    "https://prod-apac-r2.popmart.com/cdn-cgi/image/width=828%2Cformat=webp/https://prod-apac-r2.popmart.com/uploads/y7MYxfX00I1FepbkFNPTDpuENxGL0eym/D9ZpH1eRHpdIfNAI-1787297216-%E5%AE%98%E7%BD%91-EN_03.jpg",
    "https://prod-apac-r2.popmart.com/cdn-cgi/image/width=828%2Cformat=webp/https://prod-apac-r2.popmart.com/uploads/y7MYxfX00I1FepbkFNPTDpuENxGL0eym/mzBtiAl-aRmAwQlv-1787297216-%E5%AE%98%E7%BD%91-EN_04.jpg",
  ],
  isSeries: true,
  productUnits: [
    { id: "single", label: "Single Box", outOfStock: true, price: 1700 },
    { id: "set", label: "Whole Set", outOfStock: false, price: 3400 },
  ],
};

const DEFAULT_PRODUCT_RECOMMENDATION: Product[] = [
  {
    id: "hirono-hundreds-blister",
    name: "Hirono × The Hundreds Blister",
    price: 1700,
    isNew: true,
    globalExpress: true,
    images: [
      {
        uri: "https://prod-apac-r2.popmart.com/cdn-cgi/image/width=1080%2Cformat=webp/https://prod-apac-r2.popmart.com/uploads/y7MYxfX00I1FepbkFNPTDpuENxGL0eym/5IDvucC01gVbtgqn-1787297275-1.jpg",
      },
      {
        uri: "https://prod-apac-r2.popmart.com/cdn-cgi/image/width=640%2Cformat=webp/https://prod-apac-r2.popmart.com/uploads/y7MYxfX00I1FepbkFNPTDpuENxGL0eym/xNMlcV68x9lYGAOP-1787297275-2.jpg",
      },
      {
        uri: "https://prod-apac-r2.popmart.com/cdn-cgi/image/width=640%2Cformat=webp/https://prod-apac-r2.popmart.com/uploads/y7MYxfX00I1FepbkFNPTDpuENxGL0eym/IAiave6q5ixzI6pi-1787297275-3.jpg",
      },
    ],
    details: [
      "Brand: POP MART",
      "Product size: Height about 9.5cm",
      "Main material: PVC/ABS",
    ],
    shipping:
      "Shipping fees and delivery times are calculated at checkout. Please check our after-sale policy for returns and exchanges.",
    imageContents: [
      "https://prod-apac-r2.popmart.com/cdn-cgi/image/width=828%2Cformat=webp/https://prod-apac-r2.popmart.com/uploads/y7MYxfX00I1FepbkFNPTDpuENxGL0eym/aZ6xsHKZUuwKHNkk-1787297216-%E5%AE%98%E7%BD%91-EN_01.jpg",
      "https://prod-apac-r2.popmart.com/cdn-cgi/image/width=828%2Cformat=webp/https://prod-apac-r2.popmart.com/uploads/y7MYxfX00I1FepbkFNPTDpuENxGL0eym/4nI9ApgObMpYKf5O-1787297216-%E5%AE%98%E7%BD%91-EN_02.jpg",
      "https://prod-apac-r2.popmart.com/cdn-cgi/image/width=828%2Cformat=webp/https://prod-apac-r2.popmart.com/uploads/y7MYxfX00I1FepbkFNPTDpuENxGL0eym/D9ZpH1eRHpdIfNAI-1787297216-%E5%AE%98%E7%BD%91-EN_03.jpg",
      "https://prod-apac-r2.popmart.com/cdn-cgi/image/width=828%2Cformat=webp/https://prod-apac-r2.popmart.com/uploads/y7MYxfX00I1FepbkFNPTDpuENxGL0eym/mzBtiAl-aRmAwQlv-1787297216-%E5%AE%98%E7%BD%91-EN_04.jpg",
    ],
    isSeries: true,
    productUnits: [
      { id: "single", label: "Single Box", outOfStock: true, price: 1700 },
      { id: "set", label: "Whole Set", outOfStock: false, price: 3400 },
    ],
  },

  {
    id: "hirono-hundreds-blister",
    name: "Hirono × The Hundreds Blister",
    price: 1700,
    isNew: true,
    globalExpress: true,
    images: [
      {
        uri: "https://prod-apac-r2.popmart.com/cdn-cgi/image/width=1080%2Cformat=webp/https://prod-apac-r2.popmart.com/uploads/y7MYxfX00I1FepbkFNPTDpuENxGL0eym/5IDvucC01gVbtgqn-1787297275-1.jpg",
      },
      {
        uri: "https://prod-apac-r2.popmart.com/cdn-cgi/image/width=640%2Cformat=webp/https://prod-apac-r2.popmart.com/uploads/y7MYxfX00I1FepbkFNPTDpuENxGL0eym/xNMlcV68x9lYGAOP-1787297275-2.jpg",
      },
      {
        uri: "https://prod-apac-r2.popmart.com/cdn-cgi/image/width=640%2Cformat=webp/https://prod-apac-r2.popmart.com/uploads/y7MYxfX00I1FepbkFNPTDpuENxGL0eym/IAiave6q5ixzI6pi-1787297275-3.jpg",
      },
    ],
    details: [
      "Brand: POP MART",
      "Product size: Height about 9.5cm",
      "Main material: PVC/ABS",
    ],
    shipping:
      "Shipping fees and delivery times are calculated at checkout. Please check our after-sale policy for returns and exchanges.",
    imageContents: [
      "https://prod-apac-r2.popmart.com/cdn-cgi/image/width=828%2Cformat=webp/https://prod-apac-r2.popmart.com/uploads/y7MYxfX00I1FepbkFNPTDpuENxGL0eym/aZ6xsHKZUuwKHNkk-1787297216-%E5%AE%98%E7%BD%91-EN_01.jpg",
      "https://prod-apac-r2.popmart.com/cdn-cgi/image/width=828%2Cformat=webp/https://prod-apac-r2.popmart.com/uploads/y7MYxfX00I1FepbkFNPTDpuENxGL0eym/4nI9ApgObMpYKf5O-1787297216-%E5%AE%98%E7%BD%91-EN_02.jpg",
      "https://prod-apac-r2.popmart.com/cdn-cgi/image/width=828%2Cformat=webp/https://prod-apac-r2.popmart.com/uploads/y7MYxfX00I1FepbkFNPTDpuENxGL0eym/D9ZpH1eRHpdIfNAI-1787297216-%E5%AE%98%E7%BD%91-EN_03.jpg",
      "https://prod-apac-r2.popmart.com/cdn-cgi/image/width=828%2Cformat=webp/https://prod-apac-r2.popmart.com/uploads/y7MYxfX00I1FepbkFNPTDpuENxGL0eym/mzBtiAl-aRmAwQlv-1787297216-%E5%AE%98%E7%BD%91-EN_04.jpg",
    ],
    isSeries: true,
    productUnits: [
      { id: "single", label: "Single Box", outOfStock: true, price: 1700 },
      { id: "set", label: "Whole Set", outOfStock: false, price: 3400 },
    ],
  },
  {
    id: "hirono-hundreds-blister",
    name: "Hirono × The Hundreds Blister",
    price: 1700,
    isNew: true,
    globalExpress: true,
    images: [
      {
        uri: "https://prod-apac-r2.popmart.com/cdn-cgi/image/width=1080%2Cformat=webp/https://prod-apac-r2.popmart.com/uploads/y7MYxfX00I1FepbkFNPTDpuENxGL0eym/5IDvucC01gVbtgqn-1787297275-1.jpg",
      },
      {
        uri: "https://prod-apac-r2.popmart.com/cdn-cgi/image/width=640%2Cformat=webp/https://prod-apac-r2.popmart.com/uploads/y7MYxfX00I1FepbkFNPTDpuENxGL0eym/xNMlcV68x9lYGAOP-1787297275-2.jpg",
      },
      {
        uri: "https://prod-apac-r2.popmart.com/cdn-cgi/image/width=640%2Cformat=webp/https://prod-apac-r2.popmart.com/uploads/y7MYxfX00I1FepbkFNPTDpuENxGL0eym/IAiave6q5ixzI6pi-1787297275-3.jpg",
      },
    ],
    details: [
      "Brand: POP MART",
      "Product size: Height about 9.5cm",
      "Main material: PVC/ABS",
    ],
    shipping:
      "Shipping fees and delivery times are calculated at checkout. Please check our after-sale policy for returns and exchanges.",
    imageContents: [
      "https://prod-apac-r2.popmart.com/cdn-cgi/image/width=828%2Cformat=webp/https://prod-apac-r2.popmart.com/uploads/y7MYxfX00I1FepbkFNPTDpuENxGL0eym/aZ6xsHKZUuwKHNkk-1787297216-%E5%AE%98%E7%BD%91-EN_01.jpg",
      "https://prod-apac-r2.popmart.com/cdn-cgi/image/width=828%2Cformat=webp/https://prod-apac-r2.popmart.com/uploads/y7MYxfX00I1FepbkFNPTDpuENxGL0eym/4nI9ApgObMpYKf5O-1787297216-%E5%AE%98%E7%BD%91-EN_02.jpg",
      "https://prod-apac-r2.popmart.com/cdn-cgi/image/width=828%2Cformat=webp/https://prod-apac-r2.popmart.com/uploads/y7MYxfX00I1FepbkFNPTDpuENxGL0eym/D9ZpH1eRHpdIfNAI-1787297216-%E5%AE%98%E7%BD%91-EN_03.jpg",
      "https://prod-apac-r2.popmart.com/cdn-cgi/image/width=828%2Cformat=webp/https://prod-apac-r2.popmart.com/uploads/y7MYxfX00I1FepbkFNPTDpuENxGL0eym/mzBtiAl-aRmAwQlv-1787297216-%E5%AE%98%E7%BD%91-EN_04.jpg",
    ],
    isSeries: true,
    productUnits: [
      { id: "single", label: "Single Box", outOfStock: true, price: 1700 },
      { id: "set", label: "Whole Set", outOfStock: false, price: 3400 },
    ],
  },
  {
    id: "hirono-hundreds-blister",
    name: "Hirono × The Hundreds Blister",
    price: 1700,
    isNew: true,
    globalExpress: true,
    images: [
      {
        uri: "https://prod-apac-r2.popmart.com/cdn-cgi/image/width=1080%2Cformat=webp/https://prod-apac-r2.popmart.com/uploads/y7MYxfX00I1FepbkFNPTDpuENxGL0eym/5IDvucC01gVbtgqn-1787297275-1.jpg",
      },
      {
        uri: "https://prod-apac-r2.popmart.com/cdn-cgi/image/width=640%2Cformat=webp/https://prod-apac-r2.popmart.com/uploads/y7MYxfX00I1FepbkFNPTDpuENxGL0eym/xNMlcV68x9lYGAOP-1787297275-2.jpg",
      },
      {
        uri: "https://prod-apac-r2.popmart.com/cdn-cgi/image/width=640%2Cformat=webp/https://prod-apac-r2.popmart.com/uploads/y7MYxfX00I1FepbkFNPTDpuENxGL0eym/IAiave6q5ixzI6pi-1787297275-3.jpg",
      },
    ],
    details: [
      "Brand: POP MART",
      "Product size: Height about 9.5cm",
      "Main material: PVC/ABS",
    ],
    shipping:
      "Shipping fees and delivery times are calculated at checkout. Please check our after-sale policy for returns and exchanges.",
    imageContents: [
      "https://prod-apac-r2.popmart.com/cdn-cgi/image/width=828%2Cformat=webp/https://prod-apac-r2.popmart.com/uploads/y7MYxfX00I1FepbkFNPTDpuENxGL0eym/aZ6xsHKZUuwKHNkk-1787297216-%E5%AE%98%E7%BD%91-EN_01.jpg",
      "https://prod-apac-r2.popmart.com/cdn-cgi/image/width=828%2Cformat=webp/https://prod-apac-r2.popmart.com/uploads/y7MYxfX00I1FepbkFNPTDpuENxGL0eym/4nI9ApgObMpYKf5O-1787297216-%E5%AE%98%E7%BD%91-EN_02.jpg",
      "https://prod-apac-r2.popmart.com/cdn-cgi/image/width=828%2Cformat=webp/https://prod-apac-r2.popmart.com/uploads/y7MYxfX00I1FepbkFNPTDpuENxGL0eym/D9ZpH1eRHpdIfNAI-1787297216-%E5%AE%98%E7%BD%91-EN_03.jpg",
      "https://prod-apac-r2.popmart.com/cdn-cgi/image/width=828%2Cformat=webp/https://prod-apac-r2.popmart.com/uploads/y7MYxfX00I1FepbkFNPTDpuENxGL0eym/mzBtiAl-aRmAwQlv-1787297216-%E5%AE%98%E7%BD%91-EN_04.jpg",
    ],
    isSeries: true,
    productUnits: [
      { id: "single", label: "Single Box", outOfStock: true, price: 1700 },
      { id: "set", label: "Whole Set", outOfStock: false, price: 3400 },
    ],
  },
];
const formatPrice = (n: number): string =>
  `₱${n.toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

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

function AutoHeightImage({ uri }: { uri: string }) {
  const { width } = useWindowDimensions();
  const [ratio, setRatio] = useState<number>(1);

  useEffect(() => {
    let active = true;
    Image.getSize(
      uri,
      (w, h) => {
        if (active && w && h) setRatio(w / h);
      },
      () => {},
    );
    return () => {
      active = false;
    };
  }, [uri]);

  return (
    <Image
      source={{ uri }}
      style={{ width, aspectRatio: ratio, backgroundColor: "#F5F5F5" }}
      resizeMode="cover"
    />
  );
}

function ContentImages({ images }: { images: string[] }) {
  return (
    <View>
      {images.map((uri, i) => (
        <AutoHeightImage key={`${uri}-${i}`} uri={uri} />
      ))}
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

type VariantPickerProps = {
  productUnits: ProductUnit[];
  selectedId: string;
  onSelect: (id: string) => void;
};

function VariantPicker({
  productUnits,
  selectedId,
  onSelect,
}: VariantPickerProps) {
  return (
    <View style={styles.variantWrap}>
      <Text style={styles.variantTitle}>SIZE</Text>
      <View style={styles.variantRow}>
        {productUnits.map((v) => {
          const active = v.id === selectedId;
          return (
            <Pressable
              key={v.id}
              onPress={() => onSelect(v.id)}
              style={[styles.variantBtn, active && styles.variantBtnActive]}
            >
              <View style={[styles.variantThumb, !active && { opacity: 0.6 }]}>
                {v.image && (
                  <Image
                    source={{ uri: v.image }}
                    style={styles.variantThumbImg}
                    resizeMode="contain"
                  />
                )}
              </View>
              <Text
                style={[
                  styles.variantLabel,
                  !active && styles.variantLabelInactive,
                  v.outOfStock && styles.variantLabelSoldOut,
                ]}
                numberOfLines={1}
              >
                {v.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
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
  const variants = product.productUnits;
  const [variantId, setVariantId] = useState<string>(variants[0].id);
  const selectedVariant =
    variants.find((v) => v.id === variantId) ?? variants[0];
  const displayPrice = selectedVariant.price ?? product.price;
  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const past = e.nativeEvent.contentOffset.y > width - 90 - insets.top;
    if (past !== showHeader) setShowHeader(past);
  };

  const share = () => Share.share({ message: product.name });

  const handleBack = () => {
    router.back();
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
          <Text style={styles.price}>{formatPrice(displayPrice)}</Text>

          {product.isSeries && (
            <VariantPicker
              productUnits={variants}
              selectedId={variantId}
              onSelect={setVariantId}
            />
          )}

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
        {!!product.imageContents?.length && (
          <ContentImages images={product.imageContents} />
        )}
        <RecommendProduct items={DEFAULT_PRODUCT_RECOMMENDATION} />
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
  galleryImg: { width: "100%", height: "100%" },
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

  // Variant picker
  variantWrap: { marginTop: 22 },
  variantTitle: { fontSize: 14, color: "#111", marginBottom: 12 },
  variantRow: { flexDirection: "row", gap: 10 },
  variantBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    height: 56,
    paddingHorizontal: 10,
    backgroundColor: "#F4F4F4",
    borderWidth: 1,
    borderColor: "transparent", // keeps both buttons the same size
  },
  variantBtnActive: { borderColor: "#000" },
  variantThumb: {
    width: 34,
    height: 34,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  variantThumbImg: { width: "100%", height: "100%" },
  variantLabel: { flex: 1, fontSize: 15, color: "#000" },
  variantLabelInactive: { color: "#6B6B6B" },
  variantLabelSoldOut: { textDecorationLine: "line-through" },

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
