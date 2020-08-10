import { createAction } from '@reduxjs/toolkit'
import { Reducer, AnyAction } from 'redux'

type History<State> = {
  past: State[]
  present: State
  future: State[]
}

export const destroy = createAction('destroy')
export const undo = createAction('undo')
export const redo = createAction('redo')
export const checkpoint = createAction('checkpoint')

export const undoable = <S, A extends AnyAction>(reducer: Reducer<S, A>) => {
  const initialState: History<S> = {
    past: [],
    present: reducer(void 0, {} as A),
    future: [],
  }

  return (state = initialState, action: A) => {
    const { past, present, future } = state

    if (undo.match(action)) {
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

    if (redo.match(action)) {
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

    if (destroy.match(action)) {
      return {
        past: [],
        present: newPresent,
        future: [],
      }
    }

    if (checkpoint.match(action)) {
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
