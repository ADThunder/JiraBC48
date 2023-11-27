import EditTaskForm from "../../../../core/Components/Form/Task/EditTaskForm";

/* import local hooks for redux */
import { useDispatch, useSelector } from "react-redux";

/* import local interfaces */
import { modalActions } from "../../../../core/redux/slice/modalSlice";
import { spinnerActions } from "../../../../core/redux/slice/spinnerSlice";
import PROJECT_SERVICE from "../../../../core/services/projectServ";

/* import local service */
import TASK_SERVICE from "../../../../core/services/taskServ";
import toastify from "../../../../core/utils/toastify/toastifyUtils";

import { useEffect } from "react";
import {
  getAllInfoThunk,
  getTaskDetailThunk,
  getTaskUsersThunk,
  taskActions,
} from "../../../../core/redux/slice/taskSlice";

const EditTask = ({ project, task }) => {
  return (
    <div className="form-wrapper min-w-full">
      <div className="form-body">
        <EditTaskForm
          layout="vertical"
          size="large"
          project={project}
          task={task}
          buttonText="create task"
        />
      </div>
    </div>
  );
};

export default EditTask;
