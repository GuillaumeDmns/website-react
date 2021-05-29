import axios from "axios";

import endpoints from "./endpoints";
import LOCAL_STORAGE from "../utils/authentication.utils";

axios.defaults.baseURL = "https://guillaumedamiens.com/api";
axios.defaults.timeout = 20000;
axios.defaults.withCredentials = true;

const axs = axios.create({
  maxRedirects: 0,
});

const api = {
  authentication: {
    signIn: (username: string, password: string): Promise<string> => {
      return axs.post(endpoints.authentication.signIn, {
        username,
        password,
      });
    },
    refresh: (): Promise<string> => {
      return axs.get(endpoints.authentication.refresh);
    },
  },
};

axs.interceptors.request.use(async (request) => {
  const token = localStorage.getItem(LOCAL_STORAGE.JWT);

  axs.defaults.headers.common = {
    Authorization: token,
  };

  if (request.headers) {
    request.headers.Authorization = token;
  }

  return request;
});

axs.interceptors.request.use(async (request) => {
  const token = localStorage.getItem(LOCAL_STORAGE.JWT);

  axs.defaults.headers.common = {
    Authorization: token,
  };

  if (request.headers) {
    request.headers.Authorization = token;
  }

  return request;
});

export default api;
