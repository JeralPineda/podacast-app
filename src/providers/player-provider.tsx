import { Episode } from "@/types";
import { createContext, PropsWithChildren, use, useContext, useState } from "react";

type PlayerContextType = {
  episode: Episode | null;
  setEpisode: (ep: Episode | null) => void;
};

const PlayerContext = createContext<PlayerContextType | null>(null);

export default function PlayerProvider({ children }: PropsWithChildren) {
  const [episode, setEpisode] = useState<Episode | null>(null);

  const setActiveEpisode = (episode: Episode | null) => {
    setEpisode(episode);

    // play audio
  };

  console.log(
    "🚀 player-provider.tsx -> #20 ~ Current playing: ",
    JSON.stringify(episode, null, 2),
  );

  return (
    <PlayerContext.Provider
      value={{
        episode,
        setEpisode: setActiveEpisode,
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
