import { ScoreStore } from '../redux/score'
import { ScoringType } from '../redux/globals'

export const saveScore = (score: ScoreStore): void => {
  try {
    if (score.scoringType === ScoringType.vegas) {
      localStorage.setItem('score', score.score.toString())
    }
  } catch (err) {
    // ehh, that sucks
  }
}

export const getSavedScore = (): number => {
  try {
    const score = localStorage.getItem('score')
    if (score == null) {
      return 0
    }

    const parsed = parseInt(score, 10)
    if (Number.isNaN(parsed)) {
      return 0
    }

    return parsed
  } catch (err) {
    return 0
  }
}
