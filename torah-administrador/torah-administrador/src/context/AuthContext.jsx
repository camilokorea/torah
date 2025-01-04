import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const API_URL = 'https://localhost:7116/api/Auth/';
    const [token, setToken] = useState(sessionStorage.getItem("token") || "");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [user, setUser] = useState(sessionStorage.getItem("user") || "");
    const [isAuthenticated, setIsAuthenticated] = useState(JSON.parse(sessionStorage.getItem('isAuthenticated')) || false);

    const login = async (userData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(API_URL + 'login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                setToken(null);
                setUser(null);
                setIsAuthenticated(false);
                setError(response.status + '-' + response.statusText);
                return {
                    authenticated: false,
                    message: error,
                    error: true
                };
            } else {
                const data = await response.json();
                setToken(data.token);
                setUser(userData.email);
                setIsAuthenticated(true);

                sessionStorage.setItem("token", data.token);
                sessionStorage.setItem("username", userData.email);
                sessionStorage.setItem("isAuthenticated", "true");
                return {
                    authenticated: true,
                    message: 'autenticado',
                    error: false
                };
            }
        } catch (err) {
            setToken(null);
            setUser(null);
            setIsAuthenticated(false);
            setError(err.message);
            return {
                authenticated: false,
                message: err.message,
                error: true
            };
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);

        sessionStorage.removeItem("token");
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("isAuthenticated");
    };

    return (
        <AuthContext.Provider value={{ token, loading, user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook para usar el contexto
export const useAuth = () => {
    return useContext(AuthContext);
};
