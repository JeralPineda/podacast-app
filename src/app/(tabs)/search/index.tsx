import { Stack } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <View className="flex-1">
      <Stack.SearchBar
        placement="automatic"
        placeholder="Search podcasts"
        hideNavigationBar={false}
        onChangeText={(text) => setSearchTerm(text.nativeEvent.text)}
      />

      <Text>Search</Text>
    </View>
  );
}
