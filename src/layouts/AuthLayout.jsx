import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <>
            <main className="container mx-auto mt-5 md:mt-15 p-5 md:flex md:justify-center">
                <div className="md:w-1/2">
                    <Outlet />
                </div>
            </main>
        </>
    );
};

export default AuthLayout;
