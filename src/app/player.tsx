import { usePlayer } from "@/providers/player-provider";
import { Redirect } from "expo-router";

export default function Player() {
  const { episode } = usePlayer();

  if (!episode) {
    return <Redirect href="/home" />;
  }

  return <></>;
}
