import { Stack, StackCard, StackType, StackDirection } from '../lib/Card'
import { stackContainsCard, sumConsecutive, sameStack, sameCard } from '../lib/util'
import { undoable } from './undoable'
import { INITIALIZE, InitializeAction } from './init'

export const SELECT = '@@global/select-card'
export type SelectAction = { type: typeof SELECT; stack: Stack; card: StackCard }
export const selectCard = (stack: Stack, card: StackCard): SelectAction => ({ type: SELECT, card, stack })

export const DESELECT = '@@global/deselect-card'
export type DeselectAction = { type: typeof DESELECT }
export const deselectCard = (): DeselectAction => ({ type: DESELECT })

export const REVEAL_TOP = '@@global/reveal-top'
export type RevealTopCardAction = { type: typeof REVEAL_TOP; stack: Stack }
export const reveal = (stack: Stack): RevealTopCardAction => ({ type: REVEAL_TOP, stack })

export const MOVE_CARDS = '@@global/move-cards'
export type MoveCardAction = { type: typeof MOVE_CARDS; from?: Stack; to: Stack; cards: StackCard[]; hidden: boolean }

// move 3 cards from the stock to the waste
export const throwStock = (stock: Stack, waste: Stack): MoveCardAction => ({
  type: MOVE_CARDS,
  from: stock,
  to: waste,
  cards: stock.cards.slice(-3).reverse(),
  hidden: false,
})

// move all cards from waste back to the stock
export const recycleWaste = (waste: Stack, stock: Stack): MoveCardAction => ({
  type: MOVE_CARDS,
  from: waste,
  to: stock,
  cards: waste.cards.slice(0),
  hidden: true,
})

// other general moves
export const moveCards = (from: Stack, to: Stack, from_card: StackCard | null): MoveCardAction => ({
  type: MOVE_CARDS,
  from,
  to,
  cards: from.cards.slice(from.cards.findIndex((card) => card.card === from_card?.card || null)),
  hidden: false,
})

export type CardActions = SelectAction | DeselectAction | RevealTopCardAction | MoveCardAction

const reducers: {
  [key: string]: (state: StackStore, action: CardActions | InitializeAction) => StackStore
} = {
  [INITIALIZE]: (state, action: InitializeAction) => ({
    ...state,
    stacks: state.stacks.map((stack) => {
      switch (stack.type) {
        case StackType.foundation:
        case StackType.waste:
          return { ...stack, cards: [] }
        case StackType.stock:
          return { ...stack, cards: action.cards.slice(0, 24).map((card) => ({ card, hidden: true })) }
        case StackType.tableau:
          return {
            ...stack,
            cards: action.cards
              .slice(24 + sumConsecutive(stack.index), 24 + sumConsecutive(stack.index) + stack.index + 1)
              .map((card, index, a) => ({ card, hidden: a.length !== index + 1 })),
          }
      }
    }),
  }),
  [SELECT]: (state, action: SelectAction) => ({
    ...state,
    stacks: state.stacks.map((stack) =>
      sameStack(stack, action.stack) && stackContainsCard(stack.cards, action.card)
        ? {
            ...stack,
            selection: action.card,
            cards: stack.cards.map((stackCard) =>
              !sameCard(stackCard, action.card) ? stackCard : { ...stackCard, selected: true },
            ),
          }
        : stack,
    ),
  }),
  [DESELECT]: (state) => ({
    ...state,
    stacks: state.stacks.map((stack) =>
      stack.selection != null
        ? {
            ...stack,
            selection: null,
            cards: stack.cards.map((stackCard) =>
              !stackCard.selected ? stackCard : { ...stackCard, selected: false },
            ),
          }
        : stack,
    ),
  }),
  [MOVE_CARDS]: (state, action: MoveCardAction) =>
    state.stacks.some((stack) => [action.from, action.to].includes(stack))
      ? {
          ...state,
          stacks: state.stacks.map((stack) =>
            sameStack(stack, action.to)
              ? {
                  ...stack,
                  cards: [
                    ...stack.cards,
                    ...action.cards.map((card) => ({ ...card, selected: false, hidden: action.hidden })),
                  ],
                }
              : action.from && sameStack(stack, action.from)
              ? {
                  ...stack,
                  cards: stack.cards.filter((stackCard) => !stackContainsCard(action.cards, stackCard)),
                }
              : stack,
          ),
        }
      : state,
  [REVEAL_TOP]: (state, action: RevealTopCardAction) => ({
    ...state,
    stacks: state.stacks.map((stack) =>
      sameStack(stack, action.stack)
        ? {
            ...stack,
            cards: stack.cards.map((card, index) =>
              index < stack.cards.length - 1 ? card : { ...card, hidden: false },
            ),
          }
        : stack,
    ),
  }),
}

export type StackStore = {
  readonly stacks: Stack[]
}

const initialState: StackStore = {
  stacks: [
    {
      type: StackType.stock,
      direction: null,
      cards: [],
      index: 0,
      selection: null,
    },
    {
      type: StackType.waste,
      direction: StackDirection.horizontal,
      cards: [],
      index: 0,
      selection: null,
    },
    ...Array.from<number, Stack>({ length: 7 }, (_, index) => ({
      index,
      type: StackType.tableau,
      direction: StackDirection.vertical,
      cards: [],
      selection: null,
    })),
    ...Array.from<number, Stack>({ length: 4 }, (_, index) => ({
      index,
      type: StackType.foundation,
      direction: null,
      cards: [],
      selection: null,
    })),
  ],
}

const reducer = (state: StackStore = initialState, action: CardActions): StackStore => {
  const r = reducers[action.type]
  if (r) return r(state, action)
  return state
}

export default undoable(reducer)
