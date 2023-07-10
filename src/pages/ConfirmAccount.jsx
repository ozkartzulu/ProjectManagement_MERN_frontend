import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Alert from "../components/Alert";

const ConfirmAccount = () => {
    const params = useParams();
    const { id } = params;

    const [alert, setAlert] = useState({});
    const [confirmedAccount, setConfirmedAccount] = useState(false);

    useEffect(() => {
        const confirmAccount = async () => {
            try {
                const url = `${import.meta.env.VITE_BACKEND_URL}/api/users/confirm/${id}`;
                const { data } = await axios(url);
                setAlert({
                    msg: data.msg,
                    error: false
                });
                setConfirmedAccount(true);
            } catch (error) {
                setAlert({
                    msg: error.response.data.msg,
                    error: true
                });
            }
        };
        confirmAccount();
    }, []);

    const { msg } = alert;

    return (
        <>
            <h1 className="text-sky-600 font-black text-6xl">
                Confirm you Account and Start to Create your
                <span className="text-slate-700"> Projects</span>
            </h1>
            <div className="mt-15 md:mt-8 shadow-lg px-5 py-8 rounded-md bg-white">
                {msg && <Alert alert={alert} />}
                {confirmedAccount && (
                    <Link to="/" className="block text-center my-5 text-slate-500 uppercase text-sm">
                        Sign in
                    </Link>
                )}
            </div>
        </>
    );
};

export default ConfirmAccount;
