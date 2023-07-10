import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import useAuth from "../hooks/useAuth";

let socket;

const ProjectsContext = createContext();
const ProjectsProvider = ({ children }) => {
    const navigate = useNavigate();

    const { auth } = useAuth();

    const [projects, setProjects] = useState([]);
    const [alert, setAlert] = useState({});
    const [project, setProject] = useState({});
    const [modalFormTask, setModalFormTask] = useState(false);
    const [modalDeleteTask, setModalDeleteTask] = useState(false);
    const [modalDeleteCollaborator, setModalDeleteCollaborator] = useState(false);
    const [task, setTask] = useState({});
    const [collaborator, setCollaborator] = useState({});
    const [search, setSearch] = useState(false);

    useEffect(() => {
        const getProjects = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) return;

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                };

                const url = `${import.meta.env.VITE_BACKEND_URL}/api/projects`;
                const { data } = await axios(url, config);
                setProjects(data);
            } catch (error) {
                console.log(error);
            }
        };
        getProjects();
    }, [auth]);

    useEffect(() => {
        socket = io(import.meta.env.VITE_BACKEND_URL);
    }, []);

    const showAlert = (alert) => {
        setAlert(alert);
        setTimeout(() => {
            setAlert({});
        }, 3000);
    };

    const submitProject = async (project) => {
        if (project.id) await editProject(project);
        else await createProject(project);
    };

    const createProject = async (project) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };

            const url = `${import.meta.env.VITE_BACKEND_URL}/api/projects`;
            const { data } = await axios.post(url, project, config);
            setProjects([...projects, data]);
            setAlert({
                msg: "Project created successfully",
                error: false
            });

            setTimeout(() => {
                setAlert({});
                navigate("/projects");
            }, 3000);
        } catch (error) {
            console.log(error);
        }
    };

    const editProject = async (project) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };

            const url = `${import.meta.env.VITE_BACKEND_URL}/api/projects/${project.id}`;
            const { data } = await axios.put(url, project, config);

            const projectsUpdated = projects.map((projectState) =>
                projectState._id === data._id ? data : projectState
            );
            setProjects(projectsUpdated);

            setAlert({
                msg: "Project created successfully",
                error: false
            });

            setTimeout(() => {
                setAlert({});
                navigate("/projects");
            }, 3000);
        } catch (error) {
            console.log(error);
        }
    };

    const getProject = async (id) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };

            const url = `${import.meta.env.VITE_BACKEND_URL}/api/projects/${id}`;
            const { data } = await axios(url, config);
            setProject(data);
            setAlert({});
        } catch (error) {
            navigate("/projects");
            showAlert({
                msg: error.response.data.msg,
                error: true
            });
        }
    };

    const deleteProject = async (id) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };

            const url = `${import.meta.env.VITE_BACKEND_URL}/api/projects/${id}`;
            const { data } = await axios.delete(url, config);

            const projectsUpdated = projects.filter((projectState) => projectState._id !== id);
            setProjects(projectsUpdated);

            setAlert({
                msg: "Project deleted successfully",
                error: false
            });

            setTimeout(() => {
                setAlert({});
                navigate("/projects");
            }, 3000);
        } catch (error) {
            console.log(error);
        }
    };

    const handleModalTask = () => {
        setModalFormTask(!modalFormTask);
        setTask({});
    };

    const handleModalEdit = (task) => {
        setTask(task);
        setModalFormTask(true);
    };

    const handleModalDelete = (task) => {
        setTask(task);
        setModalDeleteTask(!modalDeleteTask);
    };

    const handleModalDeleteCollaborator = (collaborator) => {
        setCollaborator(collaborator);
        setModalDeleteCollaborator(!modalDeleteCollaborator);
    };

    const submitTask = async (task) => {
        if (task?.id) {
            await updateTask(task);
        } else {
            await createTask(task);
        }
    };

    const createTask = async (task) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };

            const url = `${import.meta.env.VITE_BACKEND_URL}/api/tasks`;
            const { data } = await axios.post(url, task, config);

            setAlert({});
            setModalFormTask(false);

            // Socket.io
            socket.emit("new task", data);
        } catch (error) {
            console.log(error);
        }
    };

    const updateTask = async (task) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };

            const url = `${import.meta.env.VITE_BACKEND_URL}/api/tasks/${task.id}`;
            const { data } = await axios.put(url, task, config);

            // Socket.io
            socket.emit("update task", data);

            setAlert({});
            setModalFormTask(false);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteTask = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };

            const url = `${import.meta.env.VITE_BACKEND_URL}/api/tasks/${task._id}`;
            const { data } = await axios.delete(url, config);
            showAlert({
                msg: data.msg,
                error: false
            });

            // Socket.io
            socket.emit("delete task", task);

            setModalDeleteTask(false);
            setTask({});
        } catch (error) {
            console.log(error);
        }
    };

    const handleCollaborator = async (email) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };
            const url = `${import.meta.env.VITE_BACKEND_URL}/api/projects/collaborators`;
            const { data } = await axios.post(url, { email }, config);
            setCollaborator(data);
            setAlert({});
        } catch (error) {
            showAlert({
                msg: error.response.data.msg,
                error: true
            });
        }
    };

    const addCollaborator = async (email) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };
            const url = `${import.meta.env.VITE_BACKEND_URL}/api/projects/collaborators/${project._id}`;
            const { data } = await axios.post(url, email, config);
            showAlert({
                msg: data.msg,
                error: false
            });
            setCollaborator({});
        } catch (error) {
            showAlert({
                msg: error.response.data.msg,
                error: true
            });
        }
    };

    const deleteCollaborator = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };
            const url = `${import.meta.env.VITE_BACKEND_URL}/api/projects/delete-collaborator/${project._id}`;
            const { data } = await axios.post(url, { id: collaborator._id }, config);

            const projectUpdated = { ...project };
            projectUpdated.collaborators = project.collaborators.filter(
                (collaboratorState) => collaboratorState._id !== collaborator._id
            );
            setProject(projectUpdated);

            showAlert({
                msg: data.msg,
                error: false
            });
            setCollaborator({});
            setModalDeleteCollaborator(false);
        } catch (error) {
            showAlert({
                msg: error.response.data.msg,
                error: true
            });
        }
    };

    const completeTask = async (id) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            };
            const url = `${import.meta.env.VITE_BACKEND_URL}/api/tasks/state/${id}`;
            const { data } = await axios.post(url, {}, config);

            // Socket.io
            socket.emit("complete task", data);

            setTask({});
            setAlert({});
        } catch (error) {
            console.log(error.response);
        }
    };

    const handleSearch = () => {
        setSearch(!search);
    };

    const logOutProjects = () => {
        setProjects([]);
        setProject({});
        setAlert({});
    };

    // Socket.io
    const submitTasksProject = (task) => {
        // Add the task to state
        const productUpdated = { ...project };
        productUpdated.tasks = [...productUpdated.tasks, task];
        setProject(productUpdated);
    };

    const submitTaskDelete = (task) => {
        const projectUpdated = { ...project };
        projectUpdated.tasks = projectUpdated.tasks.filter((taskState) => taskState._id !== task._id);
        setProject(projectUpdated);
    };

    const submitTaskUpdate = (task) => {
        const projectUpdated = { ...project };
        projectUpdated.tasks = projectUpdated.tasks.map((taskState) => (taskState._id === task._id ? task : taskState));
        setProject(projectUpdated);
    };

    const submitCompleteTask = (task) => {
        const projectUpdate = { ...project };
        projectUpdate.tasks = projectUpdate.tasks.map((taskState) => (taskState._id === task._id ? task : taskState));
        setProject(projectUpdate);
    };

    return (
        <ProjectsContext.Provider
            value={{
                projects,
                alert,
                showAlert,
                submitProject,
                getProject,
                project,
                setProject,
                deleteProject,
                modalFormTask,
                handleModalTask,
                modalDeleteTask,
                handleModalDelete,
                modalDeleteCollaborator,
                handleModalDeleteCollaborator,
                submitTask,
                handleModalEdit,
                task,
                deleteTask,
                handleCollaborator,
                collaborator,
                addCollaborator,
                deleteCollaborator,
                completeTask,
                search,
                handleSearch,
                submitTasksProject,
                submitTaskDelete,
                submitTaskUpdate,
                submitCompleteTask,
                logOutProjects
            }}
        >
            {children}
        </ProjectsContext.Provider>
    );
};

export { ProjectsProvider };
export default ProjectsContext;
