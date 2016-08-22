
namespace Program {

  const width = 65
  const height = 97

  const values: {[value: string]: string} = {
    ace: 'A',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9',
    ten: '10',
    jack: 'J',
    queen: 'Q',
    king: 'K'
  }

  const suits: {[suit: string]: string} = {
    spade: '♠',
    club: '♣',
    heart: '♥',
    diamond: '♦'
  }

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  canvas.width = width
  canvas.height = height

  function getDataUri (card: HTMLElement) {

    ctx.clearRect(0, 0, width, height)
    ctx.fillStyle = ['heart', 'diamond'].indexOf(card.dataset['suit']) > -1 ? 'red' : 'black'
    drawCorners(card.dataset['value'], card.dataset['suit'])
    drawMiddle(card.dataset['value'], card.dataset['suit'])
    return canvas.toDataURL()

    function drawCorners (value: string, suit: string) {
      ctx.textAlign = 'left'
      ctx.textBaseline = 'top'
      ctx.font = '10pt sans-serif'
      ctx.fillText(values[value], 2, 2)
      ctx.fillText(suits[suit], 2, 12)
      ctx.save()
      ctx.translate(width, height)
      ctx.rotate(180 * Math.PI / 180)
      ctx.fillText(values[value], 2, 2)
      ctx.fillText(suits[suit], 2, 12)
      ctx.restore()
    }

    function drawMiddle (value: string, suit: string) {
      let left = 0
      let top = 0
      let positions: {x: number, y: number}[] = []
      if (['ace', 'three', 'five', 'nine', 'jack', 'queen', 'king'].indexOf(value) > -1) {
        positions.push({x: 2, y: 4})
      }
      if (['two', 'three'].indexOf(value) > -1) {
        positions.push({x: 2, y: 1}, {x: 2, y: 7})
      }
      if (['four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'].indexOf(value) > -1) {
        positions.push({x: 1, y: 1}, {x: 3, y: 1}, {x: 1, y: 7}, {x: 3, y: 7})
      }
      if (['six', 'seven'].indexOf(value) > -1) {
        positions.push({x: 1, y: 4}, {x: 3, y: 4})
      }
      if (['seven', 'ten'].indexOf(value) > -1) {
        positions.push({x: 2, y: 2})
      }
      if (['eight', 'nine', 'ten'].indexOf(value) > -1) {
        positions.push({x: 1, y: 3}, {x: 3, y: 3}, {x: 1, y: 5}, {x: 3, y: 5})
      }
      if (value === 'ten') {
        positions.push({x: 2, y: 6})
      }
      let fontSize = ['ace', 'jack', 'queen', 'king'].indexOf(value) > -1 ? '48pt' : '18pt'
      ctx.textBaseline = 'middle'
      for (let i = 0; i < positions.length; i++) {
        let x = positions[i].x
        let y = positions[i].y
        left = width * (((x - 1) * 3) + 2) / 10
        top = height * ((y + 1) / 10)
        ctx.textAlign = x === 1 ? 'left' : x === 2 ? 'center' : x === 3 ? 'right' : null
        ctx.font = `${fontSize} sans-serif`
        ctx.fillText(suits[suit], left, top)
      }
    }
  }

  export class Card {

    isEmpty: boolean

    value: string

    suit: string

    selector: string

    cardId: string

    constructor (value: string = null, suit: string = null, empty = false) {
      this.isEmpty = empty
      this.value = value
      this.suit = suit
      this.cardId = Math.random().toString().substr(2)
      this.selector = `span.card[data-card-id="${this.cardId}"]`
    }

    static DomToCard (node: HTMLSpanElement) {
      const isEmptyStack = node.classList.contains('stack') && node.childNodes.length === 0
      return new Card(node.dataset['value'], node.dataset['suit'], isEmptyStack)
    }

    get index () {
      return Deck.index(this)
    }

    get isRed () {
      return ['heart', 'diamond'].indexOf(this.suit) > -1
    }

    get isBlack () {
      return ['club', 'spade'].indexOf(this.suit) > -1
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
        card.dataset['suit'] = this.suit
        card.dataset['value'] = this.value
        card.style.backgroundImage = `url(${getDataUri(card)})`
      }
      else {
        card.classList.add('blank')
      }

      return card
    }

  }
}
