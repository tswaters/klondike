
namespace Program {

  export class Deck {

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
      const method = 'POST'
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      const body = JSON.stringify({min: 0, max: this.cards.length - 1})
      const res = await fetch('/random', {method, body, headers})
      const data: IRandomNumberReturn = await res.json()
      return this.cards.splice(data.number, 1)[0]
    }

  }
}
