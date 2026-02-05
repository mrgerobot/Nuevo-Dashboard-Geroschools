const APP_PREFIX = "gero:";

export function logout() {
  try {
    // Remove only your app keys (recommended)
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(APP_PREFIX)) keysToRemove.push(k);
    }
    keysToRemove.forEach((k) => localStorage.removeItem(k));

    // Also clear sessionStorage in case you use it
    const sKeysToRemove: string[] = [];
    for (let i = 0; i < sessionStorage.length; i++) {
      const k = sessionStorage.key(i);
      if (k && k.startsWith(APP_PREFIX)) sKeysToRemove.push(k);
    }
    sKeysToRemove.forEach((k) => sessionStorage.removeItem(k));

    // Optional: clear caches if you use Cache Storage (service worker / fetch caches)
    if ("caches" in window) {
      caches.keys().then((names) => names.forEach((n) => caches.delete(n)));
    }
  } catch (e) {
    // ignore
  } finally {
    // If you also keep auth/user in memory, reset it before reload
    // setAuth(null) etc. (do that where you call hardLogout)

    // Hard reload to guarantee providers re-init cleanly
    window.location.href = "/";
  }
}
