import { ActionTypes } from './constants';
import { Action } from 'redux';

export type User = {
  currentUser: any;
  isLoading: boolean;
};

interface SetUserAction extends Action {
  type: typeof ActionTypes.setUser;
  payload: User;
}

interface ClearUserAction extends Action {
  type: typeof ActionTypes.clearUser;
  payload: User;
}

export type UserActionTypes = SetUserAction | ClearUserAction;
