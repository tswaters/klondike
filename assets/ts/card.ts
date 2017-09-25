
import {values, suits, datum} from './data'
import Deck from './deck'

const width = 75
const height = 97

const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')

canvas.width = width
canvas.height = height

function getDataUri (card: HTMLElement): string {

  ctx.clearRect(0, 0, width, height)
  ctx.fillStyle = ['heart', 'diamond'].indexOf(card.dataset['suit']) > -1 ? 'red' : 'black'

  const value = values.find(value => value.name === card.dataset['value'])
  const suit = suits.find(value => value.name === card.dataset['suit'])

  drawCorners(value, suit)
  drawMiddle(value, suit)
  return canvas.toDataURL()

  function drawCorners (value: datum, suit: datum) {
    const valueX = 9
    const valueY = 2
    const suitX = 9
    const suitY = 12
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'

    ctx.font = 'bold 1.5em sans-serif'
    ctx.fillText(value.label, valueX, valueY)

    ctx.font = '2.0em sans-serif'
    ctx.fillText(suit.label, suitX, suitY)

    ctx.save()

    ctx.translate(width, height)
    ctx.rotate(180 * Math.PI / 180)

    ctx.font = 'bold 1.5em sans-serif'
    ctx.fillText(value.label, valueX, valueY)

    ctx.font = '2.0em sans-serif'
    ctx.fillText(suit.label, suitX, suitY)

    ctx.restore()
  }

  function drawMiddle (value: datum, suit: datum) {
    let left = 0
    let top = 0

    const heightGutter = 0
    const colHeight = height / 6

    const xStarts = [
      width * 0.25,
      width * 0.50,
      width * 0.75
    ]

    const yStarts = [
      height * 0.2,
      height * 0.3,
      height * 0.4,
      height * 0.5
    ]

    let fontSize = ['ace', 'jack', 'queen', 'king'].indexOf(value.name) > -1 ? '4.0em' : '2.0em'
    ctx.textBaseline = 'middle'

    for (const {x, y} of value.positions) {
      left = xStarts[x]
      top = yStarts[y > 3 ? 6 - y : y]
      ctx.textAlign = x === 0 ? 'left' : x === 1 ? 'center' : x === 2 ? 'right' : null

      if (y > 3) {
        ctx.save()
        ctx.translate(width, height)
        ctx.rotate(Math.PI)
      }

      ctx.font = `${fontSize} sans-serif`
      ctx.fillText(suit.label, left, top)

      if (y > 3) {
        ctx.restore()
      }
    }
  }
}

export default class Card {

  isEmpty: boolean

  value: datum

  suit: datum

  selector: string

  cardId: string

  constructor (value: datum = null, suit: datum = null, empty = false) {
    this.isEmpty = empty
    this.value = value
    this.suit = suit
    this.cardId = Math.random().toString().substr(2)
    this.selector = `span.card[data-card-id="${this.cardId}"]`
  }

  static DomToCard (node: HTMLSpanElement) {
    const isEmptyStack = node.classList.contains('stack') && node.childNodes.length === 0
    const value = values.find(datum => datum.name === node.dataset['value'])
    const suit = suits.find(datum => datum.name === node.dataset['suit'])
    return new Card(value, suit, isEmptyStack)
  }

  get index () {
    return Deck.index(this)
  }

  get isRed () {
    return ['heart', 'diamond'].indexOf(this.suit.name) > -1
  }

  get isBlack () {
    return ['club', 'spade'].indexOf(this.suit.name) > -1
  }

  get element (): HTMLSpanElement {

    let card = <HTMLElement>document.querySelector(this.selector)
    if (card && !card.classList.contains('blank')) {
      return card
    }

    card = document.createElement('span')
    card.classList.add('card')
    card.dataset['cardId'] = this.cardId

    if (this.suit && this.value) {
      card.dataset['suit'] = this.suit.name
      card.dataset['value'] = this.value.name
      card.style.backgroundImage = `url(${getDataUri(card)})`
    }
    else {
      card.classList.add('blank')
    }

    return card
  }

}
