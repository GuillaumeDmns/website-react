import jwtDecode, { JwtPayload } from "jwt-decode";

export enum LOCAL_STORAGE {
  JWT = "jwt_api_gda",
}

interface GdaAuthority {
  authority?: string;
}

interface GdaJwtPayload extends JwtPayload {
  auth?: Array<GdaAuthority>;
}

export const getUsableToken = (): string => {
  const jwtLocalStorage = localStorage.getItem(LOCAL_STORAGE.JWT) || "";

  let jwtDecoded: GdaJwtPayload | null;
  try {
    jwtDecoded = jwtDecode<GdaJwtPayload>(jwtLocalStorage);
  } catch (e) {
    jwtDecoded = null;
  }

  if (jwtDecoded && jwtDecoded.exp && jwtDecoded.iat) {
    if (jwtDecoded.iat + (jwtDecoded.exp - jwtDecoded.iat) * 0.75 > new Date().getTime()) {
      // TODO renew
    }
  }
  return jwtLocalStorage;
};
