/* import antd components */
import { message } from "antd";

/* import redux hooks */
import { projectActions } from "../redux/slice/projectSlice";
import { spinnerActions } from "../redux/slice/spinnerSlice";

/* import config urls */
// import config URL
import {
  AXIOS_INSTANCE_GENERATOR,
  BASE_PROJECT_URL,
  BASE_PROJECT_CATEGORY_URL,
} from "./configURL";

const PROJECT_SERVICE = {
  createProject: async (projectInfo) => {
    let { data } = await AXIOS_INSTANCE_GENERATOR(BASE_PROJECT_URL).post(
      "createProjectAuthorize",
      projectInfo
    );
    return data;
  },
  getAll: async () => {
    let { data } = await AXIOS_INSTANCE_GENERATOR(BASE_PROJECT_URL).get(
      `/getAllProject`
    );
    return data;
  },
  getAllByName: async (searchKey) => {
    let { data } = await AXIOS_INSTANCE_GENERATOR(BASE_PROJECT_URL).get(
      `/getAllProject?keyword=${searchKey}`
    );
    return data;
  },
  getAllAndDispatch: (successMessage) => (dispatch) => {
    AXIOS_INSTANCE_GENERATOR(BASE_PROJECT_URL)
      .get(`/getAllProject`)
      .then((res) => {
        dispatch(projectActions.updateProjectList(res.data.content));
        if (successMessage) {
          message.success(successMessage);
        }
        dispatch(spinnerActions.setLoadingOff());
      })
      .catch((err) => {
        console.log(err);
        message.error(err.response.data.content);
        dispatch(spinnerActions.setLoadingOff());
      });
  },
  getAllProjectCategory: async () => {
    let { data } = await AXIOS_INSTANCE_GENERATOR(
      BASE_PROJECT_CATEGORY_URL
    ).get("");
    return data;
  },
  getDetails: async (projectId) => {
    let { data } = await AXIOS_INSTANCE_GENERATOR(BASE_PROJECT_URL).get(
      `/getProjectDetail?id=${projectId}`
    );
    return data;
  },

  getDetailsThunk: (projectId) => (dispatch) => {
    AXIOS_INSTANCE_GENERATOR(BASE_PROJECT_URL)
      .get(`/getProjectDetail?id=${projectId}`)
      .then((res) => {
        let resContent = res.data.content;
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
  },

  getDetailsAndSetProject:
    (projectID, setProject, successMessage) => (dispatch) => {
      AXIOS_INSTANCE_GENERATOR(BASE_PROJECT_URL)
        .get(`/getProjectDetail?id=${projectID}`)
        .then((res) => {
          console.log(res);
          setProject(res.data.content);
          if (successMessage) {
            message.success(successMessage);
          }
          dispatch(spinnerActions.setLoadingOff());
        })
        .catch((err) => {
          console.log(err);
          message.error(err.response.data.content);
          dispatch(spinnerActions.setLoadingOff());
        });
    },
  update: async (projectId, updatedProject) => {
    let { data } = await AXIOS_INSTANCE_GENERATOR(BASE_PROJECT_URL).put(
      `/updateProject?projectId=${projectId}`,
      updatedProject
    );
    return data;
  },
  delete: async (projectID) => {
    let { data } = await AXIOS_INSTANCE_GENERATOR(BASE_PROJECT_URL).delete(
      `/deleteProject?projectId=${projectID}`
    );
    return data;
  },
  assignUser: async (projectId, userId) => {
    let { data } = await AXIOS_INSTANCE_GENERATOR(BASE_PROJECT_URL).post(
      `/assignUserProject`,
      { projectId, userId }
    );
    return data;
  },
  deleteMember: async (projectId, userId) => {
    let { data } = await AXIOS_INSTANCE_GENERATOR(BASE_PROJECT_URL).post(
      `/removeUserFromProject`,
      { projectId, userId }
    );
    return data;
  },
};

export default PROJECT_SERVICE;
