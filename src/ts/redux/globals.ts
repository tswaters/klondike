import { Stack, StackCard } from '../lib/Stack'

export const INITIALIZE = 'INITIALIZE'
type INITIALIZE = typeof INITIALIZE
export type Initialize = { type: INITIALIZE }

export const SELECT_CARD = 'SELECT_CARD'
type SELECT_CARD = typeof SELECT_CARD
export type SelectAction = { type: SELECT_CARD; stack: Stack; card: StackCard }

export const DESELECT_CARD = 'DESELECT_CARD'
type DESELECT_CARD = typeof DESELECT_CARD
export type DeselectAction = { type: DESELECT_CARD }

export const MOVE_CARDS = 'MOVE_CARDS'
type MOVE_CARDS = typeof MOVE_CARDS
export type MoveCardAction = {
  type: MOVE_CARDS
  from: Stack
  to: Stack
  cards: StackCard[]
  hidden: boolean
}

export const REVEAL_TOP = 'REVEAL_TOP'
type REVEAL_TOP = typeof REVEAL_TOP
export type RevealTopCardAction = { type: REVEAL_TOP; stack: Stack }

export const APPEND_CARDS = 'APPEND_CARDS'
type APPEND_CARDS = typeof APPEND_CARDS
export type AppendCardAction = {
  type: APPEND_CARDS
  stack: Stack
  cards: StackCard[]
}

export const CHANGE_SCORE_TYPE = 'CHANGE_SCORE_TYPE'
type CHANGE_SCORE_TYPE = typeof CHANGE_SCORE_TYPE
export type ChangeScoreAction = {
  type: CHANGE_SCORE_TYPE
}

export type GlobalActions =
  | Initialize
  | SelectAction
  | DeselectAction
  | MoveCardAction
  | RevealTopCardAction
  | AppendCardAction
  | ChangeScoreAction
