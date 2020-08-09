import { Reducer, AnyAction } from 'redux'

export type History<State> = {
  past: State[]
  present: State
  future: State[]
}

const DESTROY = '@@undoable/destroy'
export type DestroyAction = { type: typeof DESTROY }
export const destroy = (): DestroyAction => ({ type: DESTROY })

const UNDO = '@@undoable/undo'
type UndoAction = { type: typeof UNDO }
export const undo = (): UndoAction => ({ type: UNDO })

const REDO = '@@undoable/redo'
type RedoAction = { type: typeof REDO }
export const redo = (): RedoAction => ({ type: REDO })

const CHECKPOINT = '@@undoable/checkpoint'
type CheckpointAction = { type: typeof CHECKPOINT }
export const checkpoint = (): CheckpointAction => ({ type: CHECKPOINT })

export type UndoableActions = DestroyAction | UndoAction | RedoAction | CheckpointAction

export const undoable = <S, A extends AnyAction = UndoableActions>(reducer: Reducer<S, A>) => {
  const initialState: History<S> = {
    past: [],
    present: reducer(void 0, {} as A),
    future: [],
  }

  return (state = initialState, action: A) => {
    const { past, present, future } = state

    if (action.type === UNDO) {
      const previous = past[past.length - 1]
      if (!previous) {
        return state
      }

      const newPast = past.slice(0, past.length - 1)
      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      }
    }

    if (action.type === REDO) {
      const next = future[0]
      if (!next) {
        return state
      }

      const newFuture = future.slice(1)
      return {
        past: [...past, present],
        present: next,
        future: newFuture,
      }
    }

    const newPresent = reducer(present, action)

    if (action.type === DESTROY) {
      return {
        past: [],
        present: newPresent,
        future: [],
      }
    }

    if (action.type === CHECKPOINT) {
      return {
        past: [...past, present],
        present: newPresent,
        future: [],
      }
    }

    if (present === newPresent) {
      return state
    }

    return {
      past,
      present: newPresent,
      future,
    }
  }
}
