import { StackType } from '../lib/Stack'
import { undoable } from './undoable'
import {
  GlobalActions,
  INITIALIZE,
  SELECT_CARD,
  DESELECT_CARD,
  MOVE_CARDS,
  APPEND_CARDS,
  REVEAL_TOP,
  RevealTopCardAction,
  deselectCard,
  StackLike,
  moveCards,
  appendCards,
  selectCard
} from './globals'

export type TableauStore = StackLike

const initialState: TableauStore = {
  stacks: [
    { type: StackType.tableau, cards: [] },
    { type: StackType.tableau, cards: [] },
    { type: StackType.tableau, cards: [] },
    { type: StackType.tableau, cards: [] },
    { type: StackType.tableau, cards: [] },
    { type: StackType.tableau, cards: [] },
    { type: StackType.tableau, cards: [] }
  ]
}

const reducers: {
  [key: string]: (state: TableauStore, action: GlobalActions) => TableauStore
} = {
  [INITIALIZE]: () => ({ ...initialState }),
  [SELECT_CARD]: selectCard,
  [DESELECT_CARD]: deselectCard,
  [APPEND_CARDS]: appendCards,
  [MOVE_CARDS]: moveCards,
  [REVEAL_TOP]: (state, action: RevealTopCardAction) => ({
    ...state,
    stacks: state.stacks.map(stack =>
      stack === action.stack
        ? {
            ...stack,
            cards: stack.cards.map((card, index) =>
              index < stack.cards.length - 1 ? card : { ...card, hidden: false }
            )
          }
        : stack
    )
  })
}

const tableauReducer = (
  state: TableauStore = initialState,
  action: GlobalActions
): TableauStore => {
  const reducer = reducers[action.type]
  if (reducer != null) {
    return reducer(state, action)
  }
  return state
}

export default undoable(tableauReducer)
