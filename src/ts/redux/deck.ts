import { Cards, StackCard } from '../lib/Card'
import { GlobalActions, INITIALIZE } from './globals'
import { undoable } from './undoable'
import { random } from '../lib/util'
import { ThunkResult } from '.'
import { getDeck } from './selectors'

export type DeckStore = {
  readonly deck: StackCard[]
}

const REMOVE_CARD = 'REMOVE_CARD'
type REMOVE_CARD = typeof REMOVE_CARD
type RemoveCardAction = { type: REMOVE_CARD; cards: StackCard[] }
export const removeCards = (cards: StackCard[]): RemoveCardAction => ({
  type: REMOVE_CARD,
  cards,
})

export type DeckActions = RemoveCardAction

export const getRandomCards = (count: number): ThunkResult<StackCard[]> => (
  dispatch,
  getState,
) => {
  const {
    deck: [...deck_cards],
  } = getDeck(getState())
  // const deck_cards = [...deck]
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

const reducers: {
  [key: string]: (
    state: DeckStore,
    action: DeckActions | GlobalActions,
  ) => DeckStore
} = {
  [INITIALIZE]: () => ({
    deck: Array.from(Cards, (card) => ({
      card: { ...card },
    })),
  }),
  [REMOVE_CARD]: (state, action: RemoveCardAction) => ({
    deck: state.deck.filter((card) => !action.cards.includes(card)),
  }),
}

const deckReducer = (
  state: DeckStore = { deck: [] },
  action: DeckActions | GlobalActions,
): DeckStore => {
  const reducer = reducers[action.type]
  if (reducer != null) {
    return reducer(state, action)
  }
  return state
}

export default undoable(deckReducer)
