import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useProjects from "../hooks/useProjects";
import FormCollaborator from "../components/FormCollaborator";
import Alert from "../components/Alert";

const NewCollaborator = () => {
    const params = useParams();
    const { getProject, project, collaborator, addCollaborator, alert } = useProjects();

    useEffect(() => {
        getProject(params.id);
    }, []);

    if (!project?._id) return <Alert alert={alert} />;
    return (
        <>
            <h1 className="text-4xl font-black">Add Collaborator(a): {project.name}</h1>
            <div className="mt-10 flex justify-center">
                <FormCollaborator />
            </div>
            {collaborator?.name && (
                <div className="flex justify-center mt-10">
                    <div className="bg-white py-10 px-5 w-full md:w-1/2 rounded-lg shadow ">
                        <h2 className="text-center mb-10 text-2xl font-bold">Result:</h2>
                        <div className="flex justify-between items-center">
                            <p>{collaborator.name}</p>
                            <button
                                onClick={() => addCollaborator({ email: collaborator.email })}
                                className="bg-slate-500 px-5 py-2 rounded-lg uppercase text-white font-bold text-sm"
                            >
                                Add to Project
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default NewCollaborator;
