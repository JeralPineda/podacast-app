import { fetchTrending } from "@/services/podcast-index";
import { Button, StyleSheet, Text, View } from "react-native";

export default function Home() {
  const onPress = async () => {
    const data = await fetchTrending();
    // console.log("🚀 index.tsx -> #7 ~ data:", data);
    console.log("🚀 index.tsx -> #7 ~ data:", JSON.stringify(data, null, 2));
  };

  return (
    <View style={styles.container}>
      <Text>Hello world</Text>
      <Button title="Fetch trending" onPress={onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
