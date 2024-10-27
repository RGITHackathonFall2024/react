import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { TelegramAuthData } from "@telegram-auth/react";
import axios from "axios";

// Types
export interface User {
    username: string;
    home_town: string;
    university: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isLoggedIn: boolean;
    login: (userData: TelegramAuthData) => Promise<void>;
    logout: () => void;
    updateUser: (userData: Partial<User>) => Promise<void>;
}

// HTTP Client
export const authHttp = axios.create({
    baseURL: import.meta.env.VITE_AUTH_API_URL,
    headers: {
        "Content-type": "application/json",
        Accept: "application/json"
    }
});

// Request interceptor
authHttp.interceptors.request.use((config) => {
    const token = localStorage.getItem("jwt");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Context creation
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const token = localStorage.getItem("jwt");
            if (!token) {
                throw new Error("No token found");
            }
            const userData = await me();
            setUser(userData);
        } catch (error) {
            setUser(null);
            localStorage.removeItem("jwt");
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (telegramData: TelegramAuthData) => {
        try {
            setIsLoading(true);
            const resp = await authHttp.post("/api/v1/login", telegramData);
            const token = resp.data.token;
            localStorage.setItem("jwt", token);
            const userData = await me();
            setUser(userData);
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem("jwt");
        setUser(null);
    };

    const updateUser = async (userData: Partial<User>) => {
        try {
            const response = await authHttp.post("/api/v1/me", userData);
            await checkAuthStatus();
            return response.data;
        } catch (error) {
            console.error("Failed to update user:", error);
            throw error;
        }
    };

    const value = {
        user,
        isLoading,
        isLoggedIn: !!user,
        login,
        logout,
        updateUser
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook for using auth context
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

// Helper functions
async function me(): Promise<User> {
    const resp = await authHttp.get("/api/v1/me");
    return resp.data;
}