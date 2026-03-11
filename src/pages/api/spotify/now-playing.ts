import type { NextApiRequest, NextApiResponse } from "next";

async function getAccessToken(): Promise<string | null> {
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!refreshToken || !clientId || !clientSecret) return null;

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }).toString(),
  });

  const data = (await res.json()) as { access_token?: string };
  return data.access_token ?? null;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  res.setHeader("Cache-Control", "s-maxage=30, stale-while-revalidate=60");

  const accessToken = await getAccessToken();
  if (!accessToken) {
    return res.status(200).json({ playing: false });
  }

  try {
    const playerRes = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    if (playerRes.status === 204 || !playerRes.ok) {
      // 204 = nothing playing
      return res.status(200).json({ playing: false });
    }

    const data = (await playerRes.json()) as {
      is_playing?: boolean;
      item?: {
        name: string;
        artists: Array<{ name: string }>;
        album?: {
          images?: Array<{ url: string; height: number }>;
        };
      };
    };

    const item = data.item;
    if (!item) {
      return res.status(200).json({ playing: false });
    }

    const image = item.album?.images?.sort(
      (a, b) => (b.height ?? 0) - (a.height ?? 0)
    )[0];

    return res.status(200).json({
      playing: data.is_playing ?? false,
      song: item.name,
      artist: item.artists?.map((a) => a.name).join(", ") ?? "",
      albumArtUrl: image?.url ?? "",
    });
  } catch {
    return res.status(200).json({ playing: false });
  }
}
