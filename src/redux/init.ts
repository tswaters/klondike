import { ScoringType } from './game-state'
import { Card } from '../lib/Card'

// this is in it's own file because circular dependencies are jerks.

export const INITIALIZE = '@@game-state/initialize'
export type InitializeAction = { type: typeof INITIALIZE; scoringType: ScoringType; cards: Card[]; number: number }
export const initialize = (scoringType: ScoringType, cards: Card[], number: number): InitializeAction => ({
  type: INITIALIZE,
  scoringType,
  cards,
  number,
})
