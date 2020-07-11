import { Stack, StackCard, StackType, Card } from '../lib/Card'
import { contains, sumConsecutive } from '../lib/util'
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

export const APPEND = '@@global/append-cards'
export type AppendCardAction = { type: typeof APPEND; stack: Stack; cards: StackCard[] }
export const appendCards = (stack: Stack, cards: StackCard[]): AppendCardAction => ({ type: APPEND, cards, stack })

export const MOVE_CARDS = '@@global/move-cards'
export type MoveCardAction = { type: typeof MOVE_CARDS; from?: Stack; to: Stack; cards: StackCard[]; hidden: boolean }

export const throwStock = (stock: Stack, waste: Stack): MoveCardAction => ({
  type: MOVE_CARDS,
  from: stock,
  to: waste,
  cards: stock.cards.slice(-3).reverse(),
  hidden: false,
})

export const recycleWaste = (waste: Stack, stock: Stack): MoveCardAction => ({
  type: MOVE_CARDS,
  from: waste,
  to: stock,
  cards: waste.cards.slice(0),
  hidden: true,
})

export const moveCards = (from: Stack, to: Stack, from_card: Card | null = null): MoveCardAction => ({
  type: MOVE_CARDS,
  from,
  to,
  cards: from.cards.slice(from.cards.findIndex((card) => card.card === from_card)),
  hidden: false,
})

export type CardActions = SelectAction | DeselectAction | RevealTopCardAction | AppendCardAction | MoveCardAction

const reducers: {
  [key: string]: (state: StackStore, action: CardActions | InitializeAction) => StackStore
} = {
  [INITIALIZE]: (state, action: InitializeAction) => ({
    ...state,
    stacks: state.stacks.map((stack) => {
      if (stack.type === StackType.foundation || stack.type === StackType.waste) {
        return { ...stack, cards: [] }
      }
      if (stack.type === StackType.stock) {
        return { ...stack, cards: action.cards.slice(0, 24).map((card) => ({ card, hidden: true })) }
      }
      if (stack.type === StackType.tableau) {
        return {
          ...stack,
          cards: action.cards
            .slice(24 + sumConsecutive(stack.index), 24 + sumConsecutive(stack.index) + stack.index + 1)
            .map((card, index, a) => ({ card, hidden: a.length !== index + 1 })),
        }
      }
      return stack
    }),
  }),
  [SELECT]: (state, action: SelectAction) => ({
    ...state,
    stacks: state.stacks.map((stack) =>
      stack === action.stack && contains(stack, action.card.card)
        ? {
            ...stack,
            selection: action.card.card,
            cards: stack.cards.map((stackCard) =>
              !stackCard.card || stackCard.card !== action.card.card ? stackCard : { ...stackCard, selected: true },
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
  [APPEND]: (state, action: AppendCardAction) => ({
    ...state,
    stacks: state.stacks.map((stack) =>
      stack === action.stack
        ? {
            ...stack,
            cards: [...stack.cards, ...action.cards],
          }
        : stack,
    ),
  }),
  [MOVE_CARDS]: (state, action: MoveCardAction) =>
    state.stacks.some((stack) => [action.from, action.to].includes(stack))
      ? {
          ...state,
          stacks: state.stacks.map((stack) =>
            stack === action.to
              ? {
                  ...stack,
                  cards: [
                    ...stack.cards,
                    ...action.cards.map((card) => ({ ...card, selected: false, hidden: action.hidden })),
                  ],
                }
              : stack === action.from
              ? {
                  ...stack,
                  cards: stack.cards.filter((stackCard) => !action.cards.includes(stackCard)),
                }
              : stack,
          ),
        }
      : state,
  [REVEAL_TOP]: (state, action: RevealTopCardAction) => ({
    ...state,
    stacks: state.stacks.map((stack) =>
      stack === action.stack
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
      cards: [],
      index: 0,
      selection: null,
    },
    {
      type: StackType.waste,
      cards: [],
      index: 0,
      selection: null,
    },
    ...Array.from<number, Stack>({ length: 7 }, (_, index) => ({
      index,
      type: StackType.tableau,
      cards: [],
      selection: null,
    })),
    ...Array.from<number, Stack>({ length: 4 }, (_, index) => ({
      index,
      type: StackType.foundation,
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
