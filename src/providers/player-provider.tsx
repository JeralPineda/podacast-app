import { Episode } from "@/types";
import { AudioPlayer, AudioStatus, createAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import { createContext, PropsWithChildren, use, useState } from "react";

type PlayerContextType = {
  episode: Episode | null;
  setEpisode: (ep: Episode | null) => void;
  player: AudioPlayer;
  playerStatus: AudioStatus;
};

const PlayerContext = createContext<PlayerContextType | null>(null);

const player = createAudioPlayer(null, { updateInterval: 500 });

export default function PlayerProvider({ children }: PropsWithChildren) {
  const [episode, setEpisode] = useState<Episode | null>(null);
  const status = useAudioPlayerStatus(player);

  const setActiveEpisode = (episode: Episode | null) => {
    setEpisode(episode);

    // const download = episode ? getDownload(episode.guid) : undefined;
    // player.replace({ uri: download?.localUri ?? episode?.enclosureUrl });
    player.replace({ uri: episode?.enclosureUrl });

    // Adjust with actual data
    player.setActiveForLockScreen(true, {
      title: "My Audio Title",
      artist: "Artist Name",
      albumTitle: "Album Name",
      artworkUrl: "https://example.com/artwork.jpg", // optional
    });

    player.play();
  };

  // console.log(
  //   "🚀 player-provider.tsx -> #20 ~ Current playing: ",
  //   JSON.stringify(episode, null, 2),
  // );

  return (
    <PlayerContext.Provider
      value={{
        episode,
        setEpisode: setActiveEpisode,
        player,
        playerStatus: status,
      }}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = use(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
}
