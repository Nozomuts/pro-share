import { ActionTypes } from './constants';
import { UserActionTypes,User } from './types';

const initialState: User = {
  currentUser: null,
  isLoading: true,
};

export const userReducer = (state = initialState, action:UserActionTypes) => {
  switch (action.type) {
    case ActionTypes.setUser:
      return {
        currentUser: action.payload.currentUser,
        isLoading: false,
      };
    case ActionTypes.clearUser:
      return {
        ...initialState,
        isLoading: false,
      };
    default:
      return state;
  }
};
