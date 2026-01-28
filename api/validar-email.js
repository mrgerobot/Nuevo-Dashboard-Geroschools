export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ status: "error", message: "Method not allowed" });

  const { email, url_origen } = req.body || {};
  if (!email) return res.status(400).json({ status: "error", message: "Missing email" });

  const body = new URLSearchParams({
    email: String(email),
    url_origen: String(url_origen || "vercel-dashboard"),
  }).toString();

  const r = await fetch("https://geroeducacion.com/validacion/validar_email.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  const text = await r.text();

  // forward JSON (or fail gracefully)
  try {
    const json = JSON.parse(text);
    res.status(200).json(json);
  } catch {
    res.status(200).json({ status: "error", message: "Invalid response from validator" });
  }
}
