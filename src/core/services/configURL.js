import axios from "axios";
import { LOCAL_SERVICE } from "./localServ";

const BASE_URL = "https://jiranew.cybersoft.edu.vn";

const BASE_USER_URL = `${BASE_URL}/api/Users/`;
const BASE_TASK_TYPE_URL = `${BASE_URL}/api/TaskType/`;
const BASE_STATUS_URL = `${BASE_URL}/api/Status/`;
const BASE_PROJECT_CATEGORY_URL = `${BASE_URL}/api/ProjectCategory`;
const BASE_PROJECT_URL = `${BASE_URL}/api/Project/`;
const BASE_PRIORITY_URL = `${BASE_URL}/api/Priority/`;
const BASE_COMMENT_URL = `${BASE_URL}/api/Comment/`;

const TOKEN_CYBERSOFT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA0OCIsIkhldEhhblN0cmluZyI6IjEzLzAzLzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcxMDI4ODAwMDAwMCIsIm5iZiI6MTY3OTY3NzIwMCwiZXhwIjoxNzEwNDM1NjAwfQ.lSPZOlcWH-N1gVY8QLGpPHPcKYEMpoh0FJuMEJbeJQQ";

const AXIOS_INSTANCE_GENERATOR = (BASE_URL, accessToken = false) => {
  let config = {
    baseURL: BASE_URL,
    headers: {
      TokenCybersoft: TOKEN_CYBERSOFT,
      Authorization: "Bearer " + LOCAL_SERVICE.user.get()?.accessToken,
    },
  };

  return axios.create(config);
};

export {
  TOKEN_CYBERSOFT,
  AXIOS_INSTANCE_GENERATOR,
  BASE_USER_URL,
  BASE_TASK_TYPE_URL,
  BASE_STATUS_URL,
  BASE_PRIORITY_URL,
  BASE_PROJECT_URL,
  BASE_PROJECT_CATEGORY_URL,
};
