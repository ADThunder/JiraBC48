import { AXIOS_INSTANCE_GENERATOR, BASE_USER_URL } from "./configURL";

const USER_SERVICE = {
  login: async (loginData) => {
    let { data } = await AXIOS_INSTANCE_GENERATOR(BASE_USER_URL).post(
      `/signin`,
      loginData
    );
    return data;
  },

  getAllUser: async () => {
    let { data } = await AXIOS_INSTANCE_GENERATOR(BASE_USER_URL).get(
      `/getUser`
    );
    return data;
  },

  getUserByKeyword: async (keyword) => {
    let { data } = await AXIOS_INSTANCE_GENERATOR(BASE_USER_URL).get(
      `/getUser?keyword=${keyword}`
    );
    return data;
  },
  getUserByProjectId: async (id) => {
    let { data } = await AXIOS_INSTANCE_GENERATOR(BASE_USER_URL).get(
      `/getUserByProjectId?idProject=${id}`
    );
    return data;
  },

  register: async (registerData) => {
    let { data } = await AXIOS_INSTANCE_GENERATOR(BASE_USER_URL).post(
      `/signup`,
      registerData
    );
    return data;
  },

  deleteUser: async (userId) => {
    let { data } = await AXIOS_INSTANCE_GENERATOR(BASE_USER_URL).delete(
      `/deleteUser?id=${userId}`
    );
    return data;
  },

  editUser: async (userEdit) => {
    let { data } = await AXIOS_INSTANCE_GENERATOR(BASE_USER_URL).put(
      `/editUser`,
      userEdit
    );
    return data;
  },

  edit: async (userInfo) => {
    let { data } = await AXIOS_INSTANCE_GENERATOR(BASE_USER_URL).put(
      "/editUser",
      userInfo
    );
    return data;
  },
};

export default USER_SERVICE;
