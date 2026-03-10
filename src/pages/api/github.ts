import type { NextApiRequest, NextApiResponse } from "next";
import { GITHUB_USERNAME } from "@/utils/constants";

const AVATAR_URL = `https://avatars.githubusercontent.com/${GITHUB_USERNAME}?size=120`;

type ApiResponse = {
  avatarUrl: string;
  status: { emoji: string; message: string } | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse | { error: string }>
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=120");

  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return res.status(200).json({
      avatarUrl: AVATAR_URL,
      status: null,
    });
  }

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: `
          query($login: String!) {
            user(login: $login) {
              avatarUrl(size: 120)
              status {
                emoji
                message
              }
            }
          }
        `,
        variables: { login: GITHUB_USERNAME },
      }),
      next: { revalidate: 60 },
    });

    const json = (await response.json()) as {
      data?: { user?: { avatarUrl: string; status?: { emoji: string; message: string } } };
      errors?: Array<{ message: string }>;
    };

    if (!response.ok || json.errors?.length) {
      return res.status(200).json({
        avatarUrl: AVATAR_URL,
        status: null,
      });
    }

    const user = json.data?.user;
    const status =
      user?.status?.message != null
        ? { emoji: user.status.emoji ?? "", message: user.status.message }
        : null;

    return res.status(200).json({
      avatarUrl: user?.avatarUrl ?? AVATAR_URL,
      status,
    });
  } catch {
    return res.status(200).json({
      avatarUrl: AVATAR_URL,
      status: null,
    });
  }
}
