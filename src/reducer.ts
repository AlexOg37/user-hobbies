import { UsersActions, REQUEST_ADD_USER, CHANGE_NEW_USER_NAME, SELECT_USER, REQUEST_USERS, RECEIVE_USERS, RECEIVE_USER } from "./Users/actions";
import { User } from "./Users/user";
import { Hobby } from "./Hobbies/hobby";
import { HobbiesActions, CHANGE_NEW_HOBBY, REQUEST_ADD_HOBBY, REQUEST_HOBBIES, RECEIVE_HOBBIES, RECEIVE_HOBBY } from "./Hobbies/actions";

export type AppState = {
  users: User[];
  hobbies: Hobby[];
  isUsersLoading: boolean;
  isHobbiesLoading: boolean;
  newUserName: string;
  newHobby?: Hobby;
  selectedUser?: number;
}

const initialState: AppState = {
  users: [],
  hobbies: [],
  newUserName: '',
  isUsersLoading: false,
  isHobbiesLoading: false
};

const reducer = (state: AppState = initialState, action: HobbiesActions | UsersActions): AppState => {
  switch (action.type) {
    case CHANGE_NEW_USER_NAME:
      return {...state, newUserName: action.payload}
    case CHANGE_NEW_HOBBY:
      return {...state, newHobby: action.payload}
    case SELECT_USER:
      return {...state, selectedUser: action.payload, newHobby: undefined}
    case REQUEST_ADD_HOBBY:
    case REQUEST_HOBBIES:
      return {...state, isHobbiesLoading: true}
    case REQUEST_ADD_USER:
    case REQUEST_USERS:
      return {...state, isUsersLoading: true}
    case RECEIVE_USER:
      const users = action.payload ? [...state.users, action.payload] : state.users;
      return {...state, users: users, isUsersLoading: false, newUserName: ''}
    case RECEIVE_USERS:
      return {...state, users: action.payload, isUsersLoading: false, newUserName: ''}
    case RECEIVE_HOBBY:
      const hobbies = action.payload ? [...state.hobbies, action.payload] : state.hobbies;
      return {...state, hobbies: hobbies, isHobbiesLoading: false, newHobby: undefined}
    case RECEIVE_HOBBIES:
      return {...state, hobbies: action.payload, isHobbiesLoading: false, newHobby: undefined}
    default:
      return state;
  }
}

export default reducer;
