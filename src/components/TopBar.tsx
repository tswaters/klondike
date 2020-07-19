import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getScoringType, getScore } from '../redux/selectors'
import { ScoringType } from '../redux/game-state'
import { initialize } from '../redux/thunks'
import { useDrawing } from '../hooks/useDrawing'
import { drawLabel, getLabelDrawingContext } from '../drawing/Label'
import { GameCtx } from './GameCanvas'
import { ColorSchemeType } from '../drawing/ColorScheme'

const TopBar: React.FC = () => {
  const dispatch = useDispatch()
  const gameContext = React.useContext(GameCtx)
  const scoringType = useSelector(getScoringType)
  const currentScore = useSelector(getScore)

  const height = 15
  const padding = 5

  const handleThemeChange = React.useCallback(() => {
    gameContext?.changeTheme(
      gameContext.context.colorSchemeType === ColorSchemeType.dark ? ColorSchemeType.light : ColorSchemeType.dark,
    )
  }, [gameContext])

  const otherGameType = React.useMemo(
    () => (scoringType === ScoringType.vegas ? ScoringType.regular : ScoringType.vegas),
    [scoringType],
  )

  const deets = React.useMemo(() => {
    if (gameContext == null) return null

    const lightSwitch = getLabelDrawingContext(gameContext.context, {
      label: gameContext.context.colorSchemeType === ColorSchemeType.dark ? '🌕' : '🌑',
      y: 5,
      height,
      padding,
      border: false,
    })

    const newGame = getLabelDrawingContext(gameContext.context, {
      y: 5,
      height,
      padding,
      label: 'New Game',
      border: true,
    })

    const switchGame = getLabelDrawingContext(gameContext.context, {
      y: 5,
      height,
      padding,
      label: `Switch to ${ScoringType[otherGameType]}`,
      border: true,
    })

    const score = getLabelDrawingContext(gameContext.context, {
      y: 5,
      height,
      padding,
      label: `Score: ${currentScore}`,
      border: false,
    })

    const version = getLabelDrawingContext(gameContext.context, {
      height,
      padding,
      label: process.env.version || '',
      border: false,
    })

    newGame.box.x = lightSwitch.box.x + lightSwitch.box.width
    switchGame.box.x = newGame.box.x + newGame.box.width
    score.box.x = gameContext.context.width - score.box.width
    version.box.x = gameContext.context.width - version.box.width
    version.box.y = gameContext.context.height - version.box.height

    return { lightSwitch, newGame, switchGame, score, version }
  }, [gameContext, currentScore, otherGameType])

  const handleNewGame = React.useCallback(() => dispatch(initialize()), [dispatch])

  const handleSwitchGame = React.useCallback(() => dispatch(initialize(otherGameType)), [dispatch, otherGameType])

  useDrawing((context) => deets && drawLabel(context, deets.lightSwitch), { onClick: handleThemeChange })

  useDrawing((context) => deets && drawLabel(context, deets.newGame), { onClick: handleNewGame })

  useDrawing((context) => deets && drawLabel(context, deets.switchGame), { onClick: handleSwitchGame })

  useDrawing((context) => deets && drawLabel(context, deets.score))

  useDrawing((context) => deets && drawLabel(context, deets.version))

  return null
}

export { TopBar }
export default React.memo(TopBar)
