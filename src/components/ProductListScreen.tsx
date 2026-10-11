import { Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import {
  FlatList,
  Image,
  ImageSourcePropType,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context"; // npx expo install react-native-safe-area-context

const BORDER = "#E5E5E5";

export type Product = {
  id: string;
  name: string;
  price: number;
  image: ImageSourcePropType | null;
  isNew?: boolean;
  hot?: boolean;
  outOfStock?: boolean;
  popNow?: boolean;
  globalExpress?: boolean;
};

type NavigationLike = {
  goBack: () => void;
  canGoBack?: () => boolean;
};

type ChipKey = "category" | "ipCategory" | "sort";

type ProductListScreenProps = {
  title?: string;
  banner?: ImageSourcePropType | null;
  description?: string;
  products?: Product[];
  navigation?: NavigationLike; // passed automatically by React Navigation
  onBack?: () => void;
  onProductPress?: (product: Product) => void;
  onChipPress?: (key: ChipKey) => void; // open your Category / IP Category / Sort pickers
};

// Replace `image` / `banner` with { uri: '...' } or require('./assets/xyz.png')
const DEFAULT_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Hirono × The Hundreds Blister",
    price: 1700,
    image: null,
    isNew: true,
    globalExpress: true,
  },
  {
    id: "2",
    name: "Hirono × Harry Potter Series Figures",
    price: 1700,
    image: null,
    isNew: true,
    outOfStock: true,
    globalExpress: true,
  },
  {
    id: "3",
    name: "Hirono Mist-Walker Series - Plush Doll Pendant",
    price: 1150,
    image: null,
    hot: true,
    globalExpress: true,
  },
  {
    id: "4",
    name: "Hirono Tamed Wildgrass Series Figures",
    price: 600,
    image: null,
    popNow: true,
    globalExpress: true,
  },
];

const DEFAULT_DESCRIPTION =
  "Created by contemporary artist Lang, Hirono is a complex character. Through Hirono Lang aims to highlight the subtle fluctuations of life, its ups and downs, and attempts to freeze in time the elusive feelings that reveal our true character – love, joy, sadness, fear, kindness, courage and more.";

const formatPrice = (n: number): string =>
  `₱${n.toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

/* ---------- Pieces ---------- */

function TopBar({ title, onBack }: { title: string; onBack: () => void }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.topBar, { paddingTop: insets.top }]}>
      <View style={styles.topBarRow}>
        <Pressable onPress={onBack} hitSlop={16} style={styles.backBtn}>
          <Feather name="arrow-left" size={26} color="#111" />
        </Pressable>
        <Text style={styles.topTitle} numberOfLines={1}>
          {title}
        </Text>
        <View style={styles.backBtn} />
      </View>
    </View>
  );
}

function Checkbox({ checked }: { checked: boolean }) {
  return (
    <View style={styles.checkbox}>
      {checked && <Ionicons name="checkmark" size={14} color="#111" />}
    </View>
  );
}

type ChipProps = {
  label: string;
  checkbox?: boolean;
  checked?: boolean;
  dropdown?: boolean;
  onPress?: () => void;
};

function Chip({
  label,
  checkbox,
  checked = false,
  dropdown,
  onPress,
}: ChipProps) {
  return (
    <Pressable style={styles.chip} onPress={onPress}>
      {checkbox && <Checkbox checked={checked} />}
      <Text style={styles.chipText}>{label}</Text>
      {dropdown && <Ionicons name="caret-down" size={12} color="#8A8A8A" />}
    </Pressable>
  );
}

function Badge({
  label,
  variant,
}: {
  label: string;
  variant: "dark" | "light";
}) {
  return (
    <View
      style={[
        styles.badge,
        variant === "dark" ? styles.badgeDark : styles.badgeLight,
      ]}
    >
      <Text
        style={[
          styles.badgeText,
          variant === "dark" ? { color: "#fff" } : { color: "#444" },
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

function ProductCard({
  item,
  onPress,
}: {
  item: Product;
  onPress?: (p: Product) => void;
}) {
  return (
    <Pressable style={styles.card} onPress={() => onPress?.(item)}>
      <View style={styles.imageBox}>
        {item.image && (
          <Image
            source={item.image}
            style={styles.image}
            resizeMode="contain"
          />
        )}
        <View style={styles.badges}>
          {item.outOfStock && <Badge label="OUT OF STOCK" variant="light" />}
          {item.isNew && <Badge label="NEW" variant="dark" />}
          {item.hot && <Badge label="HOT" variant="dark" />}
        </View>
      </View>
      {item.globalExpress && <Text style={styles.express}>GLOBAL EXPRESS</Text>}
      <Text style={styles.name} numberOfLines={2}>
        {item.name}
      </Text>
      <Text style={styles.price}>{formatPrice(item.price)}</Text>
    </Pressable>
  );
}

export default function ProductListScreen({
  title = "HIRONO",
  banner = null,
  description = DEFAULT_DESCRIPTION,
  products = DEFAULT_PRODUCTS,
  navigation,
  onBack,
  onProductPress,
  onChipPress,
}: ProductListScreenProps) {
  const { width } = useWindowDimensions();
  const [expanded, setExpanded] = useState(false);
  const [popNowOnly, setPopNowOnly] = useState(false);
  const [expressOnly, setExpressOnly] = useState(false);

  const handleBack = () => {
    if (onBack) onBack();
    else if (navigation?.canGoBack?.() ?? true) router.back();
  };

  const data = useMemo(
    () =>
      products.filter(
        (p) => (!popNowOnly || p.popNow) && (!expressOnly || p.globalExpress),
      ),
    [products, popNowOnly, expressOnly],
  );

  const header = (
    <View>
      {/* Banner */}
      <View style={[styles.banner, { width, height: width * (675 / 1179) }]}>
        {banner && (
          <Image
            source={banner}
            style={StyleSheet.absoluteFill}
            resizeMode="cover"
          />
        )}
      </View>

      {/* Title + description */}
      <View style={styles.intro}>
        <Text style={styles.title}>{title}</Text>
        <Text
          style={styles.description}
          numberOfLines={expanded ? undefined : 4}
        >
          {description}
        </Text>
        {description.length > 160 && (
          <Pressable
            style={styles.expandBtn}
            onPress={() => setExpanded((v) => !v)}
            hitSlop={12}
          >
            <Ionicons
              name={expanded ? "chevron-up" : "chevron-down"}
              size={22}
              color="#8A8A8A"
              style={{ marginBottom: -12 }}
            />
            <Ionicons
              name={expanded ? "chevron-up" : "chevron-down"}
              size={22}
              color="#8A8A8A"
            />
          </Pressable>
        )}
      </View>

      {/* Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipRow}
      >
        <Chip
          label="POP NOW"
          checkbox
          checked={popNowOnly}
          onPress={() => setPopNowOnly((v) => !v)}
        />
        <Chip
          label="GLOBAL EXPRESS"
          checkbox
          checked={expressOnly}
          onPress={() => setExpressOnly((v) => !v)}
        />
        <Chip
          label="Category"
          dropdown
          onPress={() => onChipPress?.("category")}
        />
        <Chip
          label="IP Category"
          dropdown
          onPress={() => onChipPress?.("ipCategory")}
        />
        <Chip label="Sort" dropdown onPress={() => onChipPress?.("sort")} />
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" />
      <TopBar title={title} onBack={handleBack} />

      <FlatList
        data={data}
        keyExtractor={(p) => p.id}
        numColumns={2}
        columnWrapperStyle={styles.column}
        ListHeaderComponent={header}
        renderItem={({ item }) => (
          <ProductCard item={item} onPress={onProductPress} />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No products found.</Text>
        }
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff" },

  // Top bar
  topBar: {
    backgroundColor: "#fff",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: BORDER,
    zIndex: 10,
    elevation: 4,
  },
  topBarRow: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  backBtn: { width: 44, height: 44, justifyContent: "center" },
  topTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "500",
    color: "#111",
  },

  // Banner + intro
  banner: { backgroundColor: "#E9DFD0" },
  intro: { paddingHorizontal: 16, paddingTop: 22 },
  title: { fontSize: 24, fontWeight: "800", color: "#000" },
  description: { fontSize: 14, lineHeight: 22, color: "#222", marginTop: 16 },
  expandBtn: {
    alignSelf: "flex-end",
    alignItems: "center",
    marginTop: 14,
    marginRight: 10,
    paddingTop: 6,
  },

  // Chips
  chipRow: { gap: 8, paddingHorizontal: 16, paddingTop: 12, paddingBottom: 14 },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    height: 40,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#F2F2F2",
  },
  chipText: { fontSize: 14, color: "#111" },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1.5,
    borderColor: "#111",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  // Grid
  column: { gap: 12, paddingHorizontal: 14 },
  card: { flex: 1, marginBottom: 30 },
  imageBox: {
    width: "100%",
    aspectRatio: 530 / 638,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  image: { width: "85%", height: "85%" },
  badges: {
    position: "absolute",
    top: 8,
    left: 8,
    flexDirection: "row",
    gap: 4,
  },
  badge: { paddingHorizontal: 6, paddingVertical: 3 },
  badgeDark: { backgroundColor: "#000" },
  badgeLight: { backgroundColor: "#E6E6E6" },
  badgeText: { fontSize: 11, fontWeight: "500" },
  express: { fontSize: 12, color: "#111", marginBottom: 3 },
  name: { fontSize: 14, lineHeight: 20, color: "#111" },
  price: { fontSize: 13, color: "#111", marginTop: 8 },
  empty: { textAlign: "center", color: "#777", marginTop: 48, fontSize: 15 },
});
