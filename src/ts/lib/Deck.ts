
import {Card, Cards} from './Card'
import {random} from './util'

class Deck {

  cards: Card[] = []

  constructor () {
    this.shuffle()
  }

  shuffle (): void {
    this.cards = []
    for (const card of Cards) {
      this.cards.push({...card})
    }
  }

  getCard (): Card {
    return this.cards.splice(random(0, this.cards.length - 1), 1)[0]
  }

}

export default new Deck()
