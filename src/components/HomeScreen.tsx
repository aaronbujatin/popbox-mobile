import { Link } from "expo-router";
import { ScrollView, StyleSheet, Text } from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView>
      <Text>MacroZone</Text>
      <Text style={styles.date}>Monday, March 16</Text>

      <Link
        href="/product-detail"
        style={{ fontSize: 18, color: "#007bff" }}
      >
        Go to Product Detail
      </Link>
      <Link
        href="/signin"
        style={{ fontSize: 18, color: "#007bff" }}
      >
        Login
      </Link>
      <Link
        href="/product-list"
        style={{ fontSize: 18, color: "#007bff" }}
      >
        Go to Product List
      </Link>
      <Link
        href="/cart"
        style={{ fontSize: 18, color: "#007bff" }}
      >
        Go to Cart
      </Link>
      <Link
        href="/checkout"
        style={{ fontSize: 18, color: "#007bff" }}
      >
        Go to Checkout
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  date: {
    fontSize: 14,
    color: "#a0a0b0",
    marginTop: 4,
    marginBottom: 30,
  },
});
