import { createAction } from '@reduxjs/toolkit'

import { Card } from '../lib/Card'
import { ScoringType } from '../lib/Scoring'
import { ColorSchemeType } from '../drawing/ColorScheme'

// this is in it's own file because circular dependencies are jerks.

export const initialize =
  createAction<{
    scoringType: ScoringType
    cards: Card[]
    number: number
    theme: ColorSchemeType
  }>('initialize')
