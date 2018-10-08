
import {combineReducers} from 'redux'
import {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {GlobalActions} from './actions'
import tableau, {TableauStore, TableauActions} from './tableau'
import foundation, {FoundationStore} from './foundation'
import waste, {WasteStore, WasteActions} from './waste'
import stock, {StockStore, StockActions} from './stock'
import score, {ScoreStore, ScoreActions} from './score'
import deck, {DeckStore, DeckActions} from './deck'
import {History, UndoableActions} from './undoable'

export type StoreActions =
  GlobalActions |
  ScoreActions |
  WasteActions |
  StockActions |
  UndoableActions |
  DeckActions |
  TableauActions

export type StoreState = {
  deck: History<DeckStore>,
  tableau: History<TableauStore>,
  foundation: History<FoundationStore>,
  waste: History<WasteStore>,
  stock: History<StockStore>,
  score: History<ScoreStore>
}

export type ThunkResult<R> = ThunkAction<R, StoreState, null, StoreActions>
export type ThunkDispatch = ThunkDispatch<StoreState, null, StoreActions>

export default combineReducers<StoreState, StoreActions>({
  deck,
  tableau,
  foundation,
  waste,
  stock,
  score
})
