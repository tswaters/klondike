import { StackType } from '../lib/Stack'
import { undoable } from './undoable'
import {
  GlobalActions,
  INITIALIZE,
  SELECT_CARD,
  DESELECT_CARD,
  MOVE_CARDS,
  APPEND_CARDS,
  selectCard,
  deselectCard,
  appendCards,
  StackLike,
  MoveCardAction
} from './globals'
import { move_cards } from '../lib/util'

export type WasteStore = StackLike & {
  readonly showing: number
}

const initialState: WasteStore = {
  stacks: [{ type: StackType.waste, cards: [] }],
  showing: 0
}

const reducers: {
  [key: string]: (state: WasteStore, action: GlobalActions) => WasteStore
} = {
  [INITIALIZE]: () => ({ ...initialState }),
  [SELECT_CARD]: selectCard,
  [DESELECT_CARD]: deselectCard,
  [MOVE_CARDS]: (state, action: MoveCardAction) =>
    state.stacks.some(stack => [action.from, action.to].indexOf(stack) > -1)
      ? {
          ...state,
          showing:
            action.to === state.stacks[0]
              ? Math.min(state.stacks[0].cards.length + action.cards.length, 3)
              : Math.max(1, state.showing - 1),
          stacks: move_cards(state.stacks, action)
        }
      : state,
  [APPEND_CARDS]: appendCards
}

const wasteReducer = (
  state: WasteStore = initialState,
  action: GlobalActions
): WasteStore => {
  const reducer = reducers[action.type]
  if (reducer != null) {
    return reducer(state, action)
  }
  return state
}

export default undoable(wasteReducer)
