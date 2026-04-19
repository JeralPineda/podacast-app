import { View } from "react-native";
import { Skeleton } from "./skeleton";

export function PodcastCardSkeleton() {
  return (
    <View className="gap-2">
      {/* imagen cuadrada */}
      <Skeleton height={160} borderRadius={16} />

      {/* título — dos líneas */}
      <Skeleton height={12} width="90%" />
      <Skeleton height={12} width="60%" />

      {/* autor */}
      {/* <Skeleton height={10} width="50%" borderRadius={4} /> */}
    </View>
  );
}
