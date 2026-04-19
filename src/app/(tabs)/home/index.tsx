import { PodcastCard } from "@/components/podcast-card";
import { PodcastCardSkeleton } from "@/components/podcast-skeleton";
import { fetchTrending } from "@/services/podcast-index";
import { useQuery } from "@tanstack/react-query";
import { FlatList, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SKELETON_COUNT = 6;

export default function Home() {
  const insets = useSafeAreaInsets();

  const { data, isLoading, error } = useQuery({
    queryKey: ["trending"],
    queryFn: () => fetchTrending(),
  });

  if (error) {
    return <Text>Error to fetch trend</Text>;
  }

  if (isLoading) {
    return (
      <FlatList
        data={Array.from({ length: SKELETON_COUNT })}
        contentContainerClassName="gap-4 p-2"
        columnWrapperClassName="gap-2"
        keyExtractor={(_, index) => `skeleton-${index}`}
        renderItem={() => (
          <View className="flex-1 max-w-1/2">
            <PodcastCardSkeleton />
          </View>
        )}
        style={{ paddingTop: insets.top + 100 }}
        contentInsetAdjustmentBehavior="automatic"
        numColumns={2}
        scrollEnabled={false}
      />
    );
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
