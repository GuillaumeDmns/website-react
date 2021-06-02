import axios, { AxiosResponse } from "axios";

// ts-ignore
import { LOCAL_STORAGE, getUsableToken } from "utils/authentication.utils";
import endpoints from "./endpoints";
import { JwtDTO, LinesDTO, NextMissionsDTO, ReseauxDTO, StationsDTO } from "./api.types";

axios.defaults.baseURL = "https://guillaumedamiens.com/api";
// axios.defaults.baseURL = "http://localhost:8080/api";
axios.defaults.timeout = 20000;
axios.defaults.withCredentials = true;

const axs = axios.create({
  maxRedirects: 0,
});

const api = {
  authentication: {
    signIn: (username: string, password: string): Promise<AxiosResponse<JwtDTO>> => {
      return axs.post<JwtDTO>(endpoints.authentication.signIn, {
        username,
        password,
      });
    },
    refresh: (): Promise<AxiosResponse<JwtDTO>> => {
      return axs.get<JwtDTO>(endpoints.authentication.refresh);
    },
  },

  ratp: {
    getReseaux: (): Promise<AxiosResponse<ReseauxDTO>> => {
      return axs.get<ReseauxDTO>(endpoints.ratp.getReseaux);
    },
    getLinesByReseauId: (reseauId: string): Promise<AxiosResponse<LinesDTO>> => {
      return axs.get<ReseauxDTO>(endpoints.ratp.getLinesByReseauId, {
        params: {
          reseauId,
        },
      });
    },
    getStationsByLineIdAndStationName: (lineId: string, stationName: string): Promise<AxiosResponse<StationsDTO>> => {
      return axs.get<StationsDTO>(endpoints.ratp.getStationsByLineId, {
        params: {
          lineId,
          stationName,
        },
      });
    },
    getNextMissionsByLineAndStation: (lineId: string, stationId: string): Promise<AxiosResponse<NextMissionsDTO>> => {
      return axs.get<NextMissionsDTO>(endpoints.ratp.getNextMissionsByLineAndStation, {
        params: {
          lineId,
          stationId,
        },
      });
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
    Authorization: `Bearer ${token}`,
  };

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
    throw error;
  }
);

export default api;
