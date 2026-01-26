export type AuthPayload = {
  email: string;
  campus: string | null;
  ts: number;
};

const KEY = "gero:dashboardAuth";

export function getAuth(): AuthPayload | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthPayload;
  } catch {
    return null;
  }
}

export function setAuth(payload: AuthPayload) {
  localStorage.setItem(KEY, JSON.stringify(payload));
}

export function clearAuth() {
  localStorage.removeItem(KEY);
}
