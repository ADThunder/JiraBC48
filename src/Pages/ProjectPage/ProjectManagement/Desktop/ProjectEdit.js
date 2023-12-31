// import redux
import { useDispatch } from "react-redux";
import { spinnerActions } from "../../../../core/redux/slice/spinnerSlice";
import { generalActions } from "../../../../core/redux/slice/generalSlice";

// import local Services
import PROJECT_SERVICE from "../../../../core/services/projectServ";

// import local component
import ProjectForm from "../../../../core/Components/Form/ProjectForm";

// import utils
import toastify from "../../../../core/utils/toastify/toastifyUtils";
import SectionWrapper from "../../../../core/Components/SectionWrapper/SectionWrapper";

export default function ProjectEdit({ project }) {
  // console.log(project);
  const dispatch = useDispatch();

  const handleOnFinish = (values) => {
    dispatch(spinnerActions.setLoadingOn());
    const updateProject = {
      ...values,
      id: project.id,
      creator: project.creator.id,
    };
    PROJECT_SERVICE.update(project.id, updateProject)
      .then(() => {
        toastify("success", "Updated project successfully !");
        dispatch(generalActions.closeDrawer());
        setTimeout(() => {
          dispatch(PROJECT_SERVICE.getAllAndDispatch(null));
          dispatch(spinnerActions.setLoadingOff());
        }, 2500);
      })
      .catch((err) => {
        setTimeout(() => {
          toastify("error", err.response.data.message);
          dispatch(spinnerActions.setLoadingOff());
        }, 2500);
      });
  };

  return (
    <SectionWrapper
      title="Edit Project"
      content={
        <div className="form-wrapper">
          <div className="form-body">
            <ProjectForm
              layout="vertical"
              size="large"
              project={project}
              confirmText="Update Project"
              handleOnFinish={handleOnFinish}
            />
          </div>
        </div>
      }
    />
  );
}
