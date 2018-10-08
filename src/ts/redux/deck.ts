import {Card, Cards} from '../lib/Card'
import {GlobalActions, INITIALIZE} from './actions'
import {undoable} from './undoable'
import {random} from '../lib/util'
import {ThunkResult} from '.'
import {getDeck} from './selectors'

export type DeckStore = {
  readonly cards: Card[]
}

const REMOVE_CARD = 'REMOVE_CARD'
type REMOVE_CARD = typeof REMOVE_CARD
type RemoveCardAction = {type: REMOVE_CARD, cards: Card[]}
export const removeCards = (cards: Card[]): RemoveCardAction => ({type: REMOVE_CARD, cards})

export type DeckActions = RemoveCardAction

export const getRandomCards = (count: Number): ThunkResult<Card[]> => {
  return (dispatch, getState) => {

    const current_deck = getDeck(getState())
    const deck_cards = [...current_deck.cards]
    const cards = []
    for (let i = 0; i < count; i++) {
      const index = random(0, deck_cards.length - 1)
      cards.push(...deck_cards.splice(index, 1))
    }

    dispatch(removeCards(cards))
    return cards
  }
}

const initialState: DeckStore = {
  cards: []
}

function deckReducer (
  state: DeckStore = initialState,
  action: DeckActions | GlobalActions
): DeckStore {

  if (action.type === INITIALIZE) {
    const cards = []
    for (const card of Cards) {
      cards.push({...card})
    }
    return {cards}
  }

  if (action.type === REMOVE_CARD) {
    return {
      cards: state.cards.filter(card => action.cards.indexOf(card) === -1)
    }
  }

  return state
}

export default undoable(deckReducer)
