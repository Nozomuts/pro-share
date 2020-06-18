import { ActionTypes } from './constants';
import {Color,SetColorsAction} from './types'

const initialState: Color={
  primaryColor: '',
  secondaryColor: ''
}

export const colorReducer = (state = initialState, action:SetColorsAction) => {
  switch (action.type) {
    case ActionTypes.setColors:
      return {
        ...state,
        primaryColor: action.payload.primaryColor,
        secondaryColor: action.payload.secondaryColor,
      };
    default:
      return state;
  }
};
