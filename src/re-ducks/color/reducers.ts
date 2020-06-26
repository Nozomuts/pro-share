import { ActionTypes } from './constants';
import {Color,SetColorsAction} from './types'

const initialState: Color={
  color: ''
}

export const colorReducer = (state = initialState, action:SetColorsAction) => {
  switch (action.type) {
    case ActionTypes.setColors:
      return {
        ...state,
        color: action.payload.color,
      };
    default:
      return state;
  }
};
