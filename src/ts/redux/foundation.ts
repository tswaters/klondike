import {
  INITIALIZE,
  GlobalActions,
  SELECT_CARD,
  DESELECT_CARD,
  MOVE_CARDS,
  selectCard,
  deselectCard,
  moveCards,
  StackLike,
} from './globals'
import { StackType } from '../lib/Card'
import { undoable } from './undoable'

export type FoundationStore = StackLike

const initialState: FoundationStore = {
  stacks: [
    { type: StackType.foundation, cards: [], index: 0 },
    { type: StackType.foundation, cards: [], index: 1 },
    { type: StackType.foundation, cards: [], index: 2 },
    { type: StackType.foundation, cards: [], index: 3 },
  ],
}

const reducers: {
  [key: string]: (state: FoundationStore, action: GlobalActions) => FoundationStore
} = {
  [INITIALIZE]: () => ({ ...initialState }),
  [SELECT_CARD]: selectCard,
  [DESELECT_CARD]: deselectCard,
  [MOVE_CARDS]: moveCards,
}

const foundationReducer = (state: FoundationStore = initialState, action: GlobalActions): FoundationStore => {
  const reducer = reducers[action.type]
  if (reducer != null) {
    return reducer(state, action)
  }
  return state
}

export default undoable(foundationReducer)
