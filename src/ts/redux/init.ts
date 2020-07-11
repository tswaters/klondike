import { ScoringType } from './game-state'
import { Card } from '../lib/Card'

export const INITIALIZE = '@@game-state/initialize'
export type InitializeAction = { type: typeof INITIALIZE; scoringType: ScoringType; cards: Card[] }
export const initialize = (scoringType: ScoringType, cards: Card[]): InitializeAction => ({
  type: INITIALIZE,
  scoringType,
  cards,
})
