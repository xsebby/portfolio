import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Callback() {
  const router = useRouter();
  const { code, error } = router.query;
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!router.isReady) return;
    if (error) {
      setStatus("error");
      setErrorMessage(String(error));
      return;
    }
    if (typeof code !== "string") {
      setStatus("error");
      setErrorMessage("No authorization code received.");
      return;
    }

    const exchange = async () => {
      try {
        const res = await fetch("/api/spotify/token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
        });
        const data = (await res.json()) as { error?: string; refresh_token?: string };

        if (!res.ok) {
          setStatus("error");
          setErrorMessage(data.error ?? "Token exchange failed");
          return;
        }

        setRefreshToken(data.refresh_token ?? null);
        setStatus("success");
      } catch (err) {
        setStatus("error");
        setErrorMessage(err instanceof Error ? err.message : "Request failed");
      }
    };

    exchange();
  }, [router.isReady, code, error]);

  return (
    <>
      <Head>
        <title>Spotify callback | sebby</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-4 text-zinc-200">
        {status === "loading" && (
          <p className="text-zinc-400">Exchanging code for tokens...</p>
        )}

        {status === "success" && refreshToken && (
          <div className="max-w-lg space-y-4 rounded-lg bg-zinc-900 p-6">
            <h1 className="text-lg font-semibold text-emerald-400">
              Spotify connected
            </h1>
            <p className="text-sm text-zinc-400">
              Add this to your Vercel env vars as{" "}
              <code className="rounded bg-zinc-800 px-1.5 py-0.5 font-mono text-xs">
                SPOTIFY_REFRESH_TOKEN
              </code>
              :
            </p>
            <pre className="break-all rounded bg-zinc-800 p-3 font-mono text-xs">
              {refreshToken}
            </pre>
            <p className="text-xs text-zinc-500">
              Also add SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET. Use scopes:{" "}
              <code className="text-zinc-400">user-read-currently-playing user-read-playback-state user-read-recently-played</code>
            </p>
          </div>
        )}

        {status === "error" && (
          <div className="max-w-lg space-y-2 rounded-lg bg-zinc-900 p-6">
            <h1 className="text-lg font-semibold text-red-400">Error</h1>
            <p className="text-sm text-zinc-400">{errorMessage}</p>
          </div>
        )}
      </main>
    </>
  );
}
