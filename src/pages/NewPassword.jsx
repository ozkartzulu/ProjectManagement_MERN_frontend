import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Alert from "../components/Alert";

const NewPassword = () => {
    const params = useParams();
    const { token } = params;

    const [tokenValid, setTokenValid] = useState(false);
    const [alert, setAlert] = useState({});
    const [password, setPassword] = useState("");
    const [passwordModified, setPasswordModified] = useState(false);

    useEffect(() => {
        const checkToken = async () => {
            try {
                // TODO: move to axios client
                const url = `${import.meta.env.VITE_BACKEND_URL}/api/users/forget-password/${token}`;
                const { data } = await axios(url);
                setTokenValid(true);
                setAlert({});
            } catch (error) {
                setAlert({
                    msg: error.response.data.msg,
                    error: true
                });
            }
        };
        checkToken();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password.length < 6) {
            setAlert({
                msg: "The password must be al lest 6 characters",
                error: true
            });
            return;
        }

        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/api/users/forget-password/${token}`;
            const { data } = await axios.post(url, { password });
            setAlert({
                msg: data.msg,
                error: false
            });
            setPasswordModified(true);
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
                Reset your Password and don't lose Access to your
                <span className="text-slate-700"> Projects</span>
            </h1>
            {msg && <Alert alert={alert} />}
            {tokenValid && (
                <form className="my-10 bg-white shadow rounded-lg p-10" onSubmit={handleSubmit}>
                    <div className="my-5">
                        <label htmlFor="password" className="uppercase text-gray-600 block font-bold text-xl">
                            New Password
                        </label>
                        <input
                            name="password"
                            id="password"
                            type="password"
                            placeholder="New Password"
                            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <input
                        type="submit"
                        className="bg-sky-700 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors mb-5"
                        value="Reset Password"
                    />
                </form>
            )}
            {passwordModified && (
                <Link to="/" className="block text-center my-5 text-slate-500 uppercase text-sm">
                    Sign in
                </Link>
            )}
        </>
    );
};

export default NewPassword;
