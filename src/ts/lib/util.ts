import { Card, ValueType, SuitType, Stack, StackCard } from './Card'
import { MoveCardAction, AppendCardAction, SelectAction } from '../redux/globals'

export const random = (min: number, max: number): number => Math.floor(Math.random() * max) + min

const contains = (stack: Stack, card: Card) => stack.cards.some((item: StackCard) => item.card === card)

export const get_top_card = (stack: Stack): StackCard | null => stack.cards[stack.cards.length - 1]

type Selection = { card: Card; stack: Stack } | null

export const get_selection = (stacks: Stack[]): Selection => {
  for (const stack of stacks) {
    if (stack.selection) return { card: stack.selection, stack }
  }
  return null
}

export const select_card = (stacks: Stack[], { card: { card } }: SelectAction) =>
  card == null
    ? stacks
    : stacks.map((stack) =>
        !contains(stack, card)
          ? stack
          : {
              ...stack,
              cards: stack.cards.map((stackCard) =>
                !stackCard.card || stackCard.card !== card ? stackCard : { ...stackCard, selected: true },
              ),
              selection: card,
            },
      )

export const deselect_card = (stacks: Stack[]) =>
  stacks.map((stack) =>
    !stack.selection
      ? stack
      : {
          ...stack,
          selection: null,
          cards: stack.cards.map((stackCard) => (!stackCard.selected ? stackCard : { ...stackCard, selected: null })),
        },
  )

export const move_cards = (stacks: Stack[], { from, to, cards, hidden }: MoveCardAction) =>
  stacks.map((stack) =>
    stack === to
      ? {
          ...stack,
          cards: [...stack.cards, ...cards.map((card) => ({ ...card, selected: false, hidden }))],
        }
      : stack === from
      ? {
          ...stack,
          cards: stack.cards.filter((stackCard) => !cards.includes(stackCard)),
        }
      : stack,
  )

export const append_cards = (stacks: Stack[], { stack, cards }: AppendCardAction) =>
  stacks.map((existingStack) =>
    existingStack !== stack
      ? existingStack
      : {
          ...existingStack,
          cards: [...existingStack.cards, ...cards],
        },
  )

export const movable_to_foundation = (card1: Card, card2: StackCard | null) => {
  if (card2 == null) {
    return card1.value === ValueType.ace
  }

  const { card } = card2
  if (!card) {
    return false
  }

  return valueToInt(card1.value) === valueToInt(card.value) + 1 && card1.suit === card.suit
}

export const movable_to_tableau = (source: Card, target?: StackCard) => {
  return target == null
    ? source.value === ValueType.king
    : target.card == null
    ? false
    : isSequential(target.card, source) &&
      ((isRed(source) && isBlack(target.card)) || (isBlack(source) && isRed(target.card)))
}

export const isSequential = (card: Card, card1: Card) => valueToInt(card1.value) + 1 === valueToInt(card.value)

export const isRed = (card: Card) => [SuitType.diamond, SuitType.heart].includes(card.suit)

export const isBlack = (card: Card) => [SuitType.club, SuitType.spade].includes(card.suit)

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
