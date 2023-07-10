import { Link } from "react-router-dom";
import useProjects from "../hooks/useProjects";
import useAuth from "../hooks/useAuth";
import ModalSearch from "./ModalSearch";

const Header = () => {
    const { handleSearch, logOutProjects } = useProjects();
    const { logOutAuth } = useAuth();

    const handleLogOut = () => {
        logOutAuth();
        logOutProjects();
        localStorage.removeItem("token");
    };

    return (
        <header className="px-4 py-5 bg-white border-b">
            <div className=" md:flex md:justify-between">
                <h2 className="text-4xl text-sky-600 font-black text-center mb-5 md:mb-0">UpTask</h2>

                <div className="flex flex-col md:flex-row items-center gap-3">
                    <button onClick={handleSearch} type="button" className="font-bold uppercase">
                        Search Project
                    </button>
                    <Link to="/projects" className="font-bold uppercase">
                        Projects
                    </Link>
                    <button
                        onClick={handleLogOut}
                        type="button"
                        className="text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold"
                    >
                        Sign Off
                    </button>
                    <ModalSearch />
                </div>
            </div>
        </header>
    );
};

export default Header;
