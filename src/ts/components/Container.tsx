import * as React from 'react'
import { hot } from 'react-hot-loader/root'
import { useDispatch, useSelector } from 'react-redux'
import FireworksComponent from './Fireworks'
import { newGame, score, version, switchScoreType } from '../../styles/cards.css'
import { initialize } from '../redux/thunks'
import { getScore, getScoringType } from '../redux/selectors'
import { undo, redo } from '../redux/undoable'
import { ScoringType } from '../redux/game-state'
import GameCanvas from './GameCanvas'
import StackElement from './StackElement'

import { getDraws, getShowing, getAllStacks } from '../redux/selectors'

const Container: React.FC = () => {
  const dispatch = useDispatch()
  const stacks = useSelector(getAllStacks)
  const currentScore = useSelector(getScore)
  const scoringType = useSelector(getScoringType)
  const draws = useSelector(getDraws)
  const showing = useSelector(getShowing)

  const { otherGameType, switchLabel } = React.useMemo(() => {
    const otherGameType = scoringType === ScoringType.vegas ? ScoringType.regular : ScoringType.vegas
    const switchLabel = `Switch to ${ScoringType[otherGameType]}`
    return { otherGameType, switchLabel }
  }, [scoringType])

  const handleNewGameClick = React.useCallback(() => {
    dispatch(initialize())
  }, [dispatch])

  const handleSwitchGameTypeClick = React.useCallback(() => {
    dispatch(initialize(otherGameType))
  }, [dispatch, otherGameType])

  const handleKeyDown = React.useCallback(
    (e: KeyboardEvent) => {
      if (e.keyCode !== 90) return
      if (e.ctrlKey && e.shiftKey) {
        dispatch(redo())
      } else if (e.ctrlKey) {
        dispatch(undo())
      }
    },
    [dispatch],
  )

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return (
    <div>
      <FireworksComponent />
      <div>
        <button id="new-game" className={newGame} onClick={handleNewGameClick}>
          {'New Game'}
        </button>
        <button id="change-type" className={switchScoreType} onClick={handleSwitchGameTypeClick}>
          {' Switch to '}
          {ScoringType[otherGameType]}
        </button>
        <label id="score" className={score}>
          {'Score: '}
          {currentScore}
        </label>
      </div>
      <GameCanvas>
        {stacks.map((stack) => (
          <StackElement key={`${stack.type}-${stack.index}`} stack={stack} showing={showing} draws={draws} />
        ))}
      </GameCanvas>
      <div className={version}>{process.env.version}</div>
    </div>
  )
}

export default hot(React.memo(Container))
