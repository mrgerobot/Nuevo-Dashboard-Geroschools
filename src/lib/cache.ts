const APP_PREFIX = "gero:";
const OWNER_KEY = "gero:cacheOwnerEmail";

export function reconcileCacheOwner(nextEmailRaw: string) {
  const nextEmail = nextEmailRaw.trim().toLowerCase();
  const prevEmail = (localStorage.getItem(OWNER_KEY) || "").trim().toLowerCase();

  // If different user => flush all gero:* keys
  if (prevEmail && prevEmail !== nextEmail) {
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const k = localStorage.key(i);
      if (k && k.startsWith(APP_PREFIX)) localStorage.removeItem(k);
    }
  }

  // Record who owns the cache now
  localStorage.setItem(OWNER_KEY, nextEmail);
}
