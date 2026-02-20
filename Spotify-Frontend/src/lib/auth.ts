import { User } from "@/types/music";

const STORAGE_KEY = "soundflow_user";

let currentUser: User | null = null;

// Mock user database
const users: { email: string; password: string; user: User }[] = [
  { email: "alex@example.com", password: "password", user: { id: 1, name: "Alex Rivera", email: "alex@example.com" } },
];

let nextUserId = 2;

export function getCurrentUser(): User | null {
  if (currentUser) return currentUser;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    currentUser = JSON.parse(stored);
    return currentUser;
  }
  return null;
}

export function signIn(email: string, password: string): { success: boolean; error?: string; user?: User } {
  const found = users.find((u) => u.email === email && u.password === password);
  if (!found) return { success: false, error: "Invalid email or password" };
  currentUser = found.user;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(found.user));
  return { success: true, user: found.user };
}

export function signUp(name: string, email: string, password: string): { success: boolean; error?: string; user?: User } {
  if (users.find((u) => u.email === email)) return { success: false, error: "Email already exists" };
  if (password.length < 6) return { success: false, error: "Password must be at least 6 characters" };
  const user: User = { id: nextUserId++, name, email };
  users.push({ email, password, user });
  currentUser = user;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  return { success: true, user };
}

export function signOut() {
  currentUser = null;
  localStorage.removeItem(STORAGE_KEY);
}
