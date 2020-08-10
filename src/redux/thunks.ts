import { AppThunk, CardSelection } from '.'
import { isValidTableauMove, rnd } from '../lib/util'
import { StackType, Card, Cards } from '../lib/Card'
import { ScoringType, ScoreType } from '../lib/Scoring'
import { ColorSchemeType } from '../drawing/ColorScheme'

import { initialize } from './init'
import { moveCards, deselectCard, selectCard, revealTop, drawStockCards, recycleWaste } from './stacks'
import {
  getSelection,
  getFoundationStack,
  disallowClickStock,
  getWaste,
  getStock,
  getType,
  getMovableToFoundation,
  getHiddenCard,
  getNumber,
  getTheme,
} from './selectors'
import { checkpoint } from './undoable'
import { incrementScore, incrementDraws } from './game-state'

export const newType = (newType?: ScoringType) =>
  initializeGame({ newNumber: Math.floor(Math.random() * 1000), newType })

export const newNumber = (newNumber?: number) =>
  initializeGame({ newNumber: newNumber == null ? Math.floor(Math.random() * 1000) : newNumber })

type InitOptions = { newType?: ScoringType; newNumber?: number; newTheme?: ColorSchemeType }

export const initializeGame = ({ newType, newNumber, newTheme }: InitOptions): AppThunk => (dispatch, getState) => {
  const number = newNumber == null ? getNumber(getState()) : newNumber
  const scoringType = newType == null ? getType(getState()) : newType
  const theme = newTheme == null ? getTheme(getState()) : newTheme

  const availableCards = Array.from(Cards)
  const cards: Card[] = []

  const rando = rnd(number)

  for (let i = 0; i < 52; i += 1) {
    const index = rando(0, availableCards.length)
    const [card] = availableCards.splice(index, 1)
    cards.push(card)
  }

  dispatch(initialize({ scoringType, cards, number, theme }))
}

export const performMoves = (): AppThunk => (dispatch, getState) => {
  let movable: CardSelection | null
  while ((movable = getMovableToFoundation(getState()) || getHiddenCard(getState()))) {
    if (movable.stackCard?.hidden ?? false) {
      dispatch(checkAndPerformCardReveal(movable))
    } else {
      dispatch(checkAndPerformFoundationMove(movable))
    }
  }
}

const checkAndPerformCardReveal = (selection: CardSelection): AppThunk => (dispatch) => {
  if (selection == null) return
  dispatch(checkpoint())
  dispatch(incrementScore(ScoreType.revealCard))
  dispatch(revealTop(selection.stack))
}

const checkAndPerformFoundationMove = (selection: CardSelection): AppThunk => (dispatch, getState) => {
  const foundation = selection.stackCard && getFoundationStack(getState(), selection.stackCard)
  if (foundation && selection.stackCard) {
    dispatch(deselectCard())
    dispatch(checkpoint())
    if (selection.stack.type === StackType.waste) dispatch(incrementScore(ScoreType.wasteToFoundation))
    if (selection.stack.type === StackType.tableau) dispatch(incrementScore(ScoreType.tableauToFoundation))
    dispatch(moveCards(selection.stack, foundation, selection.stackCard))
  }
}

export const clickCard = (cardSelection: CardSelection): AppThunk => (dispatch, getState) => {
  const { stackCard, stack } = cardSelection
  if (stackCard != null && stackCard.selected) return dispatch(deselectCard())

  const selection = getSelection(getState())
  if (selection == null && stackCard && !stackCard.hidden) return dispatch(selectCard({ stack, stackCard }))

  if (stack.type === StackType.foundation && selection) {
    dispatch(checkAndPerformFoundationMove(selection))
    return
  }

  if (stack.type === StackType.tableau) {
    if (selection == null && stackCard && stackCard.hidden) {
      dispatch(checkpoint())
      dispatch(incrementScore(ScoreType.revealCard))
      dispatch(revealTop(stack))
    }
    if (selection && selection.stackCard && isValidTableauMove(selection.stackCard, stackCard)) {
      dispatch(deselectCard())
      dispatch(checkpoint())
      if (selection.stack.type === StackType.waste) dispatch(incrementScore(ScoreType.wasteToTableau))
      if (selection.stack.type === StackType.foundation) dispatch(incrementScore(ScoreType.foundationToTableau))
      dispatch(moveCards(selection.stack, stack, selection.stackCard))
    }
  }

  if (stack.type === StackType.stock) {
    if (disallowClickStock(getState())) return
    if (selection) dispatch(deselectCard())
    const waste = getWaste(getState())
    const stock = getStock(getState())
    dispatch(checkpoint())
    if (stock.cards.length > 0) {
      dispatch(drawStockCards({ stock, waste }))
    } else {
      dispatch(recycleWaste({ stock, waste }))
      dispatch(incrementDraws())
    }
  }
}

export const doubleClickCard = (cardSelection: CardSelection): AppThunk => (dispatch) => {
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
