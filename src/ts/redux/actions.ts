
import {createSelector} from 'reselect'
import {ThunkResult} from './index'
import {useStock} from './stock'
import {StackCard, Stack, StackType} from '../lib/Stack'
import {Card, ValueType} from '../lib/Card'
import {get_selection, movable_to_tableau, get_top_card, movable_to_foundation} from '../lib/util'
import {incrementScore} from './score'
import {getWaste, getTableau, getFoundation, getStock} from '../redux/selectors'
import {checkpoint} from './undoable'
import {getRandomCards} from './deck'

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

export const APPEND_CARDS = 'APPEND_CARDS'
type APPEND_CARDS = typeof APPEND_CARDS
type AppendCardAction = {type: APPEND_CARDS, stack: Stack, cards: Card[]}

export type GlobalActions =
  Initialize |
  SelectAction |
  DeselectAction |
  MoveCardAction |
  ReplaceTopAction |
  AppendCardAction

const getAllStacks = createSelector([
  getFoundation,
  getWaste,
  getTableau
], (
  {stacks: foundation},
  {stacks: waste},
  {stacks: tableau}
) => [
  ...foundation,
  ...waste,
  ...tableau
])

export function initialize(): ThunkResult<void> {
  return (dispatch, getState) => {
    dispatch({type: INITIALIZE})

    const tableau = getTableau(getState())
    const cards = dispatch(getRandomCards(tableau.stacks.length))
    tableau.stacks.forEach((stack, index) => {
      dispatch(appendCards(stack, [cards[index]]))
    })

  }
}

const selectCard = (stack: Stack, card: StackCard): SelectAction => ({type: SELECT_CARD, card, stack})

const deselectCard = (): DeselectAction => ({type: DESELECT_CARD})

const appendCards = (stack: Stack, cards: Card[]): AppendCardAction => ({type: APPEND_CARDS, cards, stack})

const moveCards = (
  from: Stack,
  to: Stack,
  from_card: Card | null = null,
  index: number | null = null,
  reverse: Boolean = false
): MoveCardAction => {

  if (index == null) {
    if (from_card == null) { throw new Error('from card reqired when index not provided')}
    index = from.cards.findIndex(card => !!card.card && card.card === from_card)
  }

  const cards = from.cards.slice(index)
  if (reverse) { cards.reverse() }
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

    const foundation = getFoundation(getState())

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

      dispatch(checkpoint())

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

      dispatch(checkpoint())

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
    const top_card = get_top_card(stack)

    if (!selection) {
      if (card && card.card) {
        dispatch(selectCard(stack, card))
      } else if (card && top_card && top_card.card == null) {
        dispatch(checkpoint())
        dispatch(incrementScore(5))
        const card = dispatch(getRandomCards(1))
        dispatch(replaceTop(stack, card[0]))
      }
      return
    }

    if (card && card.selected) {
      dispatch(deselectCard())
      return
    }

    const {card: selected_card, stack: from_stack} = selection

    if (card === top_card && movable_to_tableau(selected_card, top_card)) {

      dispatch(checkpoint())

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

    const state = getState()
    const {stacks: [waste_stack]} = getWaste(state)
    const {stacks: [stock_stack], left} = getStock(state)

    dispatch(checkpoint())

    if (left > 0) {

      dispatch(useStock(3))
      dispatch(appendCards(waste_stack, dispatch(getRandomCards(3))))

    } else if (stock_stack.cards.length > 0) {

      dispatch(moveCards(stock_stack, waste_stack, null, -3, true))

    } else {

      dispatch(moveCards(waste_stack, stock_stack, null, 0, true))

    }

  }
}
