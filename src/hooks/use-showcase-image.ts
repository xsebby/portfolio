import { useEffect, useState } from "react";

export function useShowcaseImage(image?: string, link?: string) {
  const [resolved, setResolved] = useState<string | undefined>(image);

  useEffect(() => {
    if (image) {
      setResolved(image);
      return;
    }

    if (!link) {
      setResolved(undefined);
      return;
    }

    let cancelled = false;
    setResolved(undefined);

    fetch(`/api/link-preview?url=${encodeURIComponent(link)}`)
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { image?: string } | null) => {
        if (!cancelled && data?.image) {
          setResolved(data.image);
        }
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [image, link]);

  return resolved;
}
