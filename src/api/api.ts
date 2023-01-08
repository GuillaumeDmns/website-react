import axios, { AxiosResponse } from "axios";

// ts-ignore
import { LOCAL_STORAGE, getUsableToken } from "utils/authentication.utils";
import endpoints from "./endpoints";
import { FullMissionDTO, JwtDTO, LinesDTO, NextMissionsDTO, ReseauxDTO, StationsDTO, StopsByLineDTO } from "./api.types";

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
  },

  ratp: {
    getReseaux: (): Promise<AxiosResponse<ReseauxDTO>> => {
      return axs.get<ReseauxDTO>(endpoints.ratp.getReseaux);
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
    getFullMissionByLine: (lineId: string): Promise<AxiosResponse<FullMissionDTO>> => {
      return axs.get<FullMissionDTO>(endpoints.ratp.getFullMissionByLine, {
        params: {
          lineId,
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
