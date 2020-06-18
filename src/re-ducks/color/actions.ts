import { ActionTypes } from './constants';

export const setColors = (primaryColor:string, secondaryColor:string) => {
  return {
    type: ActionTypes.setColors,
    payload: {
      primaryColor,secondaryColor
    }
  }
};