import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Alert from "../components/Alert";

const ForgetPassword = () => {
    const [email, setEmail] = useState("");
    const [alert, setAlert] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email === "" || email.length < 7) {
            setAlert({
                msg: "The email is required",
                error: true
            });
            return;
        }

        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/api/users/forget-password`;
            const { data } = await axios.post(url, { email });
            setAlert({
                msg: data.msg,
                error: false
            });
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
                Recover your Access and don't lose your
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
                <input
                    type="submit"
                    className="bg-sky-700 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors mb-5"
                    value="Send Instructions"
                />
            </form>
            <nav>
                <Link to="/" className="block text-center my-5 text-slate-500 uppercase text-sm">
                    Do you have account? Sign in
                </Link>
                <Link to="/register" className="block text-center my-5 text-slate-500 uppercase text-sm">
                    Do you not have account? Sign Up
                </Link>
            </nav>
        </>
    );
};

export default ForgetPassword;
