// src/lib/logout.ts
export function logout() {
  // 1) Remove auth
  localStorage.removeItem("gero:dashboardAuth");

  // 2) Remove dashboard-scoped cached keys (safe wipe)
  for (let i = localStorage.length - 1; i >= 0; i--) {
    const key = localStorage.key(i);
    if (!key) continue;

    // Adjust prefixes to match your app
    if (
      key.startsWith("gero:dashboard:") ||
      key.startsWith("gero:miniCoach:") ||
      key.startsWith("gero:filters:")
    ) {
      localStorage.removeItem(key);
    }
  }

  // 3) Hard reload to fully reset in-memory state
  window.location.href = "/";
}
