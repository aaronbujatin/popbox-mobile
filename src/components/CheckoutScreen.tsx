import { Feather } from "@expo/vector-icons";
import { ReactNode, useMemo, useState } from "react";
import { router } from "expo-router";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context"; // npx expo install react-native-safe-area-context


const RED = "#D9001B";
const BORDER = "#E5E5E5";
const MUTED = "#6B7280";
const GREEN = "#5E9E45";

export type OrderItem = {
  id: string;
  name: string;
  variant: string;
  price: number;
  qty: number;
  image: ImageSourcePropType | null;
};

export type DeliveryMethod = {
  id: string;
  label: string;
  description: string;
  price: number;
};

export type SavedAddress = {
  id: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
};

type NavigationLike = {
  goBack: () => void;
  canGoBack?: () => boolean;
};

type CheckoutScreenProps = {
  items?: OrderItem[];
  rewardPoints?: number; // defaults to a placeholder rule, replace with your real one
  addresses?: SavedAddress[];
  navigation?: NavigationLike; // passed automatically by React Navigation
  onBack?: () => void;
  onAddAddress?: () => void;
  onEditBilling?: () => void;
  onPay?: (payload: {
    items: OrderItem[];
    delivery: DeliveryMethod;
    coupon: string;
    total: number;
  }) => void;
};

// Replace `image` with { uri: '...' } or require('./assets/xyz.png')
const DEFAULT_ITEMS: OrderItem[] = [
  {
    id: "1",
    name: "Hirono Tamed Wildgrass Series Figures",
    variant: "Single Box",
    price: 600,
    qty: 1,
    image: null,
  },
  {
    id: "2",
    name: "Hirono Mist-Walker Series - Plush Doll Pendant",
    variant: "Single Box",
    price: 1150,
    qty: 1,
    image: null,
  },
];

const DELIVERY_METHODS: DeliveryMethod[] = [
  {
    id: "standard",
    label: "Standard delivery",
    description: "Standard delivery",
    price: 400,
  },
];

const formatPrice = (n: number): string =>
  `₱${n.toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

/* ---------- Pieces ---------- */

function Header({ onBack }: { onBack: () => void }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.header, { paddingTop: insets.top }]}>
      <View style={styles.headerRow}>
        {/* Centered title: absolutely positioned, so it must not capture touches */}
        <View style={styles.titleWrap} pointerEvents="none">
          <Text style={styles.headerTitle}>Checkout</Text>
        </View>
        <Pressable onPress={onBack} hitSlop={16} style={styles.back}>
          <Feather name="arrow-left" size={26} color="#111" />
        </Pressable>
        <View style={styles.secure}>
          <Feather name="shield" size={16} color={GREEN} />
          <Text style={styles.secureText} numberOfLines={1}>
            Secure Checkout
          </Text>
        </View>
      </View>
    </View>
  );
}

function Section({ children }: { children: ReactNode }) {
  return <View style={styles.section}>{children}</View>;
}

function SummaryLine({
  label,
  value,
  bold,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) {
  return (
    <View style={styles.summaryLine}>
      <Text style={[styles.summaryText, bold && styles.bold]}>{label}</Text>
      <Text style={[styles.summaryText, bold && styles.bold]}>{value}</Text>
    </View>
  );
}

/* ---------- Screen ---------- */

export default function CheckoutScreen({
  items = DEFAULT_ITEMS,
  rewardPoints,
  addresses = [],
  navigation,
  onBack,
  onAddAddress,
  onEditBilling,
  onPay,
}: CheckoutScreenProps) {
  const insets = useSafeAreaInsets();
  const [deliveryId, setDeliveryId] = useState(DELIVERY_METHODS[0].id);
  const [coupon, setCoupon] = useState("");

  const handleBack = () => {
    router.back();
  };

  const delivery =
    DELIVERY_METHODS.find((d) => d.id === deliveryId) ?? DELIVERY_METHODS[0];
  const subtotal = useMemo(
    () => items.reduce((s, i) => s + i.price * i.qty, 0),
    [items],
  );
  const total = subtotal + delivery.price;
  const itemCount = items.reduce((s, i) => s + i.qty, 0);
  const points = rewardPoints ?? Math.floor(total / 70); // placeholder rule

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" />
      <Header onBack={handleBack} />

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Your order */}
        <Section>
          <Text style={styles.sectionTitle}>
            YOUR ORDER <Text style={styles.itemCount}>{itemCount} ITEMS</Text>
          </Text>

          {items.map((item) => (
            <View key={item.id} style={styles.orderRow}>
              <View style={styles.thumb}>
                {item.image && (
                  <Image
                    source={item.image}
                    style={styles.thumbImg}
                    resizeMode="contain"
                  />
                )}
              </View>
              <View style={styles.orderInfo}>
                <Text style={styles.orderName}>{item.name}</Text>
                <Text style={styles.orderVariant}>{item.variant}</Text>
                <View style={styles.orderPriceRow}>
                  <Text style={styles.orderPrice}>
                    {formatPrice(item.price)}
                  </Text>
                  <Text style={styles.orderQty}>QTY: {item.qty}</Text>
                </View>
              </View>
            </View>
          ))}

          <View style={styles.divider} />
          <SummaryLine label="Subtotal:" value={formatPrice(subtotal)} />
          <SummaryLine label="Shipping:" value={formatPrice(delivery.price)} />
          <SummaryLine label="Total" value={formatPrice(total)} bold />
          <Text style={styles.reward}>Reward {points} points</Text>
        </Section>

        {/* Address book + delivery method */}
        <Section>
          <Text style={styles.sectionTitleSm}>Address Book</Text>
          {addresses.length === 0 && (
            <Text style={styles.helper}>
              You currently don't have any saved delivery addresses. Add an
              address here to be pre-filled for quicker checkout.
            </Text>
          )}
          <Pressable style={styles.outlineBtn} onPress={onAddAddress}>
            <Text style={styles.outlineBtnText}>Add Shipping Address</Text>
          </Pressable>

          <View style={[styles.divider, { marginTop: 24, marginBottom: 22 }]} />

          <Text style={styles.sectionTitle}>DELIVERY METHOD</Text>
          {DELIVERY_METHODS.map((d) => {
            const active = d.id === deliveryId;
            return (
              <Pressable
                key={d.id}
                style={styles.deliveryRow}
                onPress={() => setDeliveryId(d.id)}
              >
                <View style={styles.radio}>
                  {active && <View style={styles.radioDot} />}
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.deliveryLabel}>{d.label}</Text>
                  <Text style={styles.deliveryDesc}>{d.description}</Text>
                </View>
                <Text style={styles.deliveryPrice}>{formatPrice(d.price)}</Text>
              </Pressable>
            );
          })}
        </Section>

        {/* Coupon */}
        <Section>
          <View style={styles.couponHeader}>
            <Text style={styles.sectionTitle}>COUPON</Text>
            <Pressable style={styles.couponAvail}>
              <Text style={styles.couponAvailText}>0 available</Text>
              <Feather name="chevron-right" size={18} color={MUTED} />
            </Pressable>
          </View>
          <View style={styles.couponBox}>
            <TextInput
              value={coupon}
              onChangeText={setCoupon}
              placeholder="Enter your coupon code"
              placeholderTextColor="#9CA3AF"
              autoCapitalize="characters"
              style={styles.couponInput}
            />
            <Pressable disabled={!coupon.trim()} hitSlop={8}>
              <Text style={[styles.apply, !coupon.trim() && { opacity: 0.4 }]}>
                APPLY
              </Text>
            </Pressable>
          </View>
        </Section>

        {/* Billing address */}
        <Section>
          <Text style={styles.sectionTitle}>BILLING ADDRESS</Text>
          <View style={styles.billingRow}>
            <Text style={styles.billingText}>
              Billing Address and phone are the same as Shipping Information.
            </Text>
            <Pressable onPress={onEditBilling} hitSlop={8}>
              <Text style={styles.edit}>Edit</Text>
            </Pressable>
          </View>
        </Section>
      </ScrollView>

      {/* Sticky footer */}
      <View
        style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 12) }]}
      >
        <View style={styles.footerRow}>
          <Text style={styles.footerTotal}>Total</Text>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={styles.footerPrice}>{formatPrice(total)}</Text>
            <Text style={styles.footerReward}>Reward {points} points</Text>
          </View>
        </View>
        <Pressable
          style={styles.payBtn}
          onPress={() => onPay?.({ items, delivery, coupon, total })}
        >
          <Text style={styles.payText}>PROCEED TO PAY</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff" },
  bold: { fontWeight: "700" },

  // Header
  header: { backgroundColor: "#fff" },
  headerRow: {
    height: 64,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  back: { width: 44, height: 44, justifyContent: "center" },
  titleWrap: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: { fontSize: 20, fontWeight: "500", color: "#111" },
  secure: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#E8F3E3",
    paddingHorizontal: 12,
    height: 36,
    borderRadius: 18,
  },
  secureText: { fontSize: 13, color: GREEN },

  // Sections
  scroll: { flex: 1, backgroundColor: "#F4F4F4" },
  section: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 20,
    marginBottom: 8,
  },
  sectionTitle: { fontSize: 18, fontWeight: "800", color: "#111" },
  sectionTitleSm: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
    marginBottom: 14,
    marginTop: 4,
  },
  itemCount: { fontSize: 14, fontWeight: "400" },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: "#CFCFCF" },

  // Order
  orderRow: { flexDirection: "row", gap: 16, marginTop: 20 },
  thumb: {
    width: 80,
    height: 80,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
  },
  thumbImg: { width: "85%", height: "85%" },
  orderInfo: { flex: 1, minHeight: 80 },
  orderName: { fontSize: 16, color: "#111", lineHeight: 22 },
  orderVariant: { fontSize: 15, color: "#8A8A8A", marginTop: 4 },
  orderPriceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginTop: 8,
  },
  orderPrice: { fontSize: 17, color: "#111" },
  orderQty: { fontSize: 14, color: "#111" },

  summaryLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
  },
  summaryText: { fontSize: 16, color: "#111" },
  reward: { textAlign: "right", fontSize: 16, color: "#8A8A8A", marginTop: 8 },

  // Address
  helper: { fontSize: 16, lineHeight: 24, color: "#4B5563", marginBottom: 22 },
  outlineBtn: {
    height: 48,
    borderWidth: 1,
    borderColor: "#9AA3B5",
    alignItems: "center",
    justifyContent: "center",
  },
  outlineBtnText: { fontSize: 16, fontWeight: "500", color: "#111" },

  // Delivery
  deliveryRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 14,
    marginTop: 20,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#8A8A8A",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  radioDot: { width: 14, height: 14, borderRadius: 7, backgroundColor: "#000" },
  deliveryLabel: { fontSize: 16, fontWeight: "600", color: "#111" },
  deliveryDesc: { fontSize: 16, color: RED, marginTop: 8 },
  deliveryPrice: { fontSize: 16, color: "#111" },

  // Coupon
  couponHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  couponAvail: { flexDirection: "row", alignItems: "center", gap: 6 },
  couponAvailText: { fontSize: 15, fontWeight: "600", color: MUTED },
  couponBox: {
    flexDirection: "row",
    alignItems: "center",
    height: 52,
    borderWidth: 1,
    borderColor: "#D4D4D4",
    paddingHorizontal: 14,
  },
  couponInput: { flex: 1, fontSize: 16, color: "#111", paddingVertical: 0 },
  apply: { fontSize: 16, color: "#111", textDecorationLine: "underline" },

  // Billing
  billingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
    marginTop: 16,
  },
  billingText: { flex: 1, fontSize: 16, lineHeight: 24, color: "#4B5563" },
  edit: { fontSize: 16, color: "#111", textDecorationLine: "underline" },

  // Footer
  footer: {
    backgroundColor: "#fff",
    paddingHorizontal: 8,
    paddingTop: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: BORDER,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 0,
  },
  footerTotal: { fontSize: 20, color: "#111" },
  footerPrice: { fontSize: 22, fontWeight: "500", color: "#111" },
  footerReward: { fontSize: 16, color: "#8A8A8A", marginTop: 2 },
  payBtn: {
    height: 40,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  payText: { color: "#fff", fontSize: 18 },
});
