import { Card, ValueType, SuitType, Stack, StackCard } from './Card'

// minstd_rand
export const rnd = (s: number) => {
  const rnd = () => ((2 ** 31 - 1) & (s = Math.imul(48271, s))) / 2 ** 31
  rnd() // first call is always junk
  return (min: number, max: number) => Math.floor(rnd() * max) + min
}

export const sumConsecutive = (i: number) => (i * (i + 1)) / 2

export const getTopCard = (stack: Stack): StackCard | null => stack.cards[stack.cards.length - 1] || null

export const random = (min: number, max: number): number => Math.floor(Math.random() * max) + min

// for simplicity, these routines would just use strict object comparison
// however, if doing that, any changes to the store in a thunk would invalidate variable reference
// this is useful for comparing a selected, or checking if stacks are the same before modifying them
// so, we compare both value/suit when doing card comparisons, and type/index for stack comparisons

export const sameStack = (stack1: Stack, stack2: Stack) => stack1.type === stack2.type && stack1.index === stack2.index

export const sameCard = (stackCard1: StackCard, stackCard2: StackCard) =>
  stackCard1.card.value === stackCard2.card.value && stackCard1.card.suit === stackCard2.card.suit

export const stackContainsCard = (stackCards: StackCard[], stackCard: StackCard) =>
  stackCards.some((item: StackCard) => sameCard(item, stackCard))

export const isSequential = (card: Card, card1: Card) => valueToInt(card1.value) + 1 === valueToInt(card.value)

export const isRed = (card: Card) => [SuitType.diamond, SuitType.heart].includes(card.suit)

export const isDifferentColor = (src: Card, dest: Card) => +isRed(src) ^ +isRed(dest)

export const isBig = (card: Card) =>
  [ValueType.ace, ValueType.jack, ValueType.queen, ValueType.king].includes(card.value)

export const isValidFoundationMove = (stackCard: StackCard, desintation: StackCard | null) =>
  desintation == null
    ? stackCard.card.value === ValueType.ace
    : desintation.card.suit === stackCard.card.suit && isSequential(stackCard.card, desintation.card)

export const isValidTableauMove = (stackCard: StackCard, destination: StackCard | null) =>
  destination == null
    ? stackCard.card.value === ValueType.king
    : isSequential(destination.card, stackCard.card) && isDifferentColor(stackCard.card, destination.card)

const valueToInt = (value: ValueType): number => {
  if (value === ValueType.ace) return 1
  if (value === ValueType.jack) return 11
  if (value === ValueType.queen) return 12
  if (value === ValueType.king) return 13
  return parseInt(value, 10)
}
