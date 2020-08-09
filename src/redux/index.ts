import { combineReducers } from 'redux'
import stacks, { CardActions, StackStore } from './stacks'
import gameState, { GameStateActions, GameStateStore } from './game-state'
import { History, UndoableActions } from './undoable'

export type StoreActions = GameStateActions | CardActions | UndoableActions

export type Reducer<S, A extends StoreActions> = {
  [key in A['type']]?: (state: S, action: A extends StoreActions ? (A['type'] extends key ? A : never) : never) => S
}

export type StoreState = {
  stacks: History<StackStore>
  gameState: History<GameStateStore>
}

export default combineReducers<StoreState, StoreActions>({ stacks, gameState })
