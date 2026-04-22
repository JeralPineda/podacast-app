import { PodcastCard } from "@/components/podcast-card";
import { fetchTrending } from "@/services/podcast-index";
import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

export default function Home() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["trending"],
    queryFn: () => fetchTrending(),
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch trending</Text>;
  }

  return (
    <FlatList
      data={data?.feeds}
      contentContainerClassName="gap-4 p-2"
      columnWrapperClassName="gap-2"
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View key={item.id} className="flex-1 max-w-1/2">
          <PodcastCard podcast={item} />
        </View>
      )}
      contentInsetAdjustmentBehavior="automatic"
      numColumns={2}
    />
  );
}
