import {Action} from 'redux'
import {ActionTypes} from './constants'

export type Color = {
  primaryColor: string,
  secondaryColor: string
}

export interface SetColorsAction extends Action {
  type: typeof ActionTypes.setColors
  payload: Color
}