export enum ValueType {
  ace = 'A',
  two = '2',
  three = '3',
  four = '4',
  five = '5',
  six = '6',
  seven = '7',
  eight = '8',
  nine = '9',
  ten = '10',
  jack = 'J',
  queen = 'Q',
  king = 'K',
}

export enum SuitType {
  heart = '\u2665',
  diamond = '\u2666',
  spade = '\u2660',
  club = '\u2663',
}

export type Card = {
  suit: SuitType
  value: ValueType
}

export type StackCard = {
  card: Card
  hidden?: boolean
  selected?: boolean
}

export enum StackDirection {
  horizontal = 'horizontal',
  vertical = 'vertical',
}

//
//  1 2   3 3 3 3
//  4 4 4 4 4 4 4
//
// 1 - stock
// 2 - waste
// 3 - foundation
// 4 - tableau
//

export enum StackType {
  tableau = 'tableau',
  foundation = 'foundation',
  stock = 'stock',
  waste = 'waste',
}

export type Stack = {
  cards: StackCard[]
  selection?: Card
  type: StackType
  index: number
}

const Cards: Card[] = []

for (const value of Object.values(ValueType)) {
  for (const suit of Object.values(SuitType)) {
    Cards.push({ suit, value })
  }
}

Object.freeze(Cards)

export { Cards }
