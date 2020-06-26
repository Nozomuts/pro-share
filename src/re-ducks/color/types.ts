import {Action} from 'redux'
import {ActionTypes} from './constants'

export type Color = {
  color: string
}

export interface SetColorsAction extends Action {
  type: typeof ActionTypes.setColors
  payload: Color
}