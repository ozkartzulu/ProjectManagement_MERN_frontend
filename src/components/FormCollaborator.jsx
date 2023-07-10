import { useState } from "react";
import useProjects from "../hooks/useProjects";
import Alert from "./Alert";

const FormCollaborator = () => {
    const [email, setEmail] = useState("");

    const { alert, showAlert, handleCollaborator } = useProjects();

    const { msg } = alert;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email === "") {
            showAlert({
                msg: "Email is required",
                error: true
            });
            return;
        }
        handleCollaborator(email);
    };

    return (
        <form className="bg-white py-10 px-5 w-full md:w-1/2 rounded-lg shadow" onSubmit={handleSubmit}>
            {msg && <Alert alert={alert} />}
            <div className="mb-5">
                <label htmlFor="email" className="text-gray-700 uppercase font-bold text-sm">
                    Email Collaborator
                </label>
                <input
                    type="text"
                    id="email"
                    placeholder="Email Collaborator"
                    className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <input
                type="submit"
                value="Search Collaborator"
                className="bg-sky-600 hover:bg-sky-800 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded text-sm"
            />
        </form>
    );
};

export default FormCollaborator;
