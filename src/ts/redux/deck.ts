import { Cards } from '../lib/Card'
import { GlobalActions, INITIALIZE } from './globals'
import { undoable } from './undoable'
import { random } from '../lib/util'
import { ThunkResult } from '.'
import { getDeck } from './selectors'
import { StackCard } from '../lib/Stack'

export type DeckStore = {
  readonly deck: StackCard[]
}

const REMOVE_CARD = 'REMOVE_CARD'
type REMOVE_CARD = typeof REMOVE_CARD
type RemoveCardAction = { type: REMOVE_CARD; cards: StackCard[] }
export const removeCards = (cards: StackCard[]): RemoveCardAction => ({
  type: REMOVE_CARD,
  cards
})

export type DeckActions = RemoveCardAction

export const getRandomCards = (count: Number): ThunkResult<StackCard[]> => {
  return (dispatch, getState) => {
    const { deck } = getDeck(getState())
    const deck_cards = [...deck]
    const cards = []
    for (let i = 0; i < count; i++) {
      const index = random(0, deck_cards.length)
      cards.push(...deck_cards.splice(index, 1))
      // splicing here for perf considerations
      // we're removing cars as they are chosen & do 1 dispatch to `removeCarts` with all that were chosen.
      // doing it in an immutable style would require a dispatch for each card
    }

    dispatch(removeCards(cards))
    return cards
  }
}

const initialState: DeckStore = {
  deck: []
}

const deckReducer = (
  state: DeckStore = initialState,
  action: DeckActions | GlobalActions
): DeckStore => {
  if (action.type === INITIALIZE) {
    const deck = []
    for (const card of Cards) {
      deck.push({ card: { ...card } })
    }
    return { deck }
  }

  if (action.type === REMOVE_CARD) {
    return {
      deck: state.deck.filter(card => action.cards.indexOf(card) === -1)
    }
  }

  return state
}

export default undoable(deckReducer)
