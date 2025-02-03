import { revalidatePath } from "next/cache";

export async function GET(_req: Request) {
  const response = await fetch(
    `https://novopeasonlinebackend-lnq16zyw.b4a.run/v1/api/banner`
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
