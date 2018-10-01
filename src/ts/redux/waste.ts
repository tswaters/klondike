
import {INITIALIZE, GlobalActions, SELECT_CARD, DESELECT_CARD, MOVE_CARDS} from './actions'
import {select_card, deselect_card, move_cards} from '../lib/util'
import {Stack, StackType} from '../lib/Stack'
import {Card} from '../lib/Card'

const RECYCLE_WASTE = 'RECYCLE_WASTE'
type RECYCLE_WASTE = typeof RECYCLE_WASTE
type RecycleAction = {type: RECYCLE_WASTE}
export const recycleWaste = (): RecycleAction => ({type: RECYCLE_WASTE})

const ADD_CARDS_TO_WASTE = 'ADD_CARDS_TO_WASTE'
type ADD_CARDS_TO_WASTE = typeof ADD_CARDS_TO_WASTE
type AddCardToWasteAction = {type: ADD_CARDS_TO_WASTE, cards: Card[]}
export const addCardsToWaste = (cards: Card[]): AddCardToWasteAction => ({type: ADD_CARDS_TO_WASTE, cards})

export type WasteActions = RecycleAction | AddCardToWasteAction

export type WasteStore = {
  readonly stacks: Stack[] // this is an array for consistency with other stores
  readonly showing: number
}

const initialState: WasteStore = {stacks: [{type: StackType.waste, cards: []}], showing: 0}

export default function tableauReducer (
  state: WasteStore = initialState,
  action: WasteActions | GlobalActions
): WasteStore {

  if (action.type === INITIALIZE) {
    return {...initialState}
  }

  if (action.type === RECYCLE_WASTE) {
    return {...initialState}
  }

  if (action.type === SELECT_CARD) {
    if (state.stacks.every(stack => stack !== action.stack)) { return state }
    return {...state, stacks: select_card(state.stacks, action.card)}
  }

  if (action.type === DESELECT_CARD) {
    if (state.stacks.every(stack => stack.selection == null)) { return state }
    return {...state, stacks: deselect_card(state.stacks)}
  }

  if (action.type === MOVE_CARDS) {
    if (state.stacks.every(stack => [action.from, action.to].indexOf(stack) === -1)) { return state }
    return {
      ...state,
      showing: Math.max(1, state.showing - 1),
      stacks: move_cards(state.stacks, action.from, action.to, action.cards)
    }
  }

  if (action.type === ADD_CARDS_TO_WASTE) {
    const cards = [...state.stacks[0].cards, ...action.cards.map(card => ({card}))]
    return {
      ...state,
      showing: Math.min(cards.length, 3),
      stacks: state.stacks.map(stack => ({...stack, cards}))
    }
  }

  return state

}
