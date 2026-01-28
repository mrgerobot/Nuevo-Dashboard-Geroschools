export async function GET() {
  const upstream = process.env.STUDENTS_URL; // Apps Script web app URL (server env var)
  const r = await fetch(upstream, { cache: "no-store" });
  const data = await r.json();

  return Response.json(data, {
    headers: {
      "Cache-Control": "no-store"
    }
  });
}
