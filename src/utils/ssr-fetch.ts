import { cookies } from "next/headers";

export async function fetchWithCookies<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  const res = await fetch(url, {
    ...options,
    headers: {
      ...(options?.headers || {}),
      Cookie: `access_token=${accessToken || ""}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Fetch failed with status ${res.status}`);
  }

  return res.json();
}
