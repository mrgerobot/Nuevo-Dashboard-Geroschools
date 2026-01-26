import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { setAuth, getAuth } from "@/auth/auth";

type ValidateResponse = {
  status: "allowed" | "denied" | "error";
  message: string;
  campus?: string | null;
};

const ENDPOINT = "https://staging2.geroeducacion.com/validacion/validar_email.php";

export default function Validar() {
  const navigate = useNavigate();
  const location = useLocation() as any;

  // If already authed, bounce into app
  const existing = getAuth();
  const [email, setEmail] = useState(existing?.email ?? "");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string>("");
  const [ok, setOk] = useState<boolean | null>(null);

  const from = location?.state?.from || "/resumen";

  async function validate() {
    setLoading(true);
    setMsg("");
    setOk(null);

    try {
      const body =
        "email=" +
        encodeURIComponent(email.trim()) +
        "&url_origen=" +
        encodeURIComponent(window.location.href);

      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });

      const data = (await res.json()) as ValidateResponse;

      if (data.status === "allowed") {
        setOk(true);
        setMsg("Email válido. Cargando...");

        setAuth({
          email: email.trim(),
          campus: data.campus ?? null,
          ts: Date.now(),
        });

        navigate(from, { replace: true });
        return;
      }

      setOk(false);
      setMsg(data.message || "No autorizado");
    } catch {
      setOk(false);
      setMsg("Ocurrió un error. Inténtalo nuevamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>¡Bienvenida/o!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Ingresa tu <b>email</b> para acceder al dashboard 🙌🏻
          </p>

          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ejemplo@dominio.com"
          />

          {msg && (
            <p className={`text-sm ${ok ? "text-green-600" : "text-destructive"}`}>
              {msg}
            </p>
          )}

          <Button className="w-full" onClick={validate} disabled={loading || !email.trim()}>
            {loading ? "Validando..." : "Validar"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
