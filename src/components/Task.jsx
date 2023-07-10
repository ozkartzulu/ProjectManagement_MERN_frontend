import { formatDate } from "../helpers/FormatDate";
import useProjects from "../hooks/useProjects";
import useAdmin from "../hooks/useAdmin";

const Task = ({ task }) => {
    const { name, description, deadline, priority, _id, state } = task;
    const { handleModalEdit, handleModalDelete, completeTask } = useProjects();
    const admin = useAdmin();
    return (
        <div className="border-b p-5 flex justify-between items-center">
            <div className="flex flex-col items-start">
                <p className="mb-1 text-xl">{name}</p>
                <p className="mb-1 text-sm text-gray-500 uppercase">{description}</p>
                <p className="mb-1 text-sm">{formatDate(deadline)}</p>
                <p className="mb-1 text-gray-600">Priority: {priority}</p>
                {state && (
                    <p className="text-xs bg-green-600 uppercase px-2 py-1 rounded-lg text-white">
                        Completed by: {task.completed.name}
                    </p>
                )}
            </div>
            <div className="flex flex-col lg:flex-row gap-2">
                {admin && (
                    <button
                        onClick={() => handleModalEdit(task)}
                        className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                    >
                        Edit
                    </button>
                )}
                <button
                    onClick={() => completeTask(_id)}
                    className={`${
                        state ? "bg-sky-600" : "bg-gray-600"
                    } px-4 py-3 text-white uppercase font-bold text-sm rounded-lg`}
                >
                    {state ? "Complete" : "Incomplete"}
                </button>

                {admin && (
                    <button
                        onClick={() => handleModalDelete(task)}
                        className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                    >
                        Delete
                    </button>
                )}
            </div>
        </div>
    );
};

export default Task;
