import { useState } from "react";
import useProjects from "../hooks/useProjects";
import Alert from "./Alert";

const FormProject = ({ project }) => {
    const [name, setName] = useState(project?.name ? project.name : "");
    const [description, setDescription] = useState(project?.description ? project.description : "");
    const [deadline, setDeadline] = useState(project?.deadline ? project.deadline.split("T")[0] : "");
    const [client, setClient] = useState(project?.client ? project.client : "");

    const { alert, showAlert, submitProject } = useProjects();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if ([name, description, deadline, client].includes("")) {
            showAlert({
                msg: "All fields are required",
                error: true
            });
            return;
        }

        await submitProject({ id: project?._id, name, description, deadline, client });

        setName("");
        setDescription("");
        setDeadline("");
        setClient("");
    };

    const { msg } = alert;

    return (
        <form action="" className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow-md" onSubmit={handleSubmit}>
            {msg && <Alert alert={alert} />}
            <div className="mb-5">
                <label htmlFor="name" className="text-gray-700 uppercase font-bold text-sm">
                    Project Name
                </label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    className="border w-full p-2 placeholder-gray-400 rounded-md"
                    placeholder="Project Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label htmlFor="description" className="text-gray-700 uppercase font-bold text-sm">
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    className="border w-full p-2 placeholder-gray-400 rounded-md"
                    placeholder="Project Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label htmlFor="deadline" className="text-gray-700 uppercase font-bold text-sm">
                    Project Name
                </label>
                <input
                    id="deadline"
                    name="deadline"
                    type="date"
                    className="border w-full p-2 placeholder-gray-400 rounded-md"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label htmlFor="client" className="text-gray-700 uppercase font-bold text-sm">
                    Client Name
                </label>
                <input
                    id="client"
                    name="client"
                    type="text"
                    className="border w-full p-2 placeholder-gray-400 rounded-md"
                    placeholder="Client Name"
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                />
            </div>
            <input
                type="submit"
                value={project?._id ? "Update Project" : "Create Project"}
                className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-800 transition-color"
            />
        </form>
    );
};

export default FormProject;
