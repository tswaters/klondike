
namespace Program {

  const suits = ['club', 'spade', 'diamond', 'heart']
  const values = ['ace', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'jack', 'queen', 'king']

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
      this.cards = suits.reduce((memo: Card[], suit: string) => {
        for (let i = 0; i < values.length; i += 1) {
          memo.push(new Card(values[i], suit))
        }
        return memo
      }, [])
    }

    static index (card: Card) {
      return values.indexOf(card.value)
    }

    getCard (): Promise<Card> {
      const method = 'POST'
      const headers = new Headers()
      headers.append('Content-Type', 'application/json')
      const body = JSON.stringify({min: 0, max: this.cards.length - 1})
      return fetch('/random', {method, body, headers})
        .then((res: Response) => res.json())
        .then((res: IRandomNumberReturn) => {
          return this.cards.splice(res.number, 1)[0]
        })
    }

  }
}
