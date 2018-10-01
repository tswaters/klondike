
import {combineReducers} from 'redux'
import {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {GlobalActions} from './actions'
import tableau, {TableauStore} from './tableau'
import foundation, {FoundationStore} from './foundation'
import waste, {WasteStore, WasteActions} from './waste'
import stock, {StockStore, StockActions} from './stock'
import score, {ScoreStore, ScoreActions} from './score'

export type StoreActions =
  GlobalActions |
  ScoreActions |
  WasteActions |
  StockActions

export type StoreState = {
  tableau: TableauStore,
  foundation: FoundationStore,
  waste: WasteStore,
  stock: StockStore,
  score: ScoreStore
}

export type ThunkResult<R> = ThunkAction<R, StoreState, null, StoreActions>
export type ThunkDispatch = ThunkDispatch<StoreState, null, StoreActions>

export default combineReducers<StoreState, StoreActions>({
  tableau,
  foundation,
  waste,
  stock,
  score
})
