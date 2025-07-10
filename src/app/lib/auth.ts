import api from "./api";

export async function signOut() {
  try {
    await api.post("/api/auth/logout");
    window.location.href = "/login";
  } catch (error) {
    console.error("Error signing out:", error);
  }
}