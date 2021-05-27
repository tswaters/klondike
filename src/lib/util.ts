import { Card, ValueType, SuitType, Stack, StackCard } from './Card'

// minstd_rand
export const rnd = (s: number) => {
  const rnd = () => ((2 ** 31 - 1) & (s = Math.imul(48271, s))) / 2 ** 31
  rnd() // first call is always junk
  return (min: number, max: number) => Math.floor(rnd() * max) + min
}

export const sumConsecutive = (i: number) => (i * (i + 1)) / 2

export const getTopCard = (stack: Stack): StackCard | null => stack.cards[stack.cards.length - 1] || null

const random = (min: number, max: number) => Math.floor(Math.random() * max) + min

export const newGameNumber = () => random(1, 9999)

// for simplicity, these routines would just use strict object comparison
// however, if doing that, any changes to the store in a thunk would invalidate variable reference
// this is useful for comparing a selected, or checking if stacks are the same before modifying them
// so, we compare both value/suit when doing card comparisons, and type/index for stack comparisons

export const sameStack = (src: Stack, dest: Stack) => src.type === dest.type && src.index === dest.index

const sameSuit = (src: Card, dest: Card) => src.suit === dest.suit

const sameValue = (src: Card, dest: Card) => src.value === dest.value

export const sameCard = (src: Card, dest: Card) => sameValue(src, dest) && sameSuit(src, dest)

export const contains = (cards: StackCard[], dest: Card): boolean => cards.some(({ card: src }) => sameCard(src, dest))

const sequential = (src: Card, dest: Card) => valueToInt(src.value) === valueToInt(dest.value) + 1

export const isRed = (card: Card) => [SuitType.diamond, SuitType.heart].includes(card.suit)

const different = (src: Card, dest: Card) => +isRed(src) ^ +isRed(dest)

export const isBig = (card: Card) =>
  [ValueType.ace, ValueType.jack, ValueType.queen, ValueType.king].includes(card.value)

export const isValidFoundationMove = (src: StackCard, dest: StackCard | null) =>
  dest == null ? src.card.value === ValueType.ace : sameSuit(src.card, dest.card) && sequential(src.card, dest.card)

export const isValidTableauMove = (src: StackCard, dest: StackCard | null) =>
  dest == null ? src.card.value === ValueType.king : sequential(dest.card, src.card) && different(src.card, dest.card)

const valueToInt = (value: ValueType): number => {
  if (value === ValueType.ace) return 1
  if (value === ValueType.jack) return 11
  if (value === ValueType.queen) return 12
  if (value === ValueType.king) return 13
  return parseInt(value, 10)
}
