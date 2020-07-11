import { combineReducers } from 'redux'
import stacks, { CardActions, StackStore } from './stacks'
import gameState, { GameStateActions, GameStateStore } from './game-state'
import { History, UndoableActions } from './undoable'

export type StoreActions = GameStateActions | CardActions | UndoableActions

export type StoreState = {
  stacks: History<StackStore>
  gameState: History<GameStateStore>
}

export default combineReducers<StoreState, StoreActions>({ stacks, gameState })
