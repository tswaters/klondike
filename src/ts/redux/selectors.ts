import {createSelector} from 'reselect'
import {StoreState} from './index'

export const getFoundation = createSelector(
  (state: StoreState) => state.foundation,
  foundation => foundation
)

export const getScore = createSelector(
  (state: StoreState) => state.score,
  score => score
)

export const getStock = createSelector(
  (state: StoreState) => state.stock,
  stock => stock
)

export const getTableau = createSelector(
  (state: StoreState) => state.tableau,
  tableau => tableau
)

export const getWaste = createSelector(
  (state: StoreState) => state.waste,
  waste => waste
)
