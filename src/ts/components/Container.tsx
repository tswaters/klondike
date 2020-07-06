import * as React from 'react'
import { hot } from 'react-hot-loader/root'
import { useDispatch, useSelector } from 'react-redux'
import FireworksComponent from './Fireworks'
import { newGame, score, version, switchScoreType } from '../../styles/cards.css'
import { initialize } from '../redux/actions'
import { getScore } from '../redux/selectors'
import { undo, redo } from '../redux/undoable'
import { ScoringType } from '../redux/globals'
import GameCanvas from './GameCanvas'
import StackElement from './StackElement'

import { getStock, getFoundation, getTableau, getWaste } from '../redux/selectors'

const Container: React.FC = () => {
  const dispatch = useDispatch()
  const { score: currentScore, scoringType } = useSelector(getScore)
  const { stacks: stock, draws } = useSelector(getStock)
  const { stacks: waste, showing } = useSelector(getWaste)
  const { stacks: tableau } = useSelector(getTableau)
  const { stacks: foundation } = useSelector(getFoundation)

  const otherGameType = React.useMemo(
    () => (scoringType === ScoringType.vegas ? ScoringType.regular : ScoringType.vegas),
    [scoringType],
  )

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
        {stock.map((stack) => (
          <StackElement key={stack.index} stack={stack} draws={draws} />
        ))}
        {waste.map((stack) => (
          <StackElement key={stack.index} stack={stack} showing={showing} />
        ))}
        {tableau.map((stack) => (
          <StackElement key={stack.index} stack={stack} />
        ))}
        {foundation.map((stack) => (
          <StackElement key={stack.index} stack={stack} />
        ))}
      </GameCanvas>
      <div className={version}>{process.env.version}</div>
    </div>
  )
}

export default hot(React.memo(Container))
