import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
    token: string | null;
    storeTokenInLS: (serverToken: string) => void;
    getToken: () => string | null;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        setToken(storedToken && storedToken.trim() !== "" ? storedToken : null);
    }, []);

    const storeTokenInLS = (serverToken: string) => {
        localStorage.setItem('token', serverToken);
        setToken(serverToken);
    };

    const getToken = () => token;

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, storeTokenInLS, getToken, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
};
