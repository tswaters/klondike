
import {Card} from './Card'

export type StackCard = {
  card?: Card
  selected?: boolean
}

export enum StackDirection {
  horizontal = 'horizontal',
  vertical = 'vertical',
  none = ''
}

export enum StackType {
  tableau = 'tableau',
  foundation = 'foundation',
  stock = 'stock',
  waste = 'waste'
}

export type Stack = {
  cards: StackCard[],
  selection?: Card,
  type: StackType
}
