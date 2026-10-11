import { Product } from "@/types/Product";
import { useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

export default function RecommendProduct({ items }: { items: Product[] }) {
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
                source={item.images[0] || require("@/assets/images/image.png")}
                style={styles.cardImage}
                resizeMode="contain"
              />
              {item.isNew && (
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

const styles = StyleSheet.create({
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
