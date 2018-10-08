import {Card, Cards} from '../lib/Card'
import {GlobalActions, INITIALIZE} from './actions'
import {equals, random} from '../lib/util'
import {ThunkResult} from '.'
import {getDeck} from './selectors'

export type DeckStore = {
  readonly cards: Card[]
}

const REMOVE_CARD = 'REMOVE_CARD'
type REMOVE_CARD = typeof REMOVE_CARD
type RemoveCardAction = {type: REMOVE_CARD, card: Card}
export const removeCard = (card: Card): RemoveCardAction => ({type: REMOVE_CARD, card})

export type DeckActions = RemoveCardAction

export const getRandomCard = (): ThunkResult<Card> => {
  return (dispatch, getState) => {

    const current_deck = getDeck(getState())
    const new_card = current_deck.cards[random(0, current_deck.cards.length - 1)]

    dispatch(removeCard(new_card))
    return new_card
  }
}

const initialState: DeckStore = {
  cards: []
}

export default function deckReducer (
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
      cards: state.cards.filter(card => !equals(card, action.card))
    }
  }

  return state
}
