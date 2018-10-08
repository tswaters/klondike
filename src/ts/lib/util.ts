
import {Card, ValueType} from './Card'
import {Stack, StackCard} from './Stack'

export const random = (min: number, max: number): number => {
  return Math.floor(Math.random() * max) + min
}

function contains (stack: Stack, card: Card) {
  return stack.cards.some((item: StackCard) => !!item.card && item.card === card)
}

export function get_top_card (stack: Stack): StackCard | null {
  return stack.cards[stack.cards.length - 1]
}

export function get_selection (stacks: Stack[]): {card: Card, stack: Stack} | null {
  for (let i = 0; i < stacks.length; i++) {
    const stack = stacks[i]
    if (stack.selection == null) { continue }
    return {card: stack.selection, stack}
  }
  return null
}

export function select_card (stacks: Stack[], stackCard: StackCard): Stack[] {
  const card = stackCard.card
  if (card == null) { return stacks }
  return stacks.map(stack => {

    if (!contains(stack, card)) { return stack }

    return {
      ...stack,
      cards: stack.cards.map(stackCard => {
        if (!stackCard.card) { return stackCard }
        if (stackCard.card !== card) { return stackCard }
        return {...stackCard, selected: true}
      }),
      selection: card
    }

  })
}

export function deselect_card (stacks: Stack[]): Stack[] {
  return stacks.map(stack => {
    if (!stack.selection) { return stack }
    return {
      ...stack,
      selection: void 0,
      cards: stack.cards.map(card => !card.selected ? card : {...card, selected: void 0})
    }
  })
}

export function move_cards (stacks: Stack[], from: Stack | null, to: Stack, cards: StackCard[]): Stack[] {
  return stacks.map(stack => {
    if (stack === to) {
      return {
        ...stack,
        cards: [
          ...stack.cards,
          ...cards.map(card => ({ ...card, selected: false }) )
        ]
      }
    }
    if (stack === from) {
      return {
        ...stack,
        cards: stack.cards.filter(stackCard => cards.indexOf(stackCard) === -1)
      }
    }
    return stack
  })
}

export function append_cards (stacks: Stack[], to: Stack, cards: Card[]) {
  return stacks.map(stack => {
    if (stack !== to) {
      return stack
    }
    return {
      ...stack,
      cards: [
        ...stack.cards,
        ...cards.map(card => ({card}))
      ]
    }
  })
}

export function movable_to_foundation (card1: Card, card2?: StackCard | null) {

  if (card2 == null) {
    return card1.value === ValueType.ace
  }

  const {card} = card2
  if (!card) { return false }

  return (
    valueToInt(card1.value) === valueToInt(card.value) + 1 &&
    card1.suit === card.suit
  )
}

export function movable_to_tableau (card1: Card, card2?: StackCard | null) {

  if (card2 == null) {
    return card1.value === ValueType.king
  }

  const {card} = card2
  if (!card) { return false }

  return (
    valueToInt(card1.value) + 1 === valueToInt(card.value) &&
    card1.isRed && card.isBlack || card1.isBlack && card.isRed
  )
}

function valueToInt (value: ValueType): number {
  if (value === ValueType.ace) { return 1 }
  if (value === ValueType.jack) { return 11 }
  if (value === ValueType.queen) { return 12 }
  if (value === ValueType.king) { return 13 }
  return parseInt(value)
}
