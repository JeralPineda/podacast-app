import { fetchFeedById } from "@/services/podcast-index";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";

export default function PodcastDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data, isLoading, error } = useQuery({
    queryKey: ["feed", id],
    queryFn: () => fetchFeedById(id),
  });

  const podcast = data?.feed;

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator />
      </View>
    );
  }

  if (error || !podcast) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-gray-500">Could not fetch the podcast</Text>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerClassName="items-center px-6 py-8"
      contentInsetAdjustmentBehavior="automatic">
      <Image className="w-60 h-60 rounded-2xl" source={{ uri: podcast.artwork || podcast.image }} />
    </ScrollView>
  );
}
