import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { User } from "@/lib/api";

interface AuthContextType {
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
    isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(() => {
        try {
            const stored = localStorage.getItem("soundwave_user");
            return stored ? JSON.parse(stored) : null;
        } catch {
            return null;
        }
    });

    const login = (user: User) => {
        setUser(user);
        localStorage.setItem("soundwave_user", JSON.stringify(user));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("soundwave_user");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoggedIn: !!user }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}