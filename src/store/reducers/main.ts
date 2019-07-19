import { AppActions } from "store/actions/app-actions";

interface IMainState {
  spinning: boolean;
}

const initialState = {
  spinning: false
};

export function mainReducer(
  state = initialState,
  action: AppActions
): IMainState {
  switch (action.type) {
    case "INITIALIZE_APP":
      return state;
    case "SHOW_SPIN":
      return {
        ...state,
        spinning: action.status
      };
    default:
      return state;
  }
}
