import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Stack, StackCard, StackType, StackDirection } from '../lib/Card'
import { stackContainsCard, sumConsecutive, sameStack, sameCard } from '../lib/util'
import { undoable } from './undoable'
import { initialize } from './init'

export type MoveCardPayload = { from: Stack; to: Stack; cards: StackCard[]; hidden: boolean }

const stacksSlice = createSlice({
  name: 'stacks',
  initialState: {
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
        type: StackType.tableau,
        direction: StackDirection.vertical,
        cards: [],
        index,
        selection: null,
      })),
      ...Array.from<number, Stack>({ length: 4 }, (_, index) => ({
        type: StackType.foundation,
        direction: null,
        cards: [],
        index,
        selection: null,
      })),
    ],
  },
  reducers: {
    shiftCards: (state, { payload: { from, to, cards, hidden } }: PayloadAction<MoveCardPayload>) => {
      const toStack = state.stacks.find((stack) => sameStack(to, stack))
      const fromStack = state.stacks.find((stack) => sameStack(from, stack))
      if (toStack) toStack.cards.push(...cards.map((card) => ({ ...card, selected: false, hidden })))
      if (fromStack) fromStack.cards = fromStack.cards.filter((stackCard) => !stackContainsCard(cards, stackCard))
    },
    revealTop: (state, { payload }: PayloadAction<Stack>) => {
      const thisStack = state.stacks.find((stack) => sameStack(stack, payload))
      if (thisStack) {
        const topCard = thisStack.cards[thisStack.cards.length - 1]
        if (topCard) topCard.hidden = false
      }
    },
    selectCard: (state, { payload }: PayloadAction<{ stack: Stack; stackCard: StackCard }>) => {
      const thisStack = state.stacks.find((stack) => sameStack(stack, payload.stack))
      if (thisStack) {
        thisStack.selection = payload.stackCard
        const thisCard = thisStack.cards.find((stackCard) => sameCard(stackCard, payload.stackCard))
        if (thisCard) thisCard.selected = true
      }
    },
    deselectCard: (state) => {
      const thisStack = state.stacks.find((stack) => stack.selection != null)
      if (thisStack) {
        thisStack.selection = null
        const selectedCard = thisStack.cards.find((stackCard) => stackCard.selected)
        if (selectedCard) selectedCard.selected = false
      }
    },
  },
  extraReducers: (builder) =>
    builder.addCase(initialize, (state, { payload }) => {
      state.stacks = state.stacks.map((stack) => {
        switch (stack.type) {
          case StackType.foundation:
          case StackType.waste:
            return { ...stack, cards: [] }
          case StackType.stock:
            return { ...stack, cards: payload.cards.slice(0, 24).map((card) => ({ card, hidden: true })) }
          case StackType.tableau:
            return {
              ...stack,
              cards: payload.cards
                .slice(24 + sumConsecutive(stack.index), 24 + sumConsecutive(stack.index) + stack.index + 1)
                .map((card, index, a) => ({ card, hidden: a.length !== index + 1 })),
            }
        }
      })
    }),
})

export const { selectCard, deselectCard, revealTop, shiftCards } = stacksSlice.actions

export const moveCards = (from: Stack, to: Stack, from_card: StackCard | null) =>
  shiftCards({
    from,
    to,
    cards: from.cards.slice(from.cards.findIndex((card) => from_card && sameCard(card, from_card))),
    hidden: false,
  })

export const drawStockCards = ({ stock, waste }: { stock: Stack; waste: Stack }) =>
  shiftCards({ from: stock, to: waste, cards: stock.cards.slice(-3).reverse(), hidden: false })

export const recycleWaste = ({ stock, waste }: { stock: Stack; waste: Stack }) =>
  shiftCards({ from: waste, to: stock, cards: waste.cards.slice(0).reverse(), hidden: true })

export default undoable(stacksSlice.reducer)
