import { Dispatch } from "redux";
import { AppState } from "store/configure-store";

export const INIT_APP = "INITIALIZE_APP";
export const SHOW_SPIN = "SHOW_SPIN";

export interface IInitAppAction {
  type: typeof INIT_APP;
}

export interface IShowSpinAction {
  type: typeof SHOW_SPIN;
  status: boolean;
}

export type InitAppAction = IInitAppAction | IShowSpinAction;

export const showSpin = (status: boolean) => {
  return (dispatch: Dispatch<InitAppAction>, getState: () => AppState) => {
    dispatch({
      type: SHOW_SPIN,
      status: status
    });
  };
};

export const initialize = () => {
  return (dispatch: Dispatch<InitAppAction>, getState: () => AppState) => {
    return dispatch({
      type: INIT_APP
    });
  };
};
