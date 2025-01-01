import { useState } from 'react';

const API_URL = 'https://localhost:7116/api/Auth/';

export const UseAuth = () => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem("isAuthenticated") === "true";
    });

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

    const logout = async () => {
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);

        sessionStorage.removeItem("token");
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("isAuthenticated");
    };

    return { user, token, loading, error, isAuthenticated, login, logout };
};