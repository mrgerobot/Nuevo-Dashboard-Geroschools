const APP_PREFIX = "gero:";
const OWNER_KEY = "gero:cacheOwnerEmail";

function clearGeroStorage() {
  for (let i = localStorage.length - 1; i >= 0; i--) {
    const key = localStorage.key(i);
    if (key && key.startsWith(APP_PREFIX)) {
      localStorage.removeItem(key);
    }
  }
}

export function reconcileCacheOwner(nextEmailRaw: string) {
  const nextEmail = nextEmailRaw.trim().toLowerCase();
  const prevEmail = (localStorage.getItem(OWNER_KEY) || "").trim().toLowerCase();

  // DIFFERENT USER → NUKE EVERYTHING gero:*
  if (prevEmail && prevEmail !== nextEmail) {
    clearGeroStorage();
  }

  // Re-establish ownership AFTER wipe
  localStorage.setItem(OWNER_KEY, nextEmail);
}
