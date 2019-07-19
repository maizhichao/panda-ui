import { UserActionTypes } from "./user-management";
import { InitAppAction } from "./main";

export type AppActions = UserActionTypes | InitAppAction;
