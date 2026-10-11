import { Ionicons } from "@expo/vector-icons";
import {
  Linking,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Footer() {
  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.footer}>
      {/* ================= COMMUNITY ================= */}
      <View style={styles.section}>
        <Text style={styles.title}>JOIN THE COMMUNITY</Text>

        <Text style={styles.description}>
          Be the first to catch our new releases, exclusive offers, and more.
        </Text>

        <View style={styles.subscribeContainer}>
          <TextInput
            placeholder="Enter your email address"
            placeholderTextColor="#777"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TouchableOpacity>
            <Text style={styles.subscribe}>Subscribe</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ================= CONTACT ================= */}
      <View style={styles.section}>
        <Text style={styles.contactTitle}>Contact Us</Text>

        {/* Customer Service */}
        <View style={styles.contactBox}>
          <View>
            <Text style={styles.contactLabel}>Online customer service</Text>

            <Text style={styles.contactValue}>Mon-Sun 00:00-24:00</Text>
          </View>

          <TouchableOpacity>
            <Text style={styles.link}>Contact Us</Text>
          </TouchableOpacity>
        </View>

        {/* Email */}
        <View style={styles.contactBox}>
          <View>
            <Text style={styles.contactLabel}>Email</Text>

            <Text style={styles.contactValue}>PH.service@popmart.com</Text>
          </View>

          <TouchableOpacity>
            <Text style={styles.link}>Email us</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.helpCenter}>
          <Text style={styles.link}>Visit Help Center (FAQs)</Text>
        </TouchableOpacity>
      </View>

      {/* ================= SOCIAL ================= */}
      <View style={styles.socialContainer}>
        <TouchableOpacity onPress={() => openLink("https://instagram.com")}>
          <Ionicons name="logo-instagram" size={25} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => openLink("https://facebook.com")}>
          <Ionicons name="logo-facebook" size={25} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* ================= APP DOWNLOAD ================= */}
      <View style={styles.storeContainer}>
        <TouchableOpacity style={styles.storeButton}>
          <Ionicons name="logo-google-playstore" size={28} color="#fff" />

          <View>
            <Text style={styles.smallText}>GET IT ON</Text>
            <Text style={styles.storeText}>Google Play</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.storeButton}>
          <Ionicons name="logo-apple" size={28} color="#fff" />

          <View>
            <Text style={styles.smallText}>Download on the</Text>
            <Text style={styles.storeText}>App Store</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#000",
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 20,
  },

  section: {
    marginBottom: 36,
  },

  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 18,
  },

  description: {
    color: "#555",
    fontSize: 15,
    marginBottom: 18,
  },

  subscribeContainer: {
    height: 40,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
  },

  input: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 16,
    fontSize: 14,
    color: "#222",
  },

  subscribe: {
    color: "#000",
    fontSize: 14,
    marginRight: 12,
    textDecorationLine: "underline",
  },

  contactTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 26,
  },

  contactBox: {
    minHeight: 96,
    borderWidth: 1,
    borderColor: "#444",
    paddingHorizontal: 18,
    paddingVertical: 20,
    marginBottom: 12,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  contactLabel: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
  },

  contactValue: {
    color: "#555",
    fontSize: 14,
  },

  link: {
    color: "#555",
    fontSize: 14,
    textDecorationLine: "underline",
  },

  helpCenter: {
    alignItems: "center",
    marginTop: 12,
  },

  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 18,
    marginBottom: 34,
  },

  storeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
  },

  storeButton: {
    backgroundColor: "#222",
    borderRadius: 4,
    height: 42,
    minWidth: 140,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  smallText: {
    color: "#fff",
    fontSize: 8,
  },

  storeText: {
    color: "#fff",
    fontSize: 15,
  },
});
