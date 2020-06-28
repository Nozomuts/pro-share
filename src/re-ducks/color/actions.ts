import { ActionTypes } from './constants';

export const setColors = (color: string) => {
  return {
    type: ActionTypes.setColors,
    payload: {
      color
    }
  }
};