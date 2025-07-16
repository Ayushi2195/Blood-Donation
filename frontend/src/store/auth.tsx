import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

type AuthContextType = {
    token: string | null;
    storeTokeninLS: (serverToken: string) => void;
    getToken: () => string | null;
    logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) setToken(storedToken);
    }, []);

    const storeTokeninLS = (serverToken: string) => {
        localStorage.setItem('token', serverToken);
        setToken(serverToken);
    };

    const getToken = () => token;

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, storeTokeninLS, getToken, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        throw new Error("useAuth used outside of the Provider");
    }
    return authContextValue;
};
