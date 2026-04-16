import { Stack } from "expo-router";

function RootStack() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="about" />
    </Stack>
  );
}

export default function RootLayout() {
  return <RootStack />;
}
