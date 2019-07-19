import { IUser } from "common/models/user-management";
import { AppActions } from "store/actions/app-actions";
import _ from "lodash";

const generateUsers = (): IUser[] => {
  const total = _.random(10, 50);
  return _.times(total, (index) => ({
    id: String(index),
    name: `User ${index}`
  }));
};

const initialState: IUser[] = generateUsers();

export function usersReducer(
  state = initialState,
  action: AppActions
): IUser[] {
  switch (action.type) {
    case "ADD_USER":
      return [...state, action.user];
    case "REMOVE_USER":
      return state.filter(({ id }) => id !== action.id);
    case "EDIT_USER":
      return state.map((user) => {
        if (user.id === action.user.id) {
          return {
            ...user,
            ...action.user
          };
        } else {
          return user;
        }
      });
    default:
      return state;
  }
}
