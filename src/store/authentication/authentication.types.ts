export const ACTION_TYPES = {
  LOGIN_USER: "LOGIN_USER",
  LOGOUT_USER: "LOGOUT_USER",
};

export interface IAuthenticationState {
  isAuthenticated: boolean;
}

export type AuthenticationActionTypes =
  | {
  type: typeof ACTION_TYPES.LOGIN_USER;
  payload: boolean;
}
  | {
  type: typeof ACTION_TYPES.LOGOUT_USER;
  payload: boolean;
};
