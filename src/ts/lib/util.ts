import { Card, ValueType, SuitType, Stack, StackCard } from './Card'

// minstd_rand
export const rnd = (s: number) => {
  const rnd = () => ((2 ** 31 - 1) & (s = Math.imul(48271, s))) / 2 ** 31
  rnd() // first call is always junk
  return (min: number, max: number) => Math.floor(rnd() * (max - min + 1)) + min
}

export const sumConsecutive = (i: number) => (i * (i + 1)) / 2

export const getTopCard = (cards: StackCard[]): StackCard | null => cards[cards.length - 1]

export const random = (min: number, max: number): number => Math.floor(Math.random() * max) + min

export const contains = (stack: Stack, card: Card) => stack.cards.some((item: StackCard) => item.card === card)

export const isSequential = (card: Card, card1: Card) => valueToInt(card1.value) + 1 === valueToInt(card.value)

export const isRed = (card: Card) => [SuitType.diamond, SuitType.heart].includes(card.suit)

export const isBlack = (card: Card) => [SuitType.club, SuitType.spade].includes(card.suit)

export const isBig = (card: Card) =>
  [ValueType.ace, ValueType.jack, ValueType.queen, ValueType.king].includes(card.value) ? true : false

export const isValidMove = (card: Card, destination?: StackCard) => {
  return destination == null
    ? card.value === ValueType.king
    : isSequential(destination.card, card) &&
        ((isRed(card) && isBlack(destination.card)) || (isBlack(card) && isRed(destination.card)))
}

const valueToInt = (value: ValueType): number => {
  if (value === ValueType.ace) return 1
  if (value === ValueType.jack) return 11
  if (value === ValueType.queen) return 12
  if (value === ValueType.king) return 13
  return parseInt(value, 10)
}
