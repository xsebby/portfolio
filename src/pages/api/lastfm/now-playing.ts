import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=120");

  const apiKey = process.env.LASTFM_API_KEY;
  const username = process.env.LASTFM_USERNAME;

  if (!apiKey || !username) {
    return res.status(200).json({ playing: false });
  }

  try {
    const params = new URLSearchParams({
      method: "user.getrecenttracks",
      user: username,
      api_key: apiKey,
      format: "json",
      limit: "1",
    });

    const apiRes = await fetch(
      `https://ws.audioscrobbler.com/2.0/?${params.toString()}`
    );

    if (!apiRes.ok) {
      return res.status(200).json({ playing: false });
    }

    const data = (await apiRes.json()) as {
      recenttracks?: {
        track?: Array<{
          name?: string;
          artist?: { "#text"?: string };
          image?: Array<{ size: string; "#text": string }>;
          "@attr"?: { nowplaying?: string };
        }>;
      };
    };

    const track = data.recenttracks?.track?.[0];
    if (!track?.name || !track?.artist) {
      return res.status(200).json({ playing: false });
    }

    const image =
      track.image?.find((i) => i.size === "extralarge")?.["#text"] ??
      track.image?.find((i) => i.size === "large")?.["#text"] ??
      "";

    return res.status(200).json({
      playing: track["@attr"]?.nowplaying === "true",
      song: track.name,
      artist: track.artist["#text"] ?? "",
      albumArtUrl: image,
    });
  } catch {
    return res.status(200).json({ playing: false });
  }
}
