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

const SET_GAME_NUMBER = '@@game-state/set-game-number'
type SetGameNumberAction = { type: typeof SET_GAME_NUMBER; number: number }
export const setGameNumber = (number: number): SetGameNumberAction => ({ type: SET_GAME_NUMBER, number })

export type GameStateActions =
  | DecrementDrawsAction
  | IncrementScoreAction
  | InitializeAction
  | ChangeThemeAction
  | SetGameNumberAction

const initialState: GameStateStore = {
  showing: 0,
  score: 0,
  draws: Infinity,
  scoringType: retrieve(PersistanceType.gameMode, ScoringType.regular),
  theme: retrieve(PersistanceType.theme, ColorSchemeType.dark),
  number: retrieve(PersistanceType.gameNumber, Math.floor(Math.random() * 1000)),
}

const reducer = (state: GameStateStore = initialState, action: StoreActions): GameStateStore => {
  if (action.type === INITIALIZE) {
    return {
      ...state,
      number: action.number,
      scoringType: action.scoringType,
      score: action.scoringType === ScoringType.vegas ? retrieve(PersistanceType.score, 0) - 52 : 0,
      draws: action.scoringType === ScoringType.vegas ? 2 : Infinity,
    }
  }

  if (action.type === SET_GAME_NUMBER) {
    return {
      ...state,
      number: action.number,
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
