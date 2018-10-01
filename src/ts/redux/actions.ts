
import {createSelector} from 'reselect'
import Deck from '../lib/Deck'
import {ThunkResult, StoreState} from './index'
import {useStock, addCardsToStock} from './stock'
import {addCardsToWaste, recycleWaste} from './waste'
import {StackCard, Stack, StackType} from '../lib/Stack'
import {Card, ValueType} from '../lib/Card'
import {equals, get_selection, movable_to_tableau, get_top_card, movable_to_foundation} from '../lib/util'
import {incrementScore} from './score'

export const INITIALIZE = 'INITIALIZE'
export type INITIALIZE = typeof INITIALIZE
type Initialize = {type: INITIALIZE}

export const SELECT_CARD = 'SELECT_CARD'
type SELECT_CARD = typeof SELECT_CARD
type SelectAction = {type: SELECT_CARD, stack: Stack, card: StackCard}

export const DESELECT_CARD = 'DESELECT_CARD'
type DESELECT_CARD = typeof DESELECT_CARD
type DeselectAction = {type: DESELECT_CARD}

export const MOVE_CARDS = 'MOVE_CARDS'
type MOVE_CARDS = typeof MOVE_CARDS
type MoveCardAction = {type: MOVE_CARDS, from: Stack, to: Stack, cards: StackCard[]}

export const REPLACE_TOP = 'REPLACE_TOP'
type REPLACE_TOP = typeof REPLACE_TOP
type ReplaceTopAction = {type: REPLACE_TOP, stack: Stack, card: Card}

export type GlobalActions =
  Initialize |
  SelectAction |
  DeselectAction |
  MoveCardAction |
  ReplaceTopAction

const getAllStacks = createSelector([
  (state: StoreState) => state.foundation.stacks,
  (state: StoreState) => state.waste.stacks,
  (state: StoreState) => state.tableau.stacks
], (foundation, waste, tableau) => [...foundation, ...waste, ...tableau])

export const initialize = (): Initialize => ({type: INITIALIZE})

const selectCard = (stack: Stack, card: StackCard): SelectAction => ({type: SELECT_CARD, card, stack})

const deselectCard = (): DeselectAction => ({type: DESELECT_CARD})

const moveCards = (from: Stack, to: Stack, selectedCard: Card): MoveCardAction => {
  const index = from.cards.findIndex(card => !!card.card && equals(card.card, selectedCard))
  const cards = from.cards.slice(index)
  return {type: MOVE_CARDS, from, to, cards}
}

const replaceTop = (stack: Stack, card: Card): ReplaceTopAction => ({type: REPLACE_TOP, stack, card})

export function doubleClick (stack: Stack, stackCard?: StackCard): ThunkResult<void> {
  return (dispatch, getState) => {

    if (stack.type === StackType.foundation || stack.type === StackType.stock) {
      return
    }

    if (stackCard == null) {
      return
    }

    const {card} = stackCard

    if (card == null) {
      return
    }

    const {foundation} = getState()

    const foundation_stack = (
      card.value === ValueType.ace
        ? foundation.stacks.find(stack => stack.cards.length === 0)
        : foundation.stacks.find(stack => {
          if (stack.cards.length === 0) { return false }
          const first = stack.cards[0].card
          if (first == null) { return false }
          return first.suit === card.suit
        })
    ) as Stack

    const top_card = get_top_card(foundation_stack)

    if (movable_to_foundation(card, top_card)) {

      if (stack.type === StackType.waste) {
        dispatch(incrementScore(5))
      }

      if (stack.type === StackType.tableau) {
        dispatch(incrementScore(10))
      }

      dispatch(moveCards(stack, foundation_stack, card))
      dispatch(deselectCard())
    }

  }
}

export function clickFoundation (stack: Stack, card?: StackCard): ThunkResult<void> {
  return (dispatch, getState) => {

    const stacks = getAllStacks(getState())
    const selection = get_selection(stacks)

    if (!selection) {
      if (card && card.card) {
        dispatch(selectCard(stack, card))
      }
      return
    }

    if (card && card.selected) {
      dispatch(deselectCard())
      return
    }

    const top_card = get_top_card(stack)
    const {card: selected_card, stack: from_stack} = selection

    if (movable_to_foundation(selected_card, top_card)) {

      if (from_stack.type === StackType.waste) {
        dispatch(incrementScore(5))
      }

      if (from_stack.type === StackType.tableau) {
        dispatch(incrementScore(10))
      }

      dispatch(moveCards(from_stack, stack, selected_card))
      dispatch(deselectCard())
    }

  }
}

export function clickWaste (stack: Stack, card?: StackCard): ThunkResult<void> {
  return (dispatch, getState) => {

    if (!card) { return }

    const stacks = getAllStacks(getState())
    const selection = get_selection(stacks)
    const top_card = get_top_card(stack)

    if (card.selected) {
      dispatch(deselectCard())
      return
    }

    if (!selection && top_card === card) {
      dispatch(selectCard(stack, card))
    }

  }
}

export function clickTableau (stack: Stack, card?: StackCard): ThunkResult<void> {
  return (dispatch, getState) => {

    const stacks = getAllStacks(getState())
    const selection = get_selection(stacks)

    if (!selection) {
      if (card && card.card) {
        dispatch(selectCard(stack, card))
      } else if (card) {
        dispatch(incrementScore(5))
        dispatch(replaceTop(stack, Deck.getCard()))
      }
      return
    }

    if (card && card.selected) {
      dispatch(deselectCard())
      return
    }

    const top_card = get_top_card(stack)
    const {card: selected_card, stack: from_stack} = selection

    if (card === top_card && movable_to_tableau(selected_card, top_card)) {

      if (from_stack.type === StackType.waste) {
        dispatch(incrementScore(10))
      }

      if (from_stack.type === StackType.foundation) {
        dispatch(incrementScore(-10))
      }

      dispatch(moveCards(from_stack, stack, selected_card))
      dispatch(deselectCard())

    }
  }
}

export function clickStock (): ThunkResult<void> {
  return (dispatch, getState) => {

    const {
      stock: {stack: stock_stack, left},
      waste: {stacks: [waste_stack]}
    } = getState()

    if (left > 0) {

      // stock starts off with 0 cards and 24 "left"
      // if we haven't finished drawing from left,
      // choose random cards from the deck to add to waste.

      dispatch(useStock(3))
      dispatch(addCardsToWaste([Deck.getCard(), Deck.getCard(), Deck.getCard()]))

    } else if (stock_stack.cards.length > 0) {

      // after recycling the waste, stock will now have cards
      // `useStock` with 0 left will remove items off the top
      // take those 3 items and add them to the waste pile
      const cards_to_add = stock_stack.cards.slice(-3).map(x => x.card).filter(x => x != null).reverse() as Card[]

      dispatch(useStock(3))
      dispatch(addCardsToWaste(cards_to_add))

    } else {

      // take all the cards in waste in add them to the stock
      // recycling removes all items.

      const cards_to_add = waste_stack.cards.map(x => x.card).filter(x => x != null).reverse() as Card[]

      dispatch(addCardsToStock(cards_to_add))
      dispatch(recycleWaste())

    }

  }
}
