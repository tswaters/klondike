
import {INITIALIZE, GlobalActions} from './actions'
import {undoable} from './undoable'

const INCREMENT_SCORE = 'INCREMENT_SCORE'
type INCREMENT_SCORE = typeof INCREMENT_SCORE

type IncrementAction = {
  type: INCREMENT_SCORE,
  score: number
}

export function incrementScore (score: number): IncrementAction {
  return {type: INCREMENT_SCORE, score}
}

export type ScoreStore = {
  score: number
}

export type ScoreActions = IncrementAction

const initialState: ScoreStore = {score: 0}

function scoreReducer (
  state: ScoreStore = initialState,
  action: IncrementAction | GlobalActions
): ScoreStore {

  if (action.type === INITIALIZE) {
    return {score: 0}
  }

  if (action.type === INCREMENT_SCORE) {
    return {score: state.score + action.score}
  }

  return state

}

export default undoable(scoreReducer)
