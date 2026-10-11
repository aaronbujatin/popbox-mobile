import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="LoginRegister" />
      <Stack.Screen name="ProductDetail" />
      <Stack.Screen name="ImageCarousel" />
      <Stack.Screen name="ProductList" />
      <Stack.Screen name="Cart" />
      <Stack.Screen name="CheckoutScreen" />
    </Stack>
  );
}
