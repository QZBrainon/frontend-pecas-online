export async function GET(_req: Request) {
  const response = await fetch(
    `https://novopeasonlinebackend-lnq16zyw.b4a.run/v1/api/banner`
  );

  const bannerUrl = await response.text();
  return new Response(bannerUrl, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
}
