import axios, { AxiosResponse } from "axios";

// ts-ignore
import { LOCAL_STORAGE, getUsableToken } from "utils/authentication.utils";
import endpoints from "./endpoints";
import { JwtDTO, LinesDTO, StopsByLineDTO, UnitIDFMDTO } from "./api.types";

// `npm run dev` uses the local backend, the production build the production one
axios.defaults.baseURL = import.meta.env.DEV ? "http://localhost:8080/api" : "https://guillaumedamiens.com/api";
axios.defaults.timeout = 20000;
axios.defaults.withCredentials = true;

const axs = axios.create({
  maxRedirects: 0,
});

const api = {
  authentication: {
    signIn: (username: string, password: string): Promise<AxiosResponse<JwtDTO>> => {
      return axs.post(endpoints.authentication.signIn, {
        username,
        password,
      });
    },
    refresh: (): Promise<AxiosResponse<JwtDTO>> => {
      return axs.get<JwtDTO>(endpoints.authentication.refresh);
    },
  },

  idfm: {
    getLines: (): Promise<AxiosResponse<LinesDTO>> => {
      return axs.get<LinesDTO>(endpoints.idfm.getLines);
    },
    getStopsByLine: (lineId: string): Promise<AxiosResponse<StopsByLineDTO>> => {
      return axs.get<StopsByLineDTO>(endpoints.idfm.getStopsByLine, {
        params: {
          lineId,
        },
      });
    },
    getStopNextPassage: (stopId: number, lineId?: string): Promise<AxiosResponse<UnitIDFMDTO>> => {
      return axs.get<UnitIDFMDTO>(endpoints.idfm.getStopNextPassage, {
        params: {
          stopId,
          lineId,
        },
      });
    },
  },
};

axs.interceptors.request.use(async (request) => {
  const { url = "" } = request;
  let token: string;

  if (url.includes(endpoints.authentication.signIn) || url.includes(endpoints.authentication.refresh)) {
    token = localStorage.getItem(LOCAL_STORAGE.JWT) || "";
  } else {
    token = await getUsableToken();
  }

  if (request.headers) {
    request.headers.Authorization = `Bearer ${token}`;
  }

  return request;
});

axs.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 403) {
      localStorage.removeItem(LOCAL_STORAGE.JWT);
    }
    throw error;
  }
);

export default api;
