import { ThunkAction, ThunkDispatch as ReduxThunkDispatch } from 'redux-thunk'

import { StoreState, StoreActions } from '.'
import { isValidTableauMove, random } from '../lib/util'
import { StackType, Card, Cards } from '../lib/Card'

import { moveCards, deselectCard, selectCard, reveal, throwStock, recycleWaste } from './stacks'
import {
  getSelection,
  getFoundationStack,
  disallowClickStock,
  getWaste,
  getStock,
  getScoringType,
  getMovableToFoundation,
  CardSelection,
  getHiddenCard,
} from './selectors'
import { checkpoint } from './undoable'
import { incrementScore, ScoreType, ScoringType, decrementDraws } from './game-state'
import { initialize as initializeGame } from './init'

export type ThunkResult<R, E = null> = ThunkAction<R, StoreState, E, StoreActions>
export type ThunkDispatch<E = null> = ReduxThunkDispatch<StoreState, E, StoreActions>

interface CardClickAction<T = void> {
  (selection: CardSelection): ThunkResult<T>
}

export const initialize = (newScoringType?: ScoringType): ThunkResult<void> => (dispatch, getState) => {
  const scoringType = newScoringType == null ? getScoringType(getState()) : newScoringType
  const availableCards = Array.from(Cards)
  const cards: Card[] = []

  for (let i = 0; i < 52; i++) {
    const index = random(0, availableCards.length)
    cards.push(...availableCards.splice(index, 1))
  }

  dispatch(initializeGame(scoringType, cards))
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
  const foundation = (selection.stackCard && getFoundationStack(getState(), selection.stackCard.card)) || null
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
    if (selection && selection.stackCard && isValidTableauMove(selection.stackCard.card, clickedCard)) {
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
      dispatch(decrementDraws())
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
