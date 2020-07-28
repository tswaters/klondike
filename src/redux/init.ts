import { ScoringType } from './game-state'
import { Card } from '../lib/Card'
import { ColorSchemeType } from '../drawing/ColorScheme'

// this is in it's own file because circular dependencies are jerks.

type InitializeOptions = {
  scoringType: ScoringType
  number: number
  theme: ColorSchemeType
  cards: Card[]
}

export const INITIALIZE = '@@game-state/initialize'
export type InitializeAction = {
  type: typeof INITIALIZE
  scoringType: ScoringType
  cards: Card[]
  number: number
  theme: ColorSchemeType
}

export const initialize = ({ scoringType, cards, number, theme }: InitializeOptions): InitializeAction => ({
  type: INITIALIZE,
  scoringType,
  cards,
  number,
  theme,
})
