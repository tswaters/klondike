import { ScoreStore } from '../redux/score'
import { ScoringType } from '../redux/globals'

export function saveScore(score: ScoreStore): void {
  try {
    if (score.scoringType === ScoringType.vegas) {
      localStorage.setItem('score', score.score.toString())
    }
  } catch (err) {
    // ehh, that sucks
  }
}

export function getSavedScore(): number {
  try {
    let score = localStorage.getItem('score')
    if (score == null) {
      return 0
    }

    let parsed = parseInt(score, 10)
    if (Number.isNaN(parsed)) {
      return 0
    }

    return parsed
  } catch (err) {
    return 0
  }
}
