import { createSelector } from 'reselect'
import { StoreState } from './index'

export const getFoundation = createSelector(
  (state: StoreState) => state.foundation.present,
  foundation => foundation
)

export const getScore = createSelector(
  (state: StoreState) => state.score.present,
  score => score
)

export const getStock = createSelector(
  (state: StoreState) => state.stock.present,
  stock => stock
)

export const getTableau = createSelector(
  (state: StoreState) => state.tableau.present,
  tableau => tableau
)

export const getWaste = createSelector(
  (state: StoreState) => state.waste.present,
  waste => waste
)

export const getDeck = createSelector(
  (state: StoreState) => state.deck.present,
  deck => deck
)

export const getAllStacks = createSelector(
  [getFoundation, getWaste, getTableau],
  ({ stacks: foundation }, { stacks: waste }, { stacks: tableau }) => [
    ...foundation,
    ...waste,
    ...tableau
  ]
)
