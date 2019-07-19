import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { usersReducer } from "./reducers/user-management";
import { mainReducer } from "./reducers/main";
import { AppActions } from "./actions/app-actions";

export const rootReducer = combineReducers({
  main: mainReducer,
  users: usersReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>)
);
