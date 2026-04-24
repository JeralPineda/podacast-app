import DownloadItem from "@/components/download-item";
import { useDownloadsStore } from "@/store/useDowloadsStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FlatList, Text, View } from "react-native";

export default function Downloads() {
  const { episodes } = useDownloadsStore();
  const downloadsList = Object.values(episodes).sort((a, b) => b.downloadedAt - a.downloadedAt);

  return (
    <FlatList
      data={downloadsList}
      keyExtractor={(item) => item.guid}
      renderItem={({ item }) => <DownloadItem episode={item} />}
      contentInsetAdjustmentBehavior="automatic"
      ListEmptyComponent={
        <View className="flex-1 items-center justify-center pt-20">
          <Ionicons name="cloud-download-outline" size={48} color="#d1d5db" />
          <Text className="text-gray-400 mt-3">No downloaded episodes</Text>
        </View>
      }
    />
  );
}
