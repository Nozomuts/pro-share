import { ActionTypes } from './constants';

export const setUser = (user: any) => {
  return {
    type: ActionTypes.setUser,
    payload: {
      currentUser: user,
    },
  };
};

export const clearUser = () => {
  return {
    type: ActionTypes.clearUser,
  };
};
