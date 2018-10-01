
import {INITIALIZE, GlobalActions} from './actions'
import {Stack, StackCard, StackType} from '../lib/Stack'
import {Card} from '../lib/Card'

const USE_STOCK = 'USE_STOCK'
type USE_STOCK = typeof USE_STOCK
type UseStockAction = {type: USE_STOCK, count: number}

const ADD_CARDS_TO_STOCK = 'ADD_CARDS_TO_STOCK'
type ADD_CARDS_TO_STOCK = typeof ADD_CARDS_TO_STOCK
type AddCardToStockAction = {type: ADD_CARDS_TO_STOCK, cards: Card[]}

export function useStock (count: number): UseStockAction {
  return {type: USE_STOCK, count}
}

export function addCardsToStock(cards: Card[]): AddCardToStockAction {
  return {type: ADD_CARDS_TO_STOCK, cards}
}

export type StockActions = UseStockAction | AddCardToStockAction

export type StockStore = {
  readonly stack: Stack
  readonly left: number
}

const initialState: StockStore = {stack: {type: StackType.stock, cards: [{}]}, left: 24}

export default function tableauReducer (
  state: StockStore = initialState,
  action: StockActions | GlobalActions
): StockStore {

  if (action.type === INITIALIZE) {
    return {...initialState}
  }

  if (action.type === USE_STOCK) {

    let cards: StackCard[]
    if (state.left > 0) {
      cards = state.left - action.count === 0 ? [] : state.stack.cards
    } else {
      cards = state.stack.cards.slice(0, -action.count)
    }

    return {
      stack: {
        ...state.stack,
        cards
      },
      left: state.left > 0 ? state.left - action.count : 0
    }
  }

  if (action.type === ADD_CARDS_TO_STOCK) {
    return {
      ...state,
      stack: {
        ...state.stack,
        cards: [
          ...state.stack.cards,
          ...action.cards.map(card => ({card}))
        ]
      }
    }
  }

  return state

}
