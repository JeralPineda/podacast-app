import { Stack } from "expo-router";

function RootStack() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="index" />
    </Stack>
  );
}

export default function RootLayout() {
  return <RootStack />;
}
