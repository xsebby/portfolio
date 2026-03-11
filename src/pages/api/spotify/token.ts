import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { code } = req.body;
  if (typeof code !== "string" || !code) {
    return res.status(400).json({ error: "Missing authorization code" });
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return res.status(500).json({
      error: "SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET must be set",
    });
  }

  const redirectUri =
    process.env.SPOTIFY_REDIRECT_URI ??
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/callback`
      : "http://localhost:3000/callback");

  try {
    const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
      }).toString(),
    });

    const data = (await tokenRes.json()) as {
      access_token?: string;
      refresh_token?: string;
      error?: string;
    };

    if (!tokenRes.ok) {
      return res.status(tokenRes.status).json({
        error: data.error ?? "Token exchange failed",
      });
    }

    return res.status(200).json({
      refresh_token: data.refresh_token,
    });
  } catch (err) {
    return res.status(500).json({
      error: err instanceof Error ? err.message : "Token exchange failed",
    });
  }
}
