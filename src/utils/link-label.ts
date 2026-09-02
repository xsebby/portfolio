export function getLinkLabel(url: string, custom?: string): string {
  if (custom) return custom;

  const lower = url.toLowerCase();
  if (lower.includes("youtube.com") || lower.includes("youtu.be")) {
    return "watch on youtube";
  }
  if (lower.includes("instagram.com")) return "view post";
  if (lower.includes("vimeo.com")) return "watch on vimeo";
  if (lower.includes("tiktok.com")) return "view on tiktok";
  return "view finished product";
}
