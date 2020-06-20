import { Stack, StackCard } from '../lib/Stack'
import {
  deselect_card,
  move_cards,
  append_cards,
  select_card,
} from '../lib/util'

export enum ScoringType {
  vegas,
  regular,
}

export enum ScoreType {
  wasteToTableau,
  wasteToFoundation,
  tableauToFoundation,
  revealCard,
  foundationToTableau,
}

export const INITIALIZE = 'INITIALIZE'
type INITIALIZE = typeof INITIALIZE
export type Initialize = { type: INITIALIZE; scoringType: ScoringType }

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

export type StackLike = {
  readonly stacks: Stack[]
}

export const selectCard = <S extends StackLike>(
  state: S,
  action: SelectAction,
) =>
  state.stacks.some((stack) => stack === action.stack)
    ? { ...state, stacks: select_card(state.stacks, action) }
    : state

export const deselectCard = <S extends StackLike>(state: S) =>
  state.stacks.some((stack) => !!stack.selection)
    ? { ...state, stacks: deselect_card(state.stacks) }
    : state

export const moveCards = <S extends StackLike>(
  state: S,
  action: MoveCardAction,
) =>
  state.stacks.some((stack) => [action.from, action.to].includes(stack))
    ? { ...state, stacks: move_cards(state.stacks, action) }
    : state

export const appendCards = <S extends StackLike>(
  state: S,
  action: AppendCardAction,
) =>
  state.stacks.some((stack) => action.stack === stack)
    ? { ...state, stacks: append_cards(state.stacks, action) }
    : state

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
