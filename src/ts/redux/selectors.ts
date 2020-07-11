import { createSelector } from 'reselect'
import { StoreState } from './index'
import { Card, ValueType, Stack, StackType } from '../lib/Card'
import { isSequential } from '../lib/util'

export type Selection = { card: Card; stack: Stack } | null

export const getAllStacks = createSelector(
  (state: StoreState) => state.stacks.present.stacks,
  (stacks) => stacks,
)

export const getFoundation = createSelector(getAllStacks, (stacks) =>
  stacks.filter((stack) => stack.type === StackType.foundation),
)

export const getTableau = createSelector(getAllStacks, (stacks) =>
  stacks.filter((stack) => stack.type === StackType.tableau),
)

export const getStock = createSelector(
  getAllStacks,
  (stacks) => stacks.filter((stack) => stack.type === StackType.stock)[0],
)

export const getWaste = createSelector(
  getAllStacks,
  (stacks) => stacks.filter((stack) => stack.type === StackType.waste)[0],
)

export const getFoundationStack = createSelector(
  getFoundation,
  (_: unknown, card: Card) => card,
  (foundation, card) =>
    foundation.find(({ cards }) => {
      const last = cards[cards.length - 1]
      return last == null ? card.value === ValueType.ace : last.card.suit === card.suit && isSequential(card, last.card)
    }),
)

export const getScoreStore = createSelector(
  (state: StoreState) => state.gameState.present,
  (score) => score,
)

export const getScore = createSelector(getScoreStore, (score) => score.score)

export const getScoringType = createSelector(getScoreStore, (score) => score.scoringType)

export const getDraws = createSelector(
  (state: StoreState) => state.gameState.present,
  ({ draws }) => draws,
)

export const getShowing = createSelector(
  (state: StoreState) => state.gameState.present,
  ({ showing }) => showing,
)

export const getSelection = createSelector(getAllStacks, (stacks) => {
  const stack = stacks.find((stack) => stack.selection != null)
  if (stack) return { card: stack.selection, stack: stack } as Selection
  return null
})

export const disallowClickStock = createSelector(
  [getStock, getDraws],
  (stock, draws) => stock.cards.length === 0 && draws === 0,
)
