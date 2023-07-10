import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Alert from "../components/Alert";
import axios from "axios";
import useAuth from "../hooks/useAuth";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState({});

    const { setAuth, loading } = useAuth();

    const { msg } = alert;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if ([email, password].includes("")) {
            setAlert({
                msg: "All fields are required",
                error: true
            });
        }

        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/api/users/login`;
            const { data } = await axios.post(url, { email, password });
            setAlert({});
            localStorage.setItem("token", data.token);
            setAuth(data);
            navigate("/projects");
        } catch (error) {
            setAlert({
                msg: error.response.data.msg,
                error: true
            });
        }
    };

    return (
        <>
            <h1 className="text-sky-600 font-black text-6xl">
                Login and Manage you
                <span className="text-slate-700"> Projects</span>
            </h1>
            {msg && <Alert alert={alert} />}
            <form className="my-10 bg-white shadow rounded-lg p-10" onSubmit={handleSubmit}>
                <div className="my-5">
                    <label htmlFor="email" className="uppercase text-gray-600 block font-bold text-xl">
                        Email
                    </label>
                    <input
                        name="email"
                        id="email"
                        type="email"
                        placeholder="Register Email"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="my-5">
                    <label htmlFor="password" className="uppercase text-gray-600 block font-bold text-xl">
                        Password
                    </label>
                    <input
                        name="password"
                        id="password"
                        type="password"
                        placeholder="Password"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <input
                    type="submit"
                    className="bg-sky-700 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors mb-5"
                    value="log in"
                />
            </form>
            <nav>
                <Link to="/register" className="block text-center my-5 text-slate-500 uppercase text-sm">
                    Do you not have account? Sign Up
                </Link>
                <Link to="/forget-password" className="block text-center my-5 text-slate-500 uppercase text-sm">
                    I forgot my password
                </Link>
            </nav>
        </>
    );
};

export default Login;
