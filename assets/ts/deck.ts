
import Card from './card'
import {datum, suits, values} from './data'
import {random} from './util'

export default class Deck {

  cards: Card[]

  constructor () {
    this.cards = []
    this.shuffle()
  }

  get length (): number {
    return this.cards.length
  }

  shuffle (): void {
    this.cards = suits.reduce((memo: Card[], suit: datum) => {
      memo.push(...values.map(value => new Card(value, suit)))
      return memo
    }, [])
  }

  static index (card: Card) {
    return values.indexOf(card.value)
  }

  async getCard (): Promise<Card> {
    const num = await random(0, this.cards.length - 1)
    return this.cards.splice(num, 1)[0]
  }

}
