const APP_PREFIX = "gero:";

export function logout() {
  try {
    localStorage.clear();
    sessionStorage.clear(); // optional but recommended
  } catch (e) {
    console.log("ERROR AT LOGOUT")
  } finally {
    // If you also keep auth/user in memory, reset it before reload
    // setAuth(null) etc. (do that where you call hardLogout)

    // Hard reload to guarantee providers re-init cleanly
    window.location.href = "/";
  }
}
