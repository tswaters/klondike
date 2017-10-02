
import Deck from './deck'
import Card from './card'
import {addListener, removeListeners} from './util'

export default class Klondike {

  /**
   * Event listeners that have been attached
   */
  listeners: Function[] = []

  /**
   * currently selected card
   */
  selectedCard: HTMLElement

  /**
   * reference to the deck
   */
  deck: Deck

  /**
   * keeps track of the number of blank cards left to be drawn (24 initially)
   */
  wasteCards: number

  /**
   * Keeps track of cards that are beneath #stack
   */
  waste: Card[]

  /**
   * Cards that have been brought into play from the waste
   */
  discards: Card[]

  constructor () {
    this.deck = new Deck()
    this.initialize()
  }

  async initialize (): Promise<void> {
    this.waste = []
    this.discards = []
    this.wasteCards = 24

    const container = document.getElementById('container')
    this.listeners.push(addListener(container, 'click', this.container_onClick.bind(this), true))
    this.listeners.push(addListener(container, 'dblclick', this.container_onDblClick.bind(this), true))

    const stock = document.getElementById('stock')
    this.listeners.push(addListener(stock, 'click', this.drawCards.bind(this), true))
    stock.appendChild(new Card().element)

    for (let i = 0; i <= 6; i++) {
      const stack = document.getElementById(`tableau-${i + 1}`)
      const card = await this.deck.getCard()
      for (let j = 0; j < i; j++) {
          stack.appendChild(new Card().element)
      }
      stack.appendChild(card.element)
    }
  }

  /**
   * Called once all cards have been placed in the win stack
   * - Remove event handlers attached in initialize
   * - show the fireworks!
   */
  finish () {
    removeListeners(this.listeners)
  }

  /**
   * Click handler for #stack - this draws three cards or cycles elements in the waste
   */
  async drawCards (e: MouseEvent) {
    const node = <HTMLElement>e.target
    const waste = document.getElementById('waste')
    const stock = document.getElementById('stock')

    // make sure selected card is blanked
    this.selectedCard = null

    // the stack is empty, user has clicked the stack.
    // remove elements from waste, recycle waste from discards and re-add the blank card to #stack

    if (node === stock) {

      while (waste.childNodes.length > 0) {
        const removed = <HTMLElement>waste.removeChild(waste.firstChild)
        this.discards.push(Card.DomToCard(removed))
      }

      while (this.discards.length > 0) {
        this.waste.push(this.discards.shift())
      }

      node.appendChild(new Card().element)

      return
    }

    const cards: Card[] = []

    if (this.wasteCards > 0) {
      this.wasteCards -= 3
      cards.push(await this.deck.getCard())
      cards.push(await this.deck.getCard())
      cards.push(await this.deck.getCard())
    } else {
      while (this.waste.length > 0 && cards.length !== 3) {
        cards.push(this.waste.shift())
      }
    }

    // remove existing #waste cards, add to discards waste

    while (waste.firstChild) {
      const removed = <HTMLSpanElement>waste.removeChild(waste.firstChild)
      this.discards.push(Card.DomToCard(removed))
    }

    // add the new waste cards to #waste

    while (cards.length > 0) {
      waste.appendChild(cards.shift().element)
    }

    // if no more cards to draw and waste is empty, we've reached the end
    // show #stack as empty (remove the one blank card)

    if (this.waste.length === 0 && this.wasteCards === 0) {
      stock.removeChild(stock.firstChild)
    }
  }

  /**
   * Click handler for the container - this uses capture, so target is the top-most element
   * @param {MouseEvent} e event object
   */
  async container_onClick (e: MouseEvent): Promise<void> {
    const node = <HTMLElement>e.target

    // no card is selected and this is a selectable card
    // add the selected class, save selectedCard and exit.

    if (!this.selectedCard && Klondike.selectable(node)) {
      node.classList.add('selected')
      this.selectedCard = node
      return
    }

    // node already has selected class; user is toggling selected
    // remove the class, clear out selectedCard and exit.

    if (node.classList.contains('selected')) {
      node.classList.remove('selected')
      this.selectedCard = null
      return
    }

    // this is a blank card and there is no next sibling
    // draw a card, replace blank card with it & exit out.
    // (except if parent is #stack - this is handled separately)

    if (node.parentElement.id !== 'stock' && node.classList.contains('blank') && !node.nextSibling) {
      const card = await this.deck.getCard()
      node.parentElement.replaceChild(card.element, node)
      return
    }

    // we have a selected card, and the card user clicked can be moved
    // perform the move operation.

    if (this.selectedCard && Klondike.movable(this.selectedCard, node)) {
      this.move(this.selectedCard, node)
    }

  }

  /**
   * Double click handler for the container
   * If this card can be moved up, move it to the appropriate win stack
   */
  container_onDblClick (e: MouseEvent): void {
    const node = <HTMLElement>e.target

    if (['blank', 'stack'].some(c => node.classList.contains(c))) {
      return
    }

    // don't attempt to move up cards that are already up
    if (node.parentElement.classList.contains('foundation')) {
      return
    }

    // can only move up the last card in a stack
    if (node.nextSibling) {
      return
    }

    const card = Card.DomToCard(node)
    const query = `.foundation${card.value.name === 'ace' ? ':empty' : `[data-suit="${card.suit.name}"]`}`

    const winSpot = <HTMLElement>document.querySelector(query)
    if (!winSpot && card.value.name !== 'ace') { return }
    else if (card.value.name === 'ace') { winSpot.dataset['suit'] = card.suit.name }

    const target = <HTMLElement>(card.value.name === 'ace' ? winSpot : winSpot.lastChild)

    if (Klondike.movable(node, target)) {
      this.move(node, target)
    }

  }

  /**
   * Moves a card from one position to another.
   * - this function is guarded by return value of `movable` and does no checks.
   * - involves changing the parent of `card` to parent of `target`
   * - if it's the last card in the #waste show last card in waste
   * - if there are cards on top of this one, ensure they are all moved
   */
  move (card: HTMLElement, target: HTMLElement): void {

    const oldParent = card.parentElement
    let targetParent = target.parentElement

    // special case, target is a stack, not a card
    if (target.classList.contains('stack')) {
      targetParent = target
    }

    const cardAbove = card.previousSibling
    const coalMine = <HTMLElement>(cardAbove ? cardAbove : oldParent)
    const canary: string = cardAbove ? 'nextSibling' : 'firstChild'

    while ((<any>coalMine)[canary]) {
      targetParent.appendChild((<any>coalMine)[canary])
    }

    card.classList.remove('selected')
    this.selectedCard = null

    // when the waste is empty, attempt to show the card beneath
    // this might not be present, but if it is, show it.

    if (parent.id === 'waste' && oldParent.childNodes.length === 0) {
      const wasteCard = this.discards.pop()
      if (wasteCard) {
        parent.appendChild(wasteCard.element)
      }
    }

  }

  /**
   * Returns whether or not a card can be selected
   * - can't be a blank card
   * - can only be the top-most card under #waste
   * - can't be an empty stack
   * @param {HTMLElement} element card dom node
   */
  static selectable (element: HTMLElement): boolean {

    // if .blank, can't be selected
    if (element.classList.contains('blank')) {
      return false
    }

    // if parent is #waste, can only be top card
    if (element.parentElement.id === 'waste' && element.nextSibling) {
      return false
    }

    // can't be a stack
    if (element.classList.contains('stack')) {
      return false
    }

    return true

  }

  /**
   * Returns whether a card can be moved to a target location
   * @param {HTMLElement} cardDom - the card that is being moved
   * @param {HTMLElement} target - where the card is moving (either .card or .stack)
   */
  static movable (cardDom: HTMLElement, target: HTMLElement): boolean {
    const card1: Card = Card.DomToCard(cardDom)
    const card2: Card = Card.DomToCard(target)

    const targetIsPlayStack = target.classList.contains('tableau')
    const targetIsWinStack = target.classList.contains('foundation')

    const targetParentIsPlayStack = target.parentElement.classList.contains('tableau')
    const targetParentIsWinStack = target.parentElement.classList.contains('foundation')

    // moving a card to a parent is OK if the number is sequential and cards have opposite colors
    const isValidPlayMove = card1.index + 1 === card2.index && (card1.isRed && card2.isBlack || card1.isBlack && card2.isRed)

    // moving to the win stack is OK if suit is the same, and index is sequential
    const isValidWinMove = card2.suit === card1.suit && card1.index === card2.index + 1

    // moving a king to an empty spot is OK (assuming this is a tableau)
    if (targetIsPlayStack && card1.value.name === 'king') { return true }

    // moving an ace to an empty foundation is OK
    if (targetIsWinStack && card1.value.name === 'ace') { return true }

    // a play move is considered OK when the parent stack is a play stack
    if (targetParentIsPlayStack && isValidPlayMove) { return true }

    // a win move is considered OK when the parent stack is a win stack
    if (targetParentIsWinStack && isValidWinMove) { return true }

    return false
  }

}
