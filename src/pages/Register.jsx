import { Link } from "react-router-dom";
import { useState } from "react";
import Alert from "../components/Alert";
import axios from "axios";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [alert, setAlert] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        if ([name, email, password, repeatPassword].includes("")) {
            setAlert({
                msg: "All fields are required",
                error: true
            });
            return;
        }
        if (password !== repeatPassword) {
            setAlert({
                msg: "The Passwords entered are different",
                error: true
            });
            return;
        }
        if (password.length < 6) {
            setAlert({
                msg: "The Password must be longer than characters",
                error: true
            });
            return;
        }
        setAlert({});

        // Create the user in API
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/api/users`;
            const { data } = await axios.post(url, {
                name,
                email,
                password
            });
            setAlert({
                msg: data.msg,
                error: false
            });

            setName("");
            setEmail("");
            setPassword("");
            setRepeatPassword("");
        } catch (error) {
            setAlert({
                msg: error.response.data.msg,
                error: true
            });
        }
    };

    const { msg } = alert;

    return (
        <>
            <h1 className="text-sky-600 font-black text-6xl">
                Register and Manage you
                <span className="text-slate-700"> Projects</span>
            </h1>
            {msg && <Alert alert={alert} />}
            <form className="my-10 bg-white shadow rounded-lg p-10" onSubmit={handleSubmit}>
                <div className="my-5">
                    <label htmlFor="name" className="uppercase text-gray-600 block font-bold text-xl">
                        Name
                    </label>
                    <input
                        name="name"
                        id="name"
                        type="text"
                        placeholder="Register Name"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
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
                <div className="my-5">
                    <label htmlFor="password2" className="uppercase text-gray-600 block font-bold text-xl">
                        Repeat Password
                    </label>
                    <input
                        name="password2"
                        id="password2"
                        type="password"
                        placeholder="Password"
                        className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                    />
                </div>
                <input
                    type="submit"
                    className="bg-sky-700 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors mb-5"
                    value="Create Account"
                />
            </form>
            <nav>
                <Link to="/" className="block text-center my-5 text-slate-500 uppercase text-sm">
                    Do you have account? Sign in
                </Link>
                <Link to="/forget-password" className="block text-center my-5 text-slate-500 uppercase text-sm">
                    I forgot my password
                </Link>
            </nav>
        </>
    );
};

export default Register;
