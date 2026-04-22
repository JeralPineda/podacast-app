import { Episode, Feed } from "@/types";
import * as Crypto from "expo-crypto";
export type { Episode, Feed };

// Había un problema con la api secret al parecer cortaba la variable por culpa del signo $, eso me devolvia un 401 en la api.
// Como se resolvió
// 1. se ejecuto la siguiente linea en la terminal: echo -n 'Valor de la variable' | base64
// 2. se copia el resultado y se pone en la variable de entorno de expo: EXPO_PUBLIC_PODCAST_INDEX_API_SECRET_B64=<resultado_del_comando>

const apiKey = process.env.EXPO_PUBLIC_PODCAST_INDEX_API_KEY;
// const apiSecret = process.env.EXPO_PUBLIC_PODCAST_INDEX_API_SECRET;
const apiSecret = process.env.EXPO_PUBLIC_PODCAST_INDEX_API_SECRET_B64;

if (!apiKey || !apiSecret) {
  throw new Error(
    "EXPO_PUBLIC_PODCAST_INDEX_API_KEY or EXPO_PUBLIC_PODCAST_INDEX_API_SECRET is not defined",
  );
}

const fetchIndex = async (path: string, options: RequestInit = {}) => {
  // Read more about Podcast Index Authorization: https://podcastindex-org.github.io/docs-api/#auth

  // ======== Hash them to get the Authorization token ========
  const time = Math.floor(Date.now() / 1000);
  const dataToHash = apiKey + "BJ$b2xpJbHkWyGxG^D6C9^jakNrs2ubyWW#86Fev" + time;

  const authHash = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA1, dataToHash);

  const optionsWithAuth = {
    ...options,
    method: options.method || "get",
    headers: {
      "User-Agent": "notJustPodcast/1.0",
      "X-Auth-Date": "" + time,
      "X-Auth-Key": apiKey,
      Authorization: authHash,
      ...options.headers,
    },
  };

  const url = `https://api.podcastindex.org/api/1.0${path}`;

  return fetch(url, optionsWithAuth);
};

export async function fetchTrending(): Promise<{ feeds: Feed[] } | undefined> {
  try {
    const res = await fetchIndex(`/podcasts/trending?lang=es`);

    return res.json();
  } catch (error) {
    console.log("🚀 podcast-index.ts -> #52 -> error ~", error);
    // return { feeds: [] };
  }
}

export async function fetchFeedById(id: string): Promise<{ feed: Feed } | undefined> {
  try {
    const res = await fetchIndex(`/podcasts/byfeedid?id=${id}`);

    return res.json();
  } catch (error) {
    console.log("🚀 podcast-index.ts -> #63 -> error ~", error);
    // return { feeds: [] };
  }
}
