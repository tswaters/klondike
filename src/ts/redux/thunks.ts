import { ThunkAction, ThunkDispatch as ReduxThunkDispatch } from 'redux-thunk'

import { StoreState, StoreActions } from '.'
import { isValidMove, random } from '../lib/util'
import { Stack, StackCard, StackType, Card, Cards } from '../lib/Card'

import { moveCards, deselectCard, selectCard, reveal, throwStock, recycleWaste } from './stacks'
import { getSelection, getFoundationStack, disallowClickStock, getWaste, getStock, getScoringType } from './selectors'
import { checkpoint } from './undoable'
import { incrementScore, ScoreType, ScoringType, decrementDraws } from './game-state'
import { initialize as initializeGame } from './init'

export type ThunkResult<R, E = null> = ThunkAction<R, StoreState, E, StoreActions>
export type ThunkDispatch<E = null> = ReduxThunkDispatch<StoreState, E, StoreActions>

interface CardClickAction<T = void> {
  (stack: Stack, stackCard?: StackCard): ThunkResult<T>
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

export const clickCard: CardClickAction = (clickedStack, clickedCard) => (dispatch, getState) => {
  if (clickedCard != null && clickedCard.selected) return dispatch(deselectCard())

  const selection = getSelection(getState())
  if (selection == null && clickedCard && clickedCard.card && !clickedCard.hidden)
    return dispatch(selectCard(clickedStack, clickedCard))

  if (clickedStack.type === StackType.foundation) {
    const foundation = (selection && getFoundationStack(getState(), selection.card)) || null
    if (foundation && selection) {
      if (selection.stack.type === StackType.waste) dispatch(incrementScore(ScoreType.wasteToFoundation))
      if (selection.stack.type === StackType.tableau) dispatch(incrementScore(ScoreType.tableauToFoundation))
      dispatch(moveCards(selection.stack, foundation, selection.card))
      dispatch(deselectCard())
    }
    return
  }

  if (clickedStack.type === StackType.tableau) {
    if (selection == null && clickedCard && clickedCard.hidden) {
      dispatch(checkpoint())
      dispatch(incrementScore(ScoreType.revealCard))
      dispatch(reveal(clickedStack))
    }
    if (selection != null && isValidMove(selection.card, clickedCard)) {
      dispatch(checkpoint())
      if (selection.stack.type === StackType.waste) dispatch(incrementScore(ScoreType.wasteToTableau))
      if (selection.stack.type === StackType.foundation) dispatch(incrementScore(ScoreType.foundationToTableau))
      dispatch(moveCards(selection.stack, clickedStack, selection.card))
      dispatch(deselectCard())
    }
  }

  if (clickedStack.type === StackType.stock) {
    if (disallowClickStock(getState())) return
    const waste = getWaste(getState())
    const stock = getStock(getState())
    dispatch(checkpoint())
    if (selection) dispatch(deselectCard())
    if (stock.cards.length > 0) {
      dispatch(throwStock(stock, waste))
    } else {
      dispatch(recycleWaste(waste, stock))
      dispatch(decrementDraws())
    }
  }
}

export const doubleClickCard: CardClickAction = (stack, stackCard) => (dispatch, getState) => {
  if (
    stack.type === StackType.foundation ||
    stack.type === StackType.stock ||
    stackCard == null ||
    stackCard.card == null
  ) {
    return
  }

  const foundation = getFoundationStack(getState(), stackCard.card)
  if (!foundation) return

  dispatch(checkpoint())
  if (stack.type === StackType.waste) dispatch(incrementScore(ScoreType.wasteToFoundation))
  if (stack.type === StackType.tableau) dispatch(incrementScore(ScoreType.tableauToFoundation))
  dispatch(moveCards(stack, foundation, stackCard.card))
  dispatch(deselectCard())
}
