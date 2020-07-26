import * as React from 'react'
import { hot } from 'react-hot-loader/root'
import { useDispatch, useSelector } from 'react-redux'

import { StackType } from '../lib/Card'
import { colorSchemes } from '../drawing/ColorScheme'
import { gameNumberLabel, topBar, game, scoreLabel, optionsMask, optionsModal, optionsButton } from '../css/index.css'

import FireworksComponent from './Fireworks'
import GameCanvas from './GameCanvas'
import StackElement from './StackElement'
import Options from './Options'

import { performMoves, newGameNumber } from '../redux/thunks'
import { undo, redo } from '../redux/undoable'
import { getDraws, getShowing, getStacks, getTheme, getScore, getGameNumber } from '../redux/selectors'

const Container: React.FC = () => {
  const dispatch = useDispatch()
  const stacks = useSelector(getStacks)
  const draws = useSelector(getDraws)
  const showing = useSelector(getShowing)
  const theme = useSelector(getTheme)
  const score = useSelector(getScore)
  const gameNumber = useSelector(getGameNumber)

  const cssVars = React.useMemo(() => {
    const colors = colorSchemes[theme]
    return {
      '--background': colors.background,
      '--color': colors.color,
      '--emptyColor': colors.emptyColor,
      '--faceUp': colors.faceUp,
      '--hiddenColor1': colors.hiddenColor1,
      '--hiddenColor2': colors.hiddenColor2,
      '--buttonBorder': colors.buttonBorder,
      '--cardBorder': colors.cardBorder,
      '--black': colors.black,
      '--red': colors.red,
      '--selected': colors.selected,
      '--errorColor': colors.errorColor,
    }
  }, [theme])

  const [showOptions, setShowOptions] = React.useState(false)

  const handleCloseOptions = React.useCallback(() => setShowOptions(false), [])
  const handleShowOptions = React.useCallback(() => setShowOptions(true), [])
  const handleNewGame = React.useCallback(() => dispatch(newGameNumber()), [dispatch])

  React.useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (e.button !== 1) return
      e.preventDefault()
      dispatch(performMoves())
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.keyCode === 27) setShowOptions((prev) => !prev)
      if (e.keyCode === 90) {
        if (e.ctrlKey && e.shiftKey) {
          dispatch(redo())
        } else if (e.ctrlKey) {
          dispatch(undo())
        }
      }
    }
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [dispatch])

  return (
    <div style={cssVars}>
      <FireworksComponent />
      {showOptions && (
        <>
          <Options onClose={handleCloseOptions} className={optionsModal} />
          <div onClick={handleCloseOptions} className={optionsMask} />
        </>
      )}
      <div className={topBar}>
        <div>
          <button tabIndex={1} onClick={handleNewGame} className={optionsButton}>
            🔄︎
          </button>
          <span className={gameNumberLabel}>{gameNumber}</span>
        </div>
        <div>
          <span className={scoreLabel}>{score}</span>
          <button tabIndex={1} onClick={handleShowOptions} className={optionsButton}>
            ☰︎
          </button>
        </div>
      </div>
      <GameCanvas className={game}>
        {stacks.map((stack) => (
          <StackElement
            key={`${stack.type}-${stack.index}`}
            stack={stack}
            {...(stack.type === StackType.waste && { showing })}
            {...(stack.type === StackType.stock && { draws })}
          />
        ))}
      </GameCanvas>
    </div>
  )
}

export default hot(React.memo(Container))
