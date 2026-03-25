import { Dispatch } from "react";

import { LOCAL_STORAGE } from "utils/authentication.utils";
import api from "api/api";
import { AuthenticationActionTypes, ACTION_TYPES } from "./authentication.types";

export const loginUser =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (login: string, password: string): any =>
  async (dispatch: Dispatch<AuthenticationActionTypes>) => {
    let willUserBeAuthenticated = false;

    try {
      const response = await api.authentication.signIn(login, password);
      if (response.status === 200 && response.data) {
        if (response.data.jwt) {
          localStorage.setItem(LOCAL_STORAGE.JWT, response.data.jwt);
          willUserBeAuthenticated = true;
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
      willUserBeAuthenticated = false;
    }

    return dispatch({
      type: ACTION_TYPES.LOGIN_USER,
      payload: willUserBeAuthenticated,
    });
  };

export const logoutUser = (): AuthenticationActionTypes => {
  localStorage.removeItem(LOCAL_STORAGE.JWT);

  return {
    type: ACTION_TYPES.LOGOUT_USER,
    payload: false,
  };
};
