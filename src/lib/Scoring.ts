export enum ScoringType {
  vegas = 'vegas',
  regular = 'regular',
}

export enum ScoreType {
  wasteToTableau = 'wasteToTableau',
  wasteToFoundation = 'wasteToFoundation',
  tableauToFoundation = 'tableauToFoundation',
  revealCard = 'revealCard',
  foundationToTableau = 'foundationToTableau',
}

export const getScoreChange = (scoringType: ScoringType, scoreType: ScoreType) => {
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
