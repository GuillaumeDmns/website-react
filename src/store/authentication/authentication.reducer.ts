import { LOCAL_STORAGE } from "utils/authentication.utils";
import { ACTION_TYPES, AuthenticationActionTypes, IAuthenticationState } from "./authentication.types";

const initialState: IAuthenticationState = {
  isAuthenticated: !!localStorage.getItem(LOCAL_STORAGE.JWT),
};

const homeReducer = (state: IAuthenticationState = initialState, action: AuthenticationActionTypes): IAuthenticationState => {
  switch (action.type) {
    case ACTION_TYPES.LOGIN_USER:
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    case ACTION_TYPES.LOGOUT_USER:
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    default:
      return state;
  }
};

export default homeReducer;
