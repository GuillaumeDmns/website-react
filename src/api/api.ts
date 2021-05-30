import axios, { AxiosResponse } from "axios";

import { LOCAL_STORAGE, getUsableToken } from "utils/authentication.utils";
import endpoints from "./endpoints";
import { Jwt } from "./api.types";

axios.defaults.baseURL = "https://guillaumedamiens.com/api";
// axios.defaults.baseURL = "http://localhost:8080/api";
axios.defaults.timeout = 20000;
axios.defaults.withCredentials = true;

const axs = axios.create({
  maxRedirects: 0,
});

const api = {
  authentication: {
    signIn: (username: string, password: string): Promise<AxiosResponse<Jwt>> => {
      return axs.post<Jwt>(endpoints.authentication.signIn, {
        username,
        password,
      });
    },
    refresh: (): Promise<AxiosResponse<Jwt>> => {
      return axs.get<Jwt>(endpoints.authentication.refresh);
    },
  },
};

axs.interceptors.request.use(async (request) => {
  const { url = "" } = request;
  let token = "";

  if (url.includes(endpoints.authentication.signIn) || url.includes(endpoints.authentication.refresh)) {
    token = localStorage.getItem(LOCAL_STORAGE.JWT) || "";
  } else {
    token = await getUsableToken();
  }

  axs.defaults.headers.common = {
    Authorization: token,
  };

  if (request.headers) {
    request.headers.Authorization = token;
  }

  return request;
});

axs.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    throw error;
  }
);

export default api;
