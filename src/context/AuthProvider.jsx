import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [auth, setAuth] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const authUser = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setLoading(false);
                return;
            }
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };
            try {
                const url = `${import.meta.env.VITE_BACKEND_URL}/api/users/profile`;
                const { data } = await axios(url, config);
                setAuth(data);
                // if we know that have token valid, then redirect to projects page
                // navigate("/projects");
            } catch (error) {
                // when expire the token reset auth
                setAuth({});
            } finally {
                setLoading(false);
            }
        };
        authUser();
    }, []);

    const logOutAuth = () => {
        setAuth({});
    };

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                loading,
                logOutAuth
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;

export { AuthProvider };
