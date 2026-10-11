import { Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  ImageSourcePropType,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context"; // npx expo install react-native-safe-area-context

const BORDER = "#E5E5E5";
const NAVY = "#10182B";

export type CartItem = {
  id: string;
  name: string;
  variant: string;
  price: number;
  qty: number;
  selected: boolean;
  image: ImageSourcePropType | null;
};

type NavigationLike = {
  goBack: () => void;
  canGoBack?: () => boolean;
};

type CartScreenProps = {
  initialItems?: CartItem[];
  navigation?: NavigationLike; // passed automatically by React Navigation
  onBack?: () => void;
  onWishlist?: () => void;
  onCheckout?: (selected: CartItem[]) => void;
};

// Replace `image` with { uri: '...' } or require('./assets/xyz.png')
const INITIAL_ITEMS: CartItem[] = [
  {
    id: "1",
    name: "Hirono Tamed Wildgrass Series Figures",
    variant: "Single Box",
    price: 600,
    qty: 1,
    selected: true,
    image: null,
  },
  {
    id: "2",
    name: "Hirono Mist-Walker Series - Plush Doll Pendant",
    variant: "Single Box",
    price: 1150,
    qty: 1,
    selected: true,
    image: null,
  },
];

const formatPrice = (n: number): string =>
  `₱${n.toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

/* ---------- Pieces ---------- */

type HeaderProps = { onBack: () => void; onWishlist?: () => void };

function Header({ onBack, onWishlist }: HeaderProps) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.header, { paddingTop: insets.top }]}>
      <View style={styles.headerRow}>
        <Pressable onPress={onBack} hitSlop={16} style={styles.headerBtn}>
          <Feather name="arrow-left" size={26} color="#111" />
        </Pressable>
        <Text style={styles.headerTitle}>Bag</Text>
        <Pressable
          onPress={onWishlist}
          hitSlop={16}
          style={[styles.headerBtn, { alignItems: "flex-end" }]}
        >
          <Feather name="heart" size={26} color="#8A8A8A" />
        </Pressable>
      </View>
    </View>
  );
}

type CheckboxProps = { checked: boolean; onPress: () => void; style?: object };

function Checkbox({ checked, onPress, style }: CheckboxProps) {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={8}
      style={[styles.checkbox, checked && styles.checkboxChecked, style]}
    >
      {checked && <Ionicons name="checkmark" size={18} color="#fff" />}
    </Pressable>
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

type CartRowProps = {
  item: CartItem;
  onToggle: (id: string) => void;
  onQty: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
};

function CartRow({ item, onToggle, onQty, onRemove }: CartRowProps) {
  const confirmRemove = () =>
    Alert.alert("Remove item", `Remove "${item.name}" from your bag?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: () => onRemove(item.id),
      },
    ]);

  return (
    // Long-press a row to remove it
    <Pressable
      style={styles.row}
      onLongPress={confirmRemove}
      delayLongPress={400}
    >
      <View style={styles.thumb}>
        {item.image && (
          <Image
            source={item.image}
            style={styles.thumbImg}
            resizeMode="contain"
          />
        )}
        <Checkbox
          checked={item.selected}
          onPress={() => onToggle(item.id)}
          style={styles.thumbCheckbox}
        />
      </View>

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.variant}>{item.variant}</Text>
        <Text style={styles.price}>{formatPrice(item.price)}</Text>
        <View style={styles.qtyGroup}>
          <QtyButton
            icon="minus"
            disabled={item.qty <= 1}
            onPress={() => onQty(item.id, -1)}
          />
          <Text style={styles.qty}>{item.qty}</Text>
          <QtyButton icon="plus" onPress={() => onQty(item.id, 1)} />
        </View>
      </View>
    </Pressable>
  );
}

/* ---------- Screen ---------- */

export default function CartScreen({
  initialItems = INITIAL_ITEMS,
  navigation,
  onBack,
  onWishlist,
  onCheckout,
}: CartScreenProps) {
  const insets = useSafeAreaInsets();
  const [items, setItems] = useState<CartItem[]>(initialItems);

  const handleBack = () => {
    if (onBack) onBack();
    else if (navigation?.canGoBack?.() ?? true) router.back();
  };

  const allSelected = items.length > 0 && items.every((i) => i.selected);
  const selected = useMemo(() => items.filter((i) => i.selected), [items]);
  const total = useMemo(
    () => selected.reduce((sum, i) => sum + i.price * i.qty, 0),
    [selected],
  );

  const toggleAll = () =>
    setItems((prev) => prev.map((i) => ({ ...i, selected: !allSelected })));
  const toggleOne = (id: string) =>
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, selected: !i.selected } : i)),
    );
  const changeQty = (id: string, delta: number) =>
    setItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i,
      ),
    );
  const removeOne = (id: string) =>
    setItems((prev) => prev.filter((i) => i.id !== id));

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" />
      <Header onBack={handleBack} onWishlist={onWishlist} />

      <FlatList
        data={items}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <CartRow
            item={item}
            onToggle={toggleOne}
            onQty={changeQty}
            onRemove={removeOne}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Your bag is empty.</Text>
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <View
        style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 12) }]}
      >
        <View style={styles.footerRow}>
          <Pressable style={styles.allWrap} onPress={toggleAll} hitSlop={8}>
            <Checkbox checked={allSelected} onPress={toggleAll} />
            <Text style={styles.allText}>ALL</Text>
          </Pressable>

          <View style={styles.totalWrap}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{formatPrice(total)}</Text>
          </View>

          <Pressable
            style={[
              styles.checkout,
              selected.length === 0 && styles.checkoutDisabled,
            ]}
            disabled={selected.length === 0}
            onPress={() => onCheckout?.(selected)}
          >
            <Text style={styles.checkoutText}>
              CHECKOUT ({selected.length})
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff" },

  // Header
  header: {
    backgroundColor: "#fff",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: BORDER,
  },
  headerRow: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 22,
  },
  headerBtn: { width: 44, height: 44, justifyContent: "center" },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "800",
    color: "#000",
  },

  // List
  listContent: { paddingTop: 22, paddingBottom: 24 },
  row: { flexDirection: "row", paddingHorizontal: 12, marginBottom: 40 },
  thumb: {
    width: 96,
    height: 96,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
  },
  thumbImg: { width: "85%", height: "85%" },
  thumbCheckbox: { position: "absolute", top: 4, left: 4 },
  info: { flex: 1, marginLeft: 12, paddingTop: 2 },
  name: { fontSize: 14, fontWeight: "800", color: NAVY, lineHeight: 20 },
  variant: { fontSize: 14, color: "#5F6577", marginTop: 8 },
  price: { fontSize: 14, color: NAVY, marginTop: 10 },
  qtyGroup: { flexDirection: "row", alignItems: "center", marginTop: 14 },
  qtyBtn: {
    width: 24,
    height: 24,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  qty: { width: 33, textAlign: "center", fontSize: 15, color: "#111" },
  empty: { textAlign: "center", color: "#777", marginTop: 64, fontSize: 15 },

  // Checkbox
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: "#CFCFCF",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: { backgroundColor: "#000", borderColor: "#000" },

  // Footer
  footer: {
    backgroundColor: "#fff",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: BORDER,
    paddingTop: 12,
    paddingHorizontal: 16,
  },
  footerRow: { flexDirection: "row", alignItems: "center", height: 52 },
  allWrap: { flexDirection: "row", alignItems: "center", gap: 12 },
  allText: { fontSize: 16, color: "#111" },
  totalWrap: { flex: 1, alignItems: "flex-end", paddingRight: 16 },
  totalLabel: { fontSize: 15, color: "#444" },
  totalValue: { fontSize: 17, fontWeight: "800", color: NAVY, marginTop: 2 },
  checkout: {
    width: 150,
    height: 48,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  checkoutDisabled: { backgroundColor: "#B5B5B5" },
  checkoutText: { color: "#fff", fontSize: 16, fontWeight: "500" },
});
