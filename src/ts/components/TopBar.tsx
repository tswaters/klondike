import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getScoringType, getScore } from '../redux/selectors'
import { ScoringType } from '../redux/game-state'
import { initialize } from '../redux/thunks'
import { useDrawing } from '../hooks/useDrawing'
import { drawLabel, getLabelDrawingContext } from '../drawing/Label'
import { GameCtx } from './GameCanvas'
import { getHorizontalMarginSize, getVerticalMarginSize } from '../drawing/Layout'

const TopBar: React.FC = () => {
  const dispatch = useDispatch()
  const gameContext = React.useContext(GameCtx)
  const scoringType = useSelector(getScoringType)
  const currentScore = useSelector(getScore)

  const otherGameType = React.useMemo(
    () => (scoringType === ScoringType.vegas ? ScoringType.regular : ScoringType.vegas),
    [scoringType],
  )

  const deets = React.useMemo(() => {
    if (gameContext == null) return null

    const newGame = getLabelDrawingContext(gameContext.context, {
      x: 5,
      y: 5,
      height: 15,
      padding: 5,
      label: 'New Game',
      border: true,
    })

    const switchGame = getLabelDrawingContext(gameContext.context, {
      x: newGame.box.x + newGame.box.width + getHorizontalMarginSize(gameContext.context),
      y: 5,
      height: 15,
      padding: 5,
      label: `Switch to ${ScoringType[otherGameType]}`,
      border: true,
    })

    const score = getLabelDrawingContext(gameContext.context, {
      x: 0,
      y: 5,
      height: 15,
      padding: 5,
      label: `Score: ${currentScore}`,
      border: false,
    })

    const version = getLabelDrawingContext(gameContext.context, {
      x: 0,
      y: 5,
      height: 15,
      padding: 5,
      label: process.env.version || '',
      border: false,
    })

    // position the x of the switch game type button to the right of the new game button
    switchGame.box.x = newGame.box.x + newGame.box.width + getHorizontalMarginSize(gameContext.context)

    // position the x of the score to the very right of the board
    score.box.x = gameContext.context.width - score.box.width - getHorizontalMarginSize(gameContext.context)

    // version goes in the bottom right
    version.box.x = gameContext.context.width - version.box.width - getHorizontalMarginSize(gameContext.context)
    version.box.y = gameContext.context.height - version.box.height - getVerticalMarginSize(gameContext.context)

    return { newGame, switchGame, score, version }
  }, [gameContext, currentScore, otherGameType])

  const handleNewGame = React.useCallback(() => dispatch(initialize()), [dispatch])

  const handleSwitchGame = React.useCallback(() => dispatch(initialize(otherGameType)), [dispatch, otherGameType])

  useDrawing((context) => deets && drawLabel(context, deets.newGame), { onClick: handleNewGame })

  useDrawing((context) => deets && drawLabel(context, deets.switchGame), { onClick: handleSwitchGame })

  useDrawing((context) => deets && drawLabel(context, deets.score))

  useDrawing((context) => deets && drawLabel(context, deets.version))

  return null
}

export { TopBar }
export default React.memo(TopBar)
