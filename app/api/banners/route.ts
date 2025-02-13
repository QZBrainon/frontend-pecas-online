import { revalidatePath } from "next/cache";

export async function GET(_req: Request) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/banner`
  );
  const bannerUrl = await response.text();
  const headers = new Headers(response.headers);
  headers.set("Cache-Control", "no-store");
  revalidatePath("/api/banners");
  return new Response(bannerUrl, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
}
