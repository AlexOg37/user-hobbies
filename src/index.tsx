import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';

export type PassionLevel = 'Low' | 'Medium' | 'High' | 'Very-High';

type Hobby = {
  userId: number;
  passionLevel: PassionLevel;
  description: string;
  since: string;
}

type User = {
  id: number;
  name: string;
}

export type AppState = {
  users: User[];
  hobbies: Hobby[];
  newUserName: string;
  newHobby?: Hobby;
  selectedUser?: number;
}

const ADD_USER = 'ADD_USER';
interface AddUserAction {
  type: typeof ADD_USER
  payload: User
}
export const addUser = (name: string, id: number): AddUserAction => {
  return {
     type: ADD_USER,
     payload: { name, id }
   }
}

const ADD_HOBBY = 'ADD_HOBBY';
interface AddHobbyAction {
  type: typeof ADD_HOBBY
  payload: Hobby
}
export const addHobby = (userId: number, description: string, passionLevel: PassionLevel, since: string): AddHobbyAction => {
  return {
     type: ADD_HOBBY,
     payload: { userId, description, passionLevel, since }
   }
}

const CHANGE_NEW_USER_NAME = 'CHANGE_NEW_USER_NAME';
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

const CHANGE_NEW_HOBBY = 'CHANGE_NEW_HOBBY';
interface ChangeNewHobbyAction {
  type: typeof CHANGE_NEW_HOBBY
  payload: Hobby
}
export const changeNewHobby = (description: string, passionLevel: PassionLevel, since: string): ChangeNewHobbyAction => {
  return {
     type: CHANGE_NEW_HOBBY,
     payload: { userId: 0, description, passionLevel, since }
   }
}

const SELECT_USER = 'SELECT_USER';
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

type AppActions = AddUserAction | AddHobbyAction | ChangeNewUserNameAction | ChangeNewHobbyAction | SelectUserAction;

const reducer = (state: AppState = initialState, action: AppActions): AppState => {
  switch (action.type) {
    case ADD_USER:
      return {...state, users: [...state.users, action.payload], newUserName: ''}
    case ADD_HOBBY:
      return {...state, hobbies: [...state.hobbies, action.payload], newHobby: undefined}
    case CHANGE_NEW_USER_NAME:
      return {...state, newUserName: action.payload}
    case CHANGE_NEW_HOBBY:
      return {...state, newHobby: action.payload}
    case SELECT_USER:
      return {...state, selectedUser: action.payload, newHobby: undefined}
    default:
      return state;
  }
}

const initialState: AppState = {
  users: [],
  hobbies: [],
  newUserName: ''
};

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
