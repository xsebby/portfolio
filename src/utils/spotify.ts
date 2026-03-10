const SPOTIFY_API_BASE = "";

export async function getSpotifyStatus() {
  if (!SPOTIFY_API_BASE) return null;
  try {
    const res = await fetch(`${SPOTIFY_API_BASE}/v1/status`);
    if (!res.ok) return null;
    return res.json() as Promise<{ lastTrack?: { name: string; artist: { name: string }; image: Array<{ size: string; "#text": string }> } }>;
  } catch {
    return null;
  }
}
