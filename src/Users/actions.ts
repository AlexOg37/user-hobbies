import { User } from "./user";
import { ThunkAction } from "redux-thunk";
import { userService } from "./user-service";

export const CHANGE_NEW_USER_NAME = 'CHANGE_NEW_USER_NAME';
interface ChangeNewUserNameAction {
  type: typeof CHANGE_NEW_USER_NAME
  payload: string
}
export const changeNewUserName = (name: string): ChangeNewUserNameAction => {
  return {
     type: CHANGE_NEW_USER_NAME,
     payload: name
   }
}

export const SELECT_USER = 'SELECT_USER';
interface SelectUserAction {
  type: typeof SELECT_USER
  payload: number
}
export const selectUser = (id: number): SelectUserAction => {
  return {
     type: SELECT_USER,
     payload: id
   }
}

export const REQUEST_ADD_USER = 'REQUEST_ADD_USER';
interface RequestAddUserAction {
  type: typeof REQUEST_ADD_USER
}
export const requestAddUser = (): RequestAddUserAction => {
  return {
     type: REQUEST_ADD_USER,
   }
}
export const RECEIVE_USER = 'RECEIVE_USER';
interface ReceiveUserAction {
  type: typeof RECEIVE_USER,
  payload?: User
}
export const receiveUser = (user?: User): ReceiveUserAction => {
  return {
    type: RECEIVE_USER,
    payload: user
   }
}

export const REQUEST_USERS = 'REQUEST_USERS';
interface RequestUsersAction {
  type: typeof REQUEST_USERS
}
export const requestUsers = (): RequestUsersAction => {
  return {
     type: REQUEST_USERS
   }
}

export const RECEIVE_USERS = 'RECEIVE_USERS';
interface ReceiveUsersAction {
  type: typeof RECEIVE_USERS,
  payload: User[]
}
export const receiveUsers = (users: User[]): ReceiveUsersAction => {
  return {
    type: RECEIVE_USERS,
    payload: users
   }
}

export type UsersActions = RequestAddUserAction | SelectUserAction | ChangeNewUserNameAction
  | RequestUsersAction | ReceiveUsersAction | ReceiveUserAction;

export const fetchUsers = (): ThunkAction<Promise<void>, {}, {}, UsersActions> =>
  async dispatch => {
    dispatch(requestUsers());
    const users = await userService.getAllUsers();
    dispatch(receiveUsers(users));
  }

export const addNewUser = (name: string): ThunkAction<Promise<void>, {}, {}, UsersActions> =>
  async dispatch => {
    dispatch(requestAddUser());
    const user = await userService.addUser(Date.now(), name);
    dispatch(receiveUser(user));
  }
