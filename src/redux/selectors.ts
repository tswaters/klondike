import { createSelector } from 'reselect'
import { StackType, StackCard } from '../lib/Card'
import { getTopCard, isValidFoundationMove } from '../lib/util'
import { ScoringType } from '../lib/Scoring'
import { StoreState, CardSelection } from './index'

export const getStacks = createSelector(
  (state: StoreState) => state.stacks.present.stacks,
  (stacks) => stacks,
)

const getFoundation = createSelector(getStacks, (stacks) =>
  stacks.filter((stack) => stack.type === StackType.foundation),
)

export const getTableau = createSelector(getStacks, (stacks) =>
  stacks.filter((stack) => stack.type === StackType.tableau),
)

export const getGameWon = createSelector(getFoundation, (foundation) =>
  foundation.every((stack) => stack.cards.length === 13),
)

export const getHiddenCard = createSelector(getTableau, (stacks) =>
  stacks.reduce<CardSelection | null>((acc, stack) => {
    if (acc) return acc
    const topCard = getTopCard(stack)
    if (topCard && topCard.hidden) return { stack, stackCard: topCard }
    return null
  }, null),
)

export const getMovableToFoundation = createSelector([getStacks, getFoundation], (stacks, foundation) =>
  stacks
    .filter((stack) => stack.type !== StackType.foundation)
    .reduce<CardSelection | null>((acc, stack) => {
      if (acc) return acc
      const topCard = getTopCard(stack)
      if (topCard == null || topCard.hidden) return acc
      if (foundation.some((f) => isValidFoundationMove(topCard, getTopCard(f)))) return { stack, stackCard: topCard }
      return null
    }, null),
)

export const getStock = createSelector(
  getStacks,
  (stacks) => stacks.filter((stack) => stack.type === StackType.stock)[0],
)

export const getWaste = createSelector(
  getStacks,
  (stacks) => stacks.filter((stack) => stack.type === StackType.waste)[0],
)

export const getFoundationStack = createSelector(
  getFoundation,
  (_: unknown, stackCard: StackCard) => stackCard,
  (foundation, stackCard) => foundation.find((stack) => isValidFoundationMove(stackCard, getTopCard(stack))),
)

export const getGameState = createSelector(
  (state: StoreState) => state.gameState.present,
  (score) => score,
)

export const getTheme = createSelector(getGameState, (gameState) => gameState.theme)

export const getScore = createSelector(getGameState, (gameState) => gameState.score)

export const getType = createSelector(getGameState, (gameState) => gameState.scoringType)

export const getDraws = createSelector(getGameState, (gameState) => gameState.draws)

const VEGAS_DRAW_LIMIT = 3
export const getOverDrawn = createSelector(
  [getDraws, getType],
  (draws, scoringType) => scoringType === ScoringType.vegas && draws + 1 > VEGAS_DRAW_LIMIT,
)

export const getShowing = createSelector(getGameState, ({ showing }) => showing)

export const getNumber = createSelector(getGameState, ({ number }) => number)

export const getSelection = createSelector(getStacks, (stacks) => {
  const stack = stacks.find((stack) => stack.selection != null)
  if (stack) return { stackCard: stack.selection, stack: stack }
  return null
})

export const disallowClickStock = createSelector(
  [getStock, getOverDrawn],
  (stock, overDrawn) => stock.cards.length === 0 && overDrawn,
)
