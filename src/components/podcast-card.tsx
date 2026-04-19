import { Feed } from "@/types";
import { Image, Pressable, Text, View } from "react-native";

interface PodcastCardProps {
  podcast: Feed;
}

export function PodcastCard({ podcast }: PodcastCardProps) {
  return (
    <Pressable className="gap-2">
      <Image
        className="w-full aspect-square rounded-2xl"
        source={{ uri: podcast.artwork || podcast.image }}
      />

      <View>
        <Text className="text-xs font-medium" numberOfLines={2}>
          {podcast.title}
        </Text>
        <Text className="text-xs text-gray-400" numberOfLines={1}>
          {podcast.author}
        </Text>
      </View>
    </Pressable>
  );
}
