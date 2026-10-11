import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context"; // npx expo install react-native-safe-area-context

const RED = "#D9001B";
const FIELD_BORDER = "#DDDDDD";

export type SocialProvider = "line" | "google" | "apple";

type LoginRegisterScreenProps = {
  country?: string;
  onCountryPress?: () => void; // open your country picker
  onContinue?: (identifier: string) => void; // email or phone number
  onSocialPress?: (provider: SocialProvider) => void;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isValidIdentifier = (value: string): boolean => {
  const v = value.trim();
  if (EMAIL_RE.test(v)) return true;
  const digits = v.replace(/[\s\-()+]/g, "");
  return /^\d{7,15}$/.test(digits);
};

function Logo() {
  return (
    <View style={styles.logo}>
      <Text style={styles.logoText}>POP MART</Text>
    </View>
  );
}

function SocialButton({
  provider,
  onPress,
}: {
  provider: SocialProvider;
  onPress?: (p: SocialProvider) => void;
}) {
  const config = {
    line: {
      bg: "#06C755",
      icon: <FontAwesome5 name="line" brand size={26} color="#fff" />,
    },
    google: {
      bg: "#F4F4F4",
      icon: <Ionicons name="logo-google" size={22} color="#4285F4" />,
    },
    apple: {
      bg: "#000",
      icon: <Ionicons name="logo-apple" size={24} color="#fff" />,
    },
  }[provider];

  return (
    <Pressable
      onPress={() => onPress?.(provider)}
      style={[styles.social, { backgroundColor: config.bg }]}
      accessibilityLabel={`Continue with ${provider}`}
    >
      {config.icon}
    </Pressable>
  );
}

export default function LoginRegisterScreen({
  country = "Philippines",
  onCountryPress,
  onContinue,
  onSocialPress,
}: LoginRegisterScreenProps) {
  const insets = useSafeAreaInsets();
  const [identifier, setIdentifier] = useState("");
  const valid = isValidIdentifier(identifier);

  return (
    // Full-screen white page (extends to the top edge, no sheet or backdrop)
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" />
      <View style={[styles.page, { paddingTop: insets.top }]}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          {/* Header */}
          <View style={styles.header}>
            <Logo />
          </View>

          {/* Form */}
          <View style={styles.body}>
            <Text style={styles.title}>LOGIN OR REGISTER</Text>

            <Pressable
              style={[styles.field, styles.countryField]}
              onPress={onCountryPress}
            >
              <Text style={styles.countryText}>{country}</Text>
            </Pressable>

            <TextInput
              value={identifier}
              onChangeText={setIdentifier}
              placeholder="Enter your email or phone number"
              placeholderTextColor="#8A8A8A"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              returnKeyType="go"
              onSubmitEditing={() => valid && onContinue?.(identifier.trim())}
              style={[styles.field, styles.input]}
            />

            <Pressable
              disabled={!valid}
              onPress={() => onContinue?.(identifier.trim())}
              style={[styles.continueBtn, valid && styles.continueBtnActive]}
            >
              <Text style={[styles.continueText, valid && { color: "#fff" }]}>
                CONTINUE
              </Text>
            </Pressable>
          </View>

          {/* Social */}
          <View
            style={[
              styles.socialSection,
              { paddingBottom: Math.max(insets.bottom, 24) + 12 },
            ]}
          >
            <View style={styles.orRow}>
              <View style={styles.orLine} />
              <Text style={styles.orText}>OR</Text>
              <View style={styles.orLine} />
            </View>
            <View style={styles.socialRow}>
              <SocialButton provider="line" onPress={onSocialPress} />
              <SocialButton provider="google" onPress={onSocialPress} />
              <SocialButton provider="apple" onPress={onSocialPress} />
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff" },
  page: { flex: 1, backgroundColor: "#fff" },

  // Header
  header: {
    height: 74,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  logo: { backgroundColor: RED, paddingHorizontal: 7, paddingVertical: 2 },
  logoText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "900",
    letterSpacing: -0.5,
  },

  // Form
  body: { paddingHorizontal: 24, paddingTop: 88 },
  title: {
    fontSize: 18,
    fontWeight: "500",
    color: "#000",
    textAlign: "center",
    marginBottom: 36,
  },
  field: {
    height: 48,
    borderWidth: 1,
    borderColor: FIELD_BORDER,
    paddingHorizontal: 13,
    fontSize: 17,
    color: "#111",
  },
  countryField: {
    backgroundColor: "#F4F4F4",
    justifyContent: "center",
    marginBottom: 24,
  },
  countryText: { fontSize: 17, color: "#808080" },
  input: { backgroundColor: "#fff", marginBottom: 24 },
  continueBtn: {
    height: 48,
    backgroundColor: "#EEEEEE",
    alignItems: "center",
    justifyContent: "center",
  },
  continueBtnActive: { backgroundColor: "#000" },
  continueText: { fontSize: 18, color: "#999" },

  // Social
  socialSection: { marginTop: "auto", alignItems: "center" },
  orRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 20,
  },
  orLine: { width: 16, height: 1, backgroundColor: "#777" },
  orText: { fontSize: 15, color: "#666" },
  socialRow: { flexDirection: "row", gap: 20 },
  social: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
