import type { NextApiRequest, NextApiResponse } from "next";

type PreviewResponse = { image: string };

function isAllowedPreviewUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:") return false;

    const host = parsed.hostname.toLowerCase();
    return (
      host.includes("instagram.com") ||
      host.includes("youtube.com") ||
      host.includes("youtu.be") ||
      host.includes("vimeo.com") ||
      host.includes("tiktok.com") ||
      host.includes("streamable.com") ||
      host.includes("twitter.com") ||
      host.includes("x.com")
    );
  } catch {
    return false;
  }
}

function extractOgImage(html: string): string | null {
  const patterns = [
    /<meta[^>]+property=["']og:image(?::secure_url)?["'][^>]+content=["']([^"']+)["']/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image(?::secure_url)?["']/i,
    /<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i,
    /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image["']/i,
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) return match[1];
  }

  return null;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PreviewResponse | { error: string }>,
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const url = typeof req.query.url === "string" ? req.query.url : "";
  if (!url || !isAllowedPreviewUrl(url)) {
    return res.status(400).json({ error: "Invalid or unsupported URL" });
  }

  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; PortfolioBot/1.0; +https://xsebby.github.io)",
        Accept: "text/html",
      },
      redirect: "follow",
    });

    if (!response.ok) {
      return res.status(502).json({ error: "Failed to fetch preview" });
    }

    const html = await response.text();
    const image = extractOgImage(html);

    if (!image) {
      return res.status(404).json({ error: "No preview image found" });
    }

    return res.status(200).json({ image });
  } catch {
    return res.status(502).json({ error: "Failed to fetch preview" });
  }
}
