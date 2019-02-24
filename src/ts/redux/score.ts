import { INITIALIZE, GlobalActions, ScoreType, ScoringType } from './globals'
import { undoable } from './undoable'

const INCREMENT_SCORE = 'INCREMENT_SCORE'
type INCREMENT_SCORE = typeof INCREMENT_SCORE

type IncrementAction = {
  type: INCREMENT_SCORE
  scoreType: ScoreType
}

export function incrementScore(scoreType: ScoreType): IncrementAction {
  return { type: INCREMENT_SCORE, scoreType }
}

export type ScoreStore = {
  readonly score: number
  readonly scoringType: ScoringType
}

export type ScoreActions = IncrementAction

const initialState: ScoreStore = { score: 0, scoringType: ScoringType.regular }

function scoreReducer(
  state: ScoreStore = initialState,
  action: ScoreActions | GlobalActions
): ScoreStore {
  if (action.type === INITIALIZE) {
    return {
      score: action.scoringType === ScoringType.vegas ? state.score - 52 : 0,
      scoringType: action.scoringType
    }
  }

  if (action.type === INCREMENT_SCORE) {
    let score = 0
    if (
      state.scoringType === ScoringType.regular &&
      action.scoreType === ScoreType.tableauToFoundation
    ) {
      score = 10
    } else if (
      action.scoreType === ScoreType.wasteToFoundation ||
      (state.scoringType === ScoringType.vegas &&
        action.scoreType === ScoreType.tableauToFoundation) ||
      (state.scoringType === ScoringType.regular &&
        action.scoreType === ScoreType.revealCard) ||
      (state.scoringType === ScoringType.regular &&
        action.scoreType === ScoreType.wasteToTableau)
    ) {
      score = 5
    } else if (
      state.scoringType === ScoringType.regular &&
      ScoreType.foundationToTableau
    ) {
      score = 10
    } else if (
      state.scoringType === ScoringType.vegas &&
      action.scoreType === ScoreType.foundationToTableau
    ) {
      score = -5
    }

    return { ...state, score: state.score + score }
  }

  return state
}

export default undoable(scoreReducer)
