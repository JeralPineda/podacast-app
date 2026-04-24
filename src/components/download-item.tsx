import { usePlayer } from "@/providers/player-provider";
import { deleteEpisodeDownload } from "@/services/dowloads";
import { DownloadedEpisode, useDownloadsStore } from "@/store/useDowloadsStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { Alert, Image, Pressable, Text, View } from "react-native";

export default function DownloadItem({ episode }: { episode: DownloadedEpisode }) {
  const { removeDownload } = useDownloadsStore();
  const { setEpisode } = usePlayer();

  const handlePlay = () => {
    setEpisode(episode.episodeData);
    router.push("/player");
  };

  const handleDelete = () => {
    Alert.alert("Remove Download", `Delete "${episode.title}"?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          const idMatch = episode.localUri.match(/episode-(\d+)\.mp3/);
          if (idMatch) {
            deleteEpisodeDownload(Number(idMatch[1]));
          }
          removeDownload(episode.guid);
        },
      },
    ]);
  };

  return (
    <Pressable onPress={handlePlay} className="flex-row items-center gap-3 px-4 py-3">
      <Image className="w-14 h-14 rounded-lg" source={{ uri: episode.image }} />
      <View className="flex-1">
        <Text className="text-sm font-medium" numberOfLines={2}>
          {episode.title}
        </Text>
        <Text className="text-xs text-gray-400" numberOfLines={1}>
          {episode.feedTitle}
        </Text>
      </View>
      <Pressable onPress={handleDelete} className="p-2">
        <Ionicons name="trash-outline" size={20} color="#ef4444" />
      </Pressable>
    </Pressable>
  );
}
