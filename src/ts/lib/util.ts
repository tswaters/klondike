import { Card, ValueType } from './Card'
import { Stack, StackCard } from './Stack'
import {
  MoveCardAction,
  AppendCardAction,
  SelectAction,
} from '../redux/globals'

export const random = (min: number, max: number): number =>
  Math.floor(Math.random() * max) + min

const contains = (stack: Stack, card: Card) =>
  stack.cards.some((item: StackCard) => item.card === card)

export const get_top_card = (stack: Stack): StackCard | null =>
  stack.cards[stack.cards.length - 1]

type Selection = { card: Card; stack: Stack } | null

export const get_selection = (stacks: Stack[]): Selection => {
  for (let i = 0; i < stacks.length; i++) {
    const stack = stacks[i]
    if (stack.selection == null) {
      continue
    }
    return { card: stack.selection, stack }
  }
  return null
}

export const select_card = (
  stacks: Stack[],
  { card: stackCard }: SelectAction
) => {
  const card = stackCard.card
  if (card == null) {
    return stacks
  }
  return stacks.map((stack) => {
    if (!contains(stack, card)) {
      return stack
    }

    return {
      ...stack,
      cards: stack.cards.map((stackCard) => {
        if (!stackCard.card) {
          return stackCard
        }
        if (stackCard.card !== card) {
          return stackCard
        }
        return { ...stackCard, selected: true }
      }),
      selection: card,
    }
  })
}

export const deselect_card = (stacks: Stack[]) =>
  stacks.map((stack) => {
    if (!stack.selection) {
      return stack
    }
    return {
      ...stack,
      selection: void 0,
      cards: stack.cards.map((card) =>
        !card.selected ? card : { ...card, selected: void 0 }
      ),
    }
  })

export const move_cards = (
  stacks: Stack[],
  { from, to, cards, hidden }: MoveCardAction
) =>
  stacks.map((stack) => {
    if (stack === to) {
      return {
        ...stack,
        cards: [
          ...stack.cards,
          ...cards.map((card) => ({ ...card, selected: false, hidden })),
        ],
      }
    }
    if (stack === from) {
      return {
        ...stack,
        cards: stack.cards.filter((stackCard) => !cards.includes(stackCard)),
      }
    }
    return stack
  })

export const append_cards = (
  stacks: Stack[],
  { stack, cards }: AppendCardAction
) =>
  stacks.map((existingStack) =>
    existingStack !== stack
      ? existingStack
      : {
          ...existingStack,
          cards: [...existingStack.cards, ...cards],
        }
  )

export const movable_to_foundation = (card1: Card, card2: StackCard | null) => {
  if (card2 == null) {
    return card1.value === ValueType.ace
  }

  const { card } = card2
  if (!card) {
    return false
  }

  return (
    valueToInt(card1.value) === valueToInt(card.value) + 1 &&
    card1.suit === card.suit
  )
}

export const movable_to_tableau = (card1: Card, card2?: StackCard | null) => {
  if (card2 == null) {
    return card1.value === ValueType.king
  }

  const { card } = card2
  if (!card) {
    return false
  }

  return (
    (valueToInt(card1.value) + 1 === valueToInt(card.value) &&
      card1.isRed &&
      card.isBlack) ||
    (card1.isBlack && card.isRed)
  )
}

const valueToInt = (value: ValueType): number => {
  if (value === ValueType.ace) {
    return 1
  }
  if (value === ValueType.jack) {
    return 11
  }
  if (value === ValueType.queen) {
    return 12
  }
  if (value === ValueType.king) {
    return 13
  }
  return parseInt(value, 10)
}
