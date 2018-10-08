
import {Reducer, Action, AnyAction} from 'redux'
import {INITIALIZE} from './actions'

export type History <State> = {
  past: State[],
  present: State,
  future: State[]
}

const UNDO = 'UNDO'
type UNDO = typeof UNDO
type UndoAction = {type: UNDO}
export const undo = (): UndoAction => ({type: UNDO})

const REDO = 'REDO'
type REDO = typeof REDO
type RedoAction = {type: REDO}
export const redo = (): RedoAction => ({type: REDO})

const CHECKPOINT = 'CHECKPOINT'
type CHECKPOINT = typeof CHECKPOINT
type CheckpointAction = {type: CHECKPOINT}
export const checkpoint = (): CheckpointAction => ({type: CHECKPOINT})

export type UndoableActions = UndoAction | RedoAction | CheckpointAction

export function undoable <S, A extends AnyAction = Action>(reducer: Reducer<S, A>) {

  const initialState: History<S> = {
    past: [],
    present: reducer(undefined, {} as A),
    future: []
  }

  return function (state = initialState, action: A) {
    const {past, present, future} = state

    if (action.type === UNDO) {
      const previous = past[past.length - 1]
      if (!previous) { return state }

      const newPast = past.slice(0, past.length - 1)
      return {
        past: newPast,
        present: previous,
        future: [present, ...future]
      }
    }

    if (action.type === REDO) {
      const next = future[0]
      if (!next) { return state }

      const newFuture = future.slice(1)
      return {
        past: [...past, present],
        present: next,
        future: newFuture
      }
    }

    const newPresent = reducer(present, action)

    if (action.type === INITIALIZE) {
      return {
        past: [],
        present: newPresent,
        future: []
      }
    }

    if (action.type === CHECKPOINT) {
      return {
        past: [...past, present],
        present: newPresent,
        future: []
      }
    }

    if (present === newPresent) {
      return state
    }

    return {
      past,
      present: newPresent,
      future
    }
  }
}
