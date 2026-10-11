import { Feather, Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  FlatList,
  Image,
  ImageSourcePropType,
  NativeScrollEvent,
  NativeSyntheticEvent,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

type IconName = React.ComponentProps<typeof Ionicons>["name"];

const IMAGES: ImageSourcePropType[] = [
  { uri: "https://picsum.photos/seed/hirono1/800/800" },
  { uri: "https://picsum.photos/seed/hirono2/800/800" },
  { uri: "https://picsum.photos/seed/hirono3/800/800" },
  { uri: "https://picsum.photos/seed/hirono4/800/800" },
  { uri: "https://picsum.photos/seed/hirono5/800/800" },
  { uri: "https://picsum.photos/seed/hirono6/800/800" },
  { uri: "https://picsum.photos/seed/hirono7/800/800" },
  { uri: "https://picsum.photos/seed/hirono8/800/800" },
];

const SIZES: { id: string; label: string; icon: IconName }[] = [
  { id: "single", label: "Single Box", icon: "cube-outline" },
  { id: "set", label: "Whole Set", icon: "albums-outline" },
];

const RED = "#d6001c";
const IMAGE_HEIGHT = 460;

function ImageCarousel({ images }: { images: ImageSourcePropType[] }) {
  const { width } = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const listRef = useRef<FlatList<ImageSourcePropType>>(null);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const next = Math.round(e.nativeEvent.contentOffset.x / width);
    const clamped = Math.max(0, Math.min(images.length - 1, next));
    setIndex((prev) => (prev === clamped ? prev : clamped));
  };

  return (
    <View style={[styles.imageWrap, { height: IMAGE_HEIGHT }]}>
      <FlatList
        ref={listRef}
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, i) => String(i)}
        onScroll={onScroll}
        scrollEventThrottle={16}
        getItemLayout={(_, i) => ({
          length: width,
          offset: width * i,
          index: i,
        })}
        renderItem={({ item }) => (
          <View style={{ width, height: IMAGE_HEIGHT }}>
            <Image source={item} style={styles.slide} resizeMode="contain" />
          </View>
        )}
      />

      <Text style={styles.pager}>
        {index + 1} / {images.length}
      </Text>

      {/* Dots */}
      <View style={styles.dots}>
        {images.map((_, i) => (
          <TouchableOpacity
            key={i}
            hitSlop={6}
            onPress={() => {
              listRef.current?.scrollToIndex({ index: i, animated: true });
              setIndex(i);
            }}
            style={[styles.dot, i === index && styles.dotActive]}
          />
        ))}
      </View>
    </View>
  );
}

type Product = {
  id: string;
  name: string;
  price: string;
  image: ImageSourcePropType;
  hot?: boolean;
};

// Replace images with your own assets or product URLs
const RELATED: Product[] = [
  {
    id: "1",
    name: "Hirono Road Journal Series-Phone Lanyard Blind Box",
    price: "₱900.00",
    image: { uri: "https://picsum.photos/seed/lanyard/600/600" },
    hot: true,
  },
  {
    id: "2",
    name: "Hirono Road Journal Series Phone Case",
    price: "₱1,400.00",
    image: { uri: "https://picsum.photos/seed/phonecase/600/600" },
    hot: true,
  },
  {
    id: "3",
    name: "Hirono Road Journal Series-Fridge Magnet Blind Box",
    price: "₱550.00",
    image: { uri: "https://picsum.photos/seed/magnet/600/600" },
    hot: true,
  },
  {
    id: "4",
    name: "Hirono Road Journal Series-Sticker Pack",
    price: "₱350.00",
    image: { uri: "https://picsum.photos/seed/sticker/600/600" },
  },
];

function RelatedProducts({ items }: { items: Product[] }) {
  const { width } = useWindowDimensions();
  const cardWidth = width * 0.42;
  const trackWidth = width - 36;

  const [contentW, setContentW] = useState(1);
  const [viewW, setViewW] = useState(1);
  const [offsetX, setOffsetX] = useState(0);

  const ratio = Math.min(1, viewW / contentW);
  const thumbW = trackWidth * ratio;
  const maxOffset = Math.max(1, contentW - viewW);
  const thumbLeft = Math.min(
    trackWidth - thumbW,
    (Math.max(0, offsetX) / maxOffset) * (trackWidth - thumbW),
  );

  return (
    <View style={styles.related}>
      <Text style={styles.relatedTitle}>YOU MAY ALSO LIKE</Text>

      <FlatList
        data={items}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(p) => p.id}
        contentContainerStyle={styles.relatedList}
        ItemSeparatorComponent={() => <View style={{ width: 14 }} />}
        onLayout={(e) => setViewW(e.nativeEvent.layout.width)}
        onContentSizeChange={(w) => setContentW(w)}
        onScroll={(e) => setOffsetX(e.nativeEvent.contentOffset.x)}
        scrollEventThrottle={16}
        renderItem={({ item }) => (
          <TouchableOpacity activeOpacity={0.85} style={{ width: cardWidth }}>
            <View style={[styles.cardImageBox, { height: cardWidth }]}>
              <Image
                source={item.image}
                style={styles.cardImage}
                resizeMode="contain"
              />
              {item.hot && (
                <View style={styles.cardHot}>
                  <Text style={styles.cardHotText}>HOT</Text>
                </View>
              )}
            </View>
            <Text style={styles.cardShipping}>GLOBAL EXPRESS</Text>
            <Text style={styles.cardName} numberOfLines={2}>
              {item.name}
            </Text>
            <Text style={styles.cardPrice}>{item.price}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Scroll progress bar */}
      <View style={[styles.track, { width: trackWidth }]}>
        <View style={[styles.thumb, { width: thumbW, left: thumbLeft }]} />
      </View>
    </View>
  );
}

export default function App2() {
  const [size, setSize] = useState("set");
  const [qty, setQty] = useState(1);
  const [liked, setLiked] = useState(false);

  const maxQty = 3; // "Low stock" cap

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity hitSlop={10}>
          <Feather name="search" size={24} color="#000" />
        </TouchableOpacity>

        <View style={styles.logo}>
          <Text style={styles.logoText}>POP MART</Text>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity hitSlop={10}>
            <Feather name="shopping-bag" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity hitSlop={10}>
            <Feather name="menu" size={26} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Breadcrumb */}
        <View style={styles.breadcrumb}>
          <Text style={styles.crumb}>Home</Text>
          <Text style={styles.sep}>/</Text>
          <Text style={styles.crumb}>Blind Box</Text>
          <Text style={styles.sep}>/</Text>
          <Text style={styles.crumb}>HIRONO</Text>
          <Text style={styles.sep}>/</Text>
          <Text style={[styles.crumb, styles.crumbActive]} numberOfLines={1}>
            Hirono Road Journal Se...
          </Text>
        </View>

        {/* Swipeable image carousel */}
        <ImageCarousel images={IMAGES} />

        {/* Global Express */}
        <View style={styles.express}>
          <Ionicons name="planet-outline" size={20} color="#3b82d6" />
          <Text style={styles.expressText}>GLOBAL EXPRESS</Text>
        </View>

        {/* Details */}
        <View style={styles.details}>
          <View style={styles.tagRow}>
            <View style={styles.hotTag}>
              <Text style={styles.hotText}>HOT</Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity hitSlop={10}>
                <Feather name="share" size={26} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity hitSlop={10} onPress={() => setLiked(!liked)}>
                <Ionicons
                  name={liked ? "heart" : "heart-outline"}
                  size={28}
                  color={liked ? RED : "#000"}
                />
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.title}>
            Hirono Road Journal Series-Plush Doll Pendant Blind Box
          </Text>
          <Text style={styles.price}>₱6,900.00</Text>

          {/* Size */}
          <Text style={styles.label}>SIZE</Text>
          <View style={styles.sizeRow}>
            {SIZES.map((s) => {
              const selected = size === s.id;
              return (
                <TouchableOpacity
                  key={s.id}
                  activeOpacity={0.8}
                  onPress={() => setSize(s.id)}
                  style={[styles.sizeBtn, selected && styles.sizeBtnActive]}
                >
                  <Ionicons
                    name={s.icon}
                    size={22}
                    color={selected ? "#000" : "#777"}
                  />
                  <Text
                    style={[styles.sizeText, selected && styles.sizeTextActive]}
                  >
                    {s.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Quantity */}
          <Text style={styles.qtyLabel}>Quantity</Text>
          <View style={styles.qtyRow}>
            <TouchableOpacity
              disabled={qty <= 1}
              onPress={() => setQty(qty - 1)}
              style={[styles.qtyBtn, qty <= 1 && styles.qtyBtnDisabled]}
            >
              <Feather
                name="minus"
                size={22}
                color={qty <= 1 ? "#bbb" : "#000"}
              />
            </TouchableOpacity>
            <Text style={styles.qtyValue}>{qty}</Text>
            <TouchableOpacity
              disabled={qty >= maxQty}
              onPress={() => setQty(qty + 1)}
              style={[styles.qtyBtn, qty >= maxQty && styles.qtyBtnDisabled]}
            >
              <Feather
                name="plus"
                size={22}
                color={qty >= maxQty ? "#bbb" : "#000"}
              />
            </TouchableOpacity>
            <Text style={styles.lowStock}>Low stock</Text>
          </View>

          {/* CTAs */}
          <TouchableOpacity style={styles.addBtn} activeOpacity={0.85}>
            <Text style={styles.addText}>ADD TO CART</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buyBtn} activeOpacity={0.85}>
            <Text style={styles.buyText}>BUY NOW</Text>
          </TouchableOpacity>
        </View>

        <RelatedProducts items={RELATED} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },

  header: {
    height: 64,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  logo: {
    backgroundColor: "#e60012",
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  logoText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "900",
    letterSpacing: -0.5,
  },
  headerRight: { flexDirection: "row", alignItems: "center", gap: 22 },

  breadcrumb: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: "#fff",
  },
  crumb: { fontSize: 17, color: "#111" },
  crumbActive: { color: RED, flexShrink: 1 },
  sep: { fontSize: 17, color: "#555", marginHorizontal: 10 },

  imageWrap: { backgroundColor: "#f5f5f5" },
  slide: { width: "100%", height: "100%" },
  pager: {
    position: "absolute",
    right: 20,
    bottom: 14,
    fontSize: 15,
    color: "#111",
  },
  dots: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 18,
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "#ccc" },
  dotActive: { width: 18, backgroundColor: "#000" },

  express: {
    backgroundColor: "#dff0fd",
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  expressText: {
    color: "#3b82d6",
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 0.3,
  },

  details: { paddingHorizontal: 18, paddingTop: 36, paddingBottom: 40 },
  tagRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  hotTag: {
    backgroundColor: "#000",
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  hotText: { color: "#fff", fontSize: 14, fontWeight: "700" },
  actions: { flexDirection: "row", alignItems: "center", gap: 18 },

  title: {
    marginTop: 22,
    fontSize: 25,
    lineHeight: 41,
    fontWeight: "800",
    color: "#000",
  },
  price: { marginTop: 14, fontSize: 23, color: RED },

  label: { marginTop: 22, fontSize: 15, color: "#111" },
  sizeRow: { flexDirection: "row", gap: 12, marginTop: 14 },
  sizeBtn: {
    flex: 1,
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    gap: 16,
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderColor: "transparent",
  },
  sizeBtnActive: { borderColor: "#000" },
  sizeText: { fontSize: 17, color: "#777" },
  sizeTextActive: { color: "#000", fontWeight: "600" },

  qtyLabel: { marginTop: 40, fontSize: 22, color: "#000" },
  qtyRow: { flexDirection: "row", alignItems: "center", marginTop: 18 },
  qtyBtn: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#000",
  },
  qtyBtnDisabled: { borderColor: "#eee", backgroundColor: "#fafafa" },
  qtyValue: {
    width: 70,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
  },
  lowStock: { marginLeft: 12, fontSize: 16, color: RED },

  addBtn: {
    marginTop: 40,
    height: 58,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  addText: { color: "#fff", fontSize: 17, fontWeight: "600" },
  buyBtn: {
    marginTop: 18,
    height: 58,
    backgroundColor: RED,
    alignItems: "center",
    justifyContent: "center",
  },
  buyText: { color: "#fff", fontSize: 17, fontWeight: "600" },

  related: { paddingTop: 10, paddingBottom: 48, backgroundColor: "#fff" },
  relatedTitle: {
    paddingHorizontal: 18,
    fontSize: 28,
    fontWeight: "800",
    color: "#222",
    marginBottom: 22,
  },
  relatedList: { paddingHorizontal: 18 },
  cardImageBox: { backgroundColor: "#f5f5f5", width: "100%" },
  cardImage: { width: "100%", height: "100%" },
  cardHot: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "#000",
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  cardHotText: { color: "#fff", fontSize: 13, fontWeight: "600" },
  cardShipping: { marginTop: 16, fontSize: 14, color: "#222" },
  cardName: { marginTop: 8, fontSize: 17, lineHeight: 25, color: "#222" },
  cardPrice: { marginTop: 14, fontSize: 17, color: "#222" },
  track: {
    height: 4,
    marginTop: 24,
    marginLeft: 18,
    backgroundColor: "#eee",
    overflow: "hidden",
  },
  thumb: {
    position: "absolute",
    top: 0,
    height: 4,
    backgroundColor: "#c4c4c4",
  },
});
