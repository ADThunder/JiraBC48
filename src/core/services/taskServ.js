import { projectActions } from "../redux/slice/projectSlice";
import { spinnerActions } from "../redux/slice/spinnerSlice";
import { taskActions } from "../redux/slice/taskSlice";
import {
  AXIOS_INSTANCE_GENERATOR,
  BASE_PRIORITY_URL,
  BASE_PROJECT_URL,
  BASE_STATUS_URL,
  BASE_TASK_TYPE_URL,
} from "./configURL";
import PROJECT_SERVICE from "./projectServ";

let updateRedux = async (dispatch, task) => {
  console.log("run first");
  dispatch(taskActions.updateTask(task));
};

let updateProjectDetails = async (dispatch, task) => {
  console.log("run second");
  dispatch(PROJECT_SERVICE.getDetailsThunk(task.projectId));
};

const TASK_SERVICE = {
  getAllTaskType: async () => {
    let { data } = (await AXIOS_INSTANCE_GENERATOR(BASE_TASK_TYPE_URL)
      .get)`getAll`;

    return data;
  },
  getAllTaskStatus: async () => {
    let { data } = (await AXIOS_INSTANCE_GENERATOR(BASE_STATUS_URL)
      .get)`getAll`;
    return data;
  },
  getAllTaskPriority: async () => {
    let { data } = (await AXIOS_INSTANCE_GENERATOR(BASE_PRIORITY_URL)
      .get)`getAll`;
    return data;
  },
  // create task
  createTask: async (taskValues) => {
    let { data } = await AXIOS_INSTANCE_GENERATOR(BASE_PROJECT_URL).post(
      `createTask`,
      taskValues
    );
    return data;
  },
  // getTaskDetail
  getTaskDetail: async (taskId) => {
    let { data } = (await AXIOS_INSTANCE_GENERATOR(BASE_PROJECT_URL)
      .get)`getTaskDetail?taskId=${taskId}`;
    return data;
  },
  // delete task
  deleteTask: async (taskId) => {
    let { data } = await AXIOS_INSTANCE_GENERATOR(BASE_PROJECT_URL).delete(
      `removeTask?taskId=${taskId}`
    );
    return data;
  },

  updateTaskStatus: async ({ taskId, statusId }) => {
    let { data } = await AXIOS_INSTANCE_GENERATOR(BASE_PROJECT_URL).put(
      `updateStatus`,
      { taskId, statusId }
    );
    return data;
  },

  updateTaskThunk: (task) => (dispatch) => {
    AXIOS_INSTANCE_GENERATOR(BASE_PROJECT_URL)
      .post(`updateTask`, task)
      .then((res) => {
        (async () => {
          await updateRedux(dispatch, task);
          await updateProjectDetails(dispatch, task);
        })();
      })
      .catch((error) => {
        console.log(error);
      });
  },

  deleteTaskThunk: (task) => (dispatch) => {
    dispatch(spinnerActions.setLoadingOn());
    AXIOS_INSTANCE_GENERATOR(BASE_PROJECT_URL)
      .delete(`removeTask?taskId=${task.taskId}`)
      .then((res) => {
        PROJECT_SERVICE.getDetails(task.projectId)
          .then((res) => {
            let resContent = res.content;
            resContent = {
              ...resContent,
              categoryName: resContent.projectCategory.name,
            };
            dispatch(projectActions.putProjectDetail(resContent));
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            setTimeout(() => {
              dispatch(spinnerActions.setLoadingOff());
            }, 1000);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

export default TASK_SERVICE;
