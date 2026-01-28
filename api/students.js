export default async function handler(req, res) {
  try {
    const upstream = process.env.STUDENTS_URL;
    if (!upstream) {
      return res.status(500).json({ error: "Missing STUDENTS_URL env var" });
    }

    const r = await fetch(upstream, { method: "GET" });
    const contentType = r.headers.get("content-type") || "";

    if (!r.ok) {
      const text = await r.text();
      return res.status(502).json({
        error: `Upstream error ${r.status}`,
        upstreamStatus: r.status,
        upstreamContentType: contentType,
        upstreamBodyPreview: text.slice(0, 300),
      });
    }

    // If upstream ever returns HTML by mistake, fail clearly
    if (!contentType.includes("application/json")) {
      const text = await r.text();
      return res.status(502).json({
        error: "Upstream did not return JSON",
        upstreamContentType: contentType,
        upstreamBodyPreview: text.slice(0, 300),
      });
    }

    const data = await r.json();
    res.setHeader("Cache-Control", "no-store");
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ error: String(e?.message || e) });
  }
}
