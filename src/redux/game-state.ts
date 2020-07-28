import { MOVE_CARDS } from './stacks'
import { StackType } from '../lib/Card'
import { StoreActions } from '.'
import { undoable } from './undoable'
import { INITIALIZE, InitializeAction } from './init'
import { retrieve, PersistanceType } from '../lib/Persist'
import { ColorSchemeType } from '../drawing/ColorScheme'

export enum ScoringType {
  vegas,
  regular,
}

export enum ScoreType {
  wasteToTableau = 'wasteToTableau',
  wasteToFoundation = 'wasteToFoundation',
  tableauToFoundation = 'tableauToFoundation',
  revealCard = 'revealCard',
  foundationToTableau = 'foundationToTableau',
}

export type GameStateStore = {
  number: number
  score: number
  showing: number
  draws: number
  scoringType: ScoringType
  theme: ColorSchemeType
}

const getScoreChange = (scoringType: ScoringType, scoreType: ScoreType) => {
  let score = 0
  if (scoringType === ScoringType.regular && scoreType === ScoreType.tableauToFoundation) {
    score = 10
  } else if (
    scoreType === ScoreType.wasteToFoundation ||
    (scoringType === ScoringType.vegas && scoreType === ScoreType.tableauToFoundation) ||
    (scoringType === ScoringType.regular && scoreType === ScoreType.revealCard) ||
    (scoringType === ScoringType.regular && scoreType === ScoreType.wasteToTableau)
  ) {
    score = 5
  } else if (scoringType === ScoringType.regular && ScoreType.foundationToTableau) {
    score = -10
  } else if (scoringType === ScoringType.vegas && scoreType === ScoreType.foundationToTableau) {
    score = -5
  }
  return score
}

const INCREMENT_SCORE = '@@game-state/increment-score'
type IncrementScoreAction = { type: typeof INCREMENT_SCORE; scoreType: ScoreType }
export const incrementScore = (scoreType: ScoreType): IncrementScoreAction => ({ type: INCREMENT_SCORE, scoreType })

const DECREMENT_DRAWS = 'DECREMENT_DRAWS'
type DecrementDrawsAction = { type: typeof DECREMENT_DRAWS }
export const decrementDraws = (): DecrementDrawsAction => ({ type: DECREMENT_DRAWS })

const CHANGE_THEME = '@@game-state/change-theme'
type ChangeThemeAction = { type: typeof CHANGE_THEME; newTheme: ColorSchemeType }
export const changeTheme = (newTheme: ColorSchemeType): ChangeThemeAction => ({ type: CHANGE_THEME, newTheme })

export type GameStateActions = DecrementDrawsAction | IncrementScoreAction | InitializeAction | ChangeThemeAction

const initialState: GameStateStore = {
  draws: Infinity,
  number: 0,
  score: 0,
  scoringType: ScoringType.regular,
  showing: 0,
  theme: ColorSchemeType.dark,
}

const reducer = (state: GameStateStore = initialState, action: StoreActions): GameStateStore => {
  if (action.type === INITIALIZE) {
    return {
      ...state,
      draws: action.scoringType === ScoringType.vegas ? 2 : Infinity,
      number: action.number,
      score: action.scoringType === ScoringType.vegas ? retrieve(PersistanceType.score, 0) - 52 : 0,
      scoringType: action.scoringType,
      showing: 3,
    }
  }

  if (action.type === CHANGE_THEME) {
    return {
      ...state,
      theme: action.newTheme,
    }
  }

  if (action.type === DECREMENT_DRAWS) {
    return {
      ...state,
      draws: state.draws - 1,
    }
  }

  if (action.type === MOVE_CARDS) {
    return action.to.type === StackType.waste || (action.from && action.from.type === StackType.waste)
      ? {
          ...state,
          showing:
            action.to.type === StackType.waste
              ? Math.min(action.to.cards.length + action.cards.length, 3)
              : Math.max(1, state.showing - 1),
        }
      : state
  }

  if (action.type === INCREMENT_SCORE) {
    return {
      ...state,
      score: state.score + getScoreChange(state.scoringType, action.scoreType),
    }
  }
  return state
}

export default undoable(reducer)
