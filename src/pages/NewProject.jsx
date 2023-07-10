import FormProject from "../components/FormProject";

const NewProject = () => {
    return (
        <>
            <h1 className="text-xl font-black">Create Project</h1>
            <div className="flex justify-center">
                <FormProject />
            </div>
        </>
    );
};

export default NewProject;
