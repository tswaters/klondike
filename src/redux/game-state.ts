import { createSlice, PayloadAction, AnyAction } from '@reduxjs/toolkit'
import { StackType } from '../lib/Card'
import { retrieve, PersistanceType } from '../lib/Persist'
import { ScoringType, getScoreChange, ScoreType } from '../lib/Scoring'
import { ColorSchemeType } from '../drawing/ColorScheme'
import { initialize } from './init'
import { undoable } from './undoable'
import { MoveCardPayload, shiftCards } from './stacks'

const gameStateSlice = createSlice({
  name: 'game-state',
  initialState: {
    draws: 0,
    number: 0,
    score: 0,
    scoringType: ScoringType.regular,
    showing: 0,
    theme: ColorSchemeType.dark,
  },
  reducers: {
    incrementDraws: (state) => ({
      ...state,
      draws: state.draws + 1,
    }),
    incrementScore: (state, action: PayloadAction<ScoreType>) => ({
      ...state,
      score: state.score + getScoreChange(state.scoringType, action.payload),
    }),
    changeTheme: (state, action: PayloadAction<ColorSchemeType>) => ({
      ...state,
      theme: action.payload,
    }),
  },
  extraReducers: (builder) =>
    builder
      .addCase(initialize, (state, action) => {
        state.draws = 0
        state.number = action.payload.number
        state.score = action.payload.scoringType === ScoringType.vegas ? retrieve(PersistanceType.score, 0) - 52 : 0
        state.scoringType = action.payload.scoringType
        state.showing = 3
      })
      .addMatcher(
        (action: AnyAction): action is PayloadAction<MoveCardPayload> =>
          shiftCards.match(action) &&
          (action.payload.to.type === StackType.waste ||
            (action.payload.from && action.payload.from.type === StackType.waste)),
        (state, action) => {
          state.showing =
            action.payload.to.type === StackType.waste
              ? Math.min(action.payload.to.cards.length + action.payload.cards.length, 3)
              : Math.max(1, state.showing - 1)
        },
      ),
})

export const { incrementDraws, incrementScore, changeTheme } = gameStateSlice.actions

export default undoable(gameStateSlice.reducer)
