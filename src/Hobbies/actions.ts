import { Hobby, PassionLevel } from "./hobby";
import { ThunkAction } from "redux-thunk";
import { hobbyService } from "./hobby-service";

export const CHANGE_NEW_HOBBY = 'CHANGE_NEW_HOBBY';
interface ChangeNewHobbyAction {
  type: typeof CHANGE_NEW_HOBBY
  payload: Hobby
}
export const changeNewHobby = (description: string, passionLevel: PassionLevel, since: string): ChangeNewHobbyAction => {
  return {
     type: CHANGE_NEW_HOBBY,
     payload: { id: 0, userId: 0, description, passionLevel, since }
   }
}

export const REQUEST_ADD_HOBBY = 'REQUEST_ADD_HOBBY';
interface RequestAddHobbyAction {
  type: typeof REQUEST_ADD_HOBBY
}
export const requestAddHobby = (): RequestAddHobbyAction => {
  return {
     type: REQUEST_ADD_HOBBY
   }
}

export const RECEIVE_HOBBY = 'RECEIVE_HOBBY';
interface ReceiveHobbyAction {
  type: typeof RECEIVE_HOBBY,
  payload?: Hobby
}
export const receiveHobby = (hobby?: Hobby): ReceiveHobbyAction => {
  return {
    type: RECEIVE_HOBBY,
    payload: hobby
   }
}

export const REQUEST_HOBBIES = 'REQUEST_HOBBIES';
interface RequestHobbiesAction {
  type: typeof REQUEST_HOBBIES
}
export const requestHobbies = (): RequestHobbiesAction => {
  return {
     type: REQUEST_HOBBIES
   }
}

export const RECEIVE_HOBBIES = 'RECEIVE_HOBBIES';
interface ReceiveHobbiesAction {
  type: typeof RECEIVE_HOBBIES,
  payload: Hobby[]
}
export const receiveHobbies = (hobbies: Hobby[]): ReceiveHobbiesAction => {
  return {
    type: RECEIVE_HOBBIES,
    payload: hobbies
   }
}

export const REQUEST_DELETE_HOBBY = 'REQUEST_DELETE_HOBBY';
interface RequestDeleteHobbyAction {
  type: typeof REQUEST_DELETE_HOBBY
}
export const requestDeleteHobby = (): RequestDeleteHobbyAction => {
  return {
     type: REQUEST_DELETE_HOBBY
   }
}

export type HobbiesActions = RequestHobbiesAction | RequestAddHobbyAction | ReceiveHobbiesAction
  | ChangeNewHobbyAction | ReceiveHobbyAction | RequestDeleteHobbyAction;

export const fetchHobbies = (userId: number | undefined): ThunkAction<Promise<void>, {}, {}, HobbiesActions> =>
  async dispatch => {
    if (!userId) {
      dispatch(receiveHobbies([]));
      return;
    }
    dispatch(requestHobbies());
    const hobbies = await hobbyService.getHobbiesForUser(userId);
    dispatch(receiveHobbies(hobbies));
  }

export const addNewHobby = (
  userId: number,
  passionLevel: PassionLevel,
  description: string,
  since: string
): ThunkAction<Promise<void>, {}, {}, HobbiesActions> =>
  async dispatch => {
    dispatch(requestAddHobby());
    const hobby = await hobbyService.addHobby(Date.now(), userId, passionLevel, description, since);
    dispatch(receiveHobby(hobby));
  }

export const deleteHobby = (hobbyId: number, userId: number): ThunkAction<Promise<void>, {}, {}, HobbiesActions> =>
  async dispatch => {
    dispatch(requestDeleteHobby());
    await hobbyService.deleteHobby(hobbyId);
    const hobbies = await hobbyService.getHobbiesForUser(userId);
    dispatch(receiveHobbies(hobbies));
  }

  