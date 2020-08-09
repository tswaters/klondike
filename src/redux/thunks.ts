import { ThunkAction, ThunkDispatch as ReduxThunkDispatch } from 'redux-thunk'

import { StoreState, StoreActions } from '.'
import { isValidTableauMove, rnd } from '../lib/util'
import { StackType, Card, Cards } from '../lib/Card'

import { moveCards, deselectCard, selectCard, reveal, throwStock, recycleWaste } from './stacks'
import {
  getSelection,
  getFoundationStack,
  disallowClickStock,
  getWaste,
  getStock,
  getType,
  getMovableToFoundation,
  CardSelection,
  getHiddenCard,
  getNumber,
  getTheme,
} from './selectors'
import { checkpoint } from './undoable'
import { incrementScore, ScoreType, ScoringType, incrementDraws } from './game-state'
import { initialize as initializeGame } from './init'
import { ColorSchemeType } from '../drawing/ColorScheme'

export type ThunkResult<R, E = null> = ThunkAction<R, StoreState, E, StoreActions>
export type ThunkDispatch<E = null> = ReduxThunkDispatch<StoreState, E, StoreActions>

interface CardClickAction<T = void> {
  (selection: CardSelection): ThunkResult<T>
}

export const newType = (newType?: ScoringType): ThunkResult<void> => (dispatch) =>
  dispatch(initialize({ newNumber: Math.floor(Math.random() * 1000), newType }))

export const newNumber = (newNumber?: number): ThunkResult<void> => (dispatch) =>
  dispatch(initialize({ newNumber: newNumber == null ? Math.floor(Math.random() * 1000) : newNumber }))

interface Initialize {
  (arg0: { newType?: ScoringType; newNumber?: number; newTheme?: ColorSchemeType }): ThunkResult<void>
}

export const initialize: Initialize = ({ newType, newNumber, newTheme }) => (dispatch, getState) => {
  const number = newNumber == null ? getNumber(getState()) : newNumber
  const scoringType = newType == null ? getType(getState()) : newType
  const theme = newTheme == null ? getTheme(getState()) : newTheme

  const availableCards = Array.from(Cards)
  const cards: Card[] = []

  const rando = rnd(number)

  for (let i = 0; i < 52; i++) {
    const index = rando(0, availableCards.length)
    cards.push(...availableCards.splice(index, 1))
  }

  dispatch(initializeGame({ scoringType, cards, number, theme }))
}

export const performMoves = (): ThunkResult<void> => (dispatch, getState) => {
  let movable: CardSelection | null
  while ((movable = getMovableToFoundation(getState()) || getHiddenCard(getState()))) {
    if (movable.stackCard?.hidden ?? false) {
      dispatch(checkAndPerformCardReveal(movable))
    } else {
      dispatch(checkAndPerformFoundationMove(movable))
    }
  }
}

const checkAndPerformCardReveal: CardClickAction = (selection) => (dispatch) => {
  if (selection == null) return
  dispatch(checkpoint())
  dispatch(incrementScore(ScoreType.revealCard))
  dispatch(reveal(selection.stack))
}

const checkAndPerformFoundationMove: CardClickAction = (selection) => (dispatch, getState) => {
  const foundation = selection.stackCard && getFoundationStack(getState(), selection.stackCard)
  if (foundation && selection.stackCard) {
    dispatch(deselectCard())
    dispatch(checkpoint())
    if (selection.stack.type === StackType.waste) dispatch(incrementScore(ScoreType.wasteToFoundation))
    if (selection.stack.type === StackType.tableau) dispatch(incrementScore(ScoreType.tableauToFoundation))
    dispatch(moveCards(selection.stack, foundation, selection.stackCard))
  }
}

export const clickCard: CardClickAction = (cardSelection) => (dispatch, getState) => {
  const { stackCard: clickedCard, stack: clickedStack } = cardSelection
  if (clickedCard != null && clickedCard.selected) return dispatch(deselectCard())

  const selection = getSelection(getState())
  if (selection == null && clickedCard && !clickedCard.hidden) return dispatch(selectCard(clickedStack, clickedCard))

  if (clickedStack.type === StackType.foundation && selection) {
    dispatch(checkAndPerformFoundationMove(selection))
    return
  }

  if (clickedStack.type === StackType.tableau) {
    if (selection == null && clickedCard && clickedCard.hidden) {
      dispatch(checkpoint())
      dispatch(incrementScore(ScoreType.revealCard))
      dispatch(reveal(clickedStack))
    }
    if (selection && selection.stackCard && isValidTableauMove(selection.stackCard, clickedCard)) {
      dispatch(deselectCard())
      dispatch(checkpoint())
      if (selection.stack.type === StackType.waste) dispatch(incrementScore(ScoreType.wasteToTableau))
      if (selection.stack.type === StackType.foundation) dispatch(incrementScore(ScoreType.foundationToTableau))
      dispatch(moveCards(selection.stack, clickedStack, selection.stackCard))
    }
  }

  if (clickedStack.type === StackType.stock) {
    if (disallowClickStock(getState())) return
    if (selection) dispatch(deselectCard())
    const waste = getWaste(getState())
    const stock = getStock(getState())
    dispatch(checkpoint())
    if (stock.cards.length > 0) {
      dispatch(throwStock(stock, waste))
    } else {
      dispatch(recycleWaste(waste, stock))
      dispatch(incrementDraws())
    }
  }
}

export const doubleClickCard: CardClickAction = (cardSelection) => (dispatch) => {
  const { stack, stackCard } = cardSelection
  if (
    stack.type === StackType.foundation ||
    stack.type === StackType.stock ||
    stackCard == null ||
    stackCard.card == null
  ) {
    return
  }

  dispatch(checkAndPerformFoundationMove({ stack, stackCard }))
}
