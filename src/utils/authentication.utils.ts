import { JwtPayload, jwtDecode } from "jwt-decode";
import api from "api/api";

export enum LOCAL_STORAGE {
  JWT = "jwt_api_gda",
}

interface GdaAuthority {
  authority?: string;
}

interface GdaJwtPayload extends JwtPayload {
  auth?: Array<GdaAuthority>;
}

const refreshToken = async (): Promise<void> => {
  try {
    const response = await api.authentication.refresh();
    if (response && response.data && response.data.jwt) {
      localStorage.setItem(LOCAL_STORAGE.JWT, response.data.jwt);
    }
  } catch (e) {
    // eslint-disable-next-line
    console.log(e);
  }
};

export const getUsableToken = (): string => {
  const jwtLocalStorage = localStorage.getItem(LOCAL_STORAGE.JWT) || "";

  let jwtDecoded: GdaJwtPayload | null;
  try {
    jwtDecoded = jwtDecode<GdaJwtPayload>(jwtLocalStorage);
  } catch (e) {
    jwtDecoded = null;
  }

  if (jwtDecoded && jwtDecoded.exp && jwtDecoded.iat) {
    if (jwtDecoded.iat + (jwtDecoded.exp - jwtDecoded.iat) * 0.75 < new Date().getTime() / 1000) {
      refreshToken();
    }
  }
  return jwtLocalStorage;
};
