import { IUser } from "common/models/user-management";
import { Dispatch } from "redux";
import { AppState } from "store/configure-store";

export const ADD_USER = "ADD_USER";
export const EDIT_USER = "EDIT_USER";
export const REMOVE_USER = "REMOVE_USER";

export interface IAddUserAction {
  type: typeof ADD_USER;
  user: IUser;
}

export interface IRemoveUserAction {
  type: typeof REMOVE_USER;
  id: string;
}

export interface IEditUserAction {
  type: typeof EDIT_USER;
  user: IUser;
}

export type UserActionTypes =
  | IAddUserAction
  | IRemoveUserAction
  | IEditUserAction;

export const addUser = (userData: { name?: string }) => {
  return (dispatch: Dispatch<IAddUserAction>, getState: () => AppState) => {
    const { name = "" } = userData;
    const user = { id: "1", name };
    return dispatch({
      type: ADD_USER,
      user: user
    });
  };
};

export const removeUser = (id: string) => {
  return (dispatch: Dispatch<IRemoveUserAction>, getState: () => AppState) => {
    dispatch({
      type: REMOVE_USER,
      id: id
    });
  };
};

export const editUser = (user: IUser) => {
  return (dispatch: Dispatch<IEditUserAction>, getState: () => AppState) => {
    dispatch({
      type: EDIT_USER,
      user: user
    });
  };
};
