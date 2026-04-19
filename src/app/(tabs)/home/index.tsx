import { fetchTrending } from "@/services/podcast-index";
import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";

export default function Home() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["trending"],
    queryFn: () => fetchTrending(),
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Error to fetch trend</Text>;
  }

  return (
    <FlatList
      data={data?.feeds}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <Text className="text-neutral-600">{item.title}</Text>}
      contentInsetAdjustmentBehavior="automatic"
    />
  );
}
