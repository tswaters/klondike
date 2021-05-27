import * as React from 'react'
import { hot } from 'react-hot-loader/root'
import { useDispatch, useSelector } from 'react-redux'

import { StackType } from '../lib/Card'
import { colorSchemes } from '../drawing/ColorScheme'
import { label, topBar, game, optionsMask, optionsModal, button } from '../css/index.css'

import FireworksComponent from './Fireworks'
import GameCanvas from './GameCanvas'
import StackElement from './StackElement'
import Options from './Options'

import { performMoves, newNumber } from '../redux/thunks'
import { undo, redo } from '../redux/undoable'
import { getOverDrawn, getShowing, getStacks, getTheme, getScore, getNumber } from '../redux/selectors'

const Container: React.FC = () => {
  const dispatch = useDispatch()
  const stacks = useSelector(getStacks)
  const overDrawn = useSelector(getOverDrawn)
  const showing = useSelector(getShowing)
  const theme = useSelector(getTheme)
  const score = useSelector(getScore)
  const number = useSelector(getNumber)

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
  const handleNewGame = React.useCallback(() => dispatch(newNumber()), [dispatch])

  React.useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (e.button !== 1) return
      e.preventDefault()
      dispatch(performMoves())
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'F2') dispatch(newNumber())
      if (e.code === 'Escape') setShowOptions((prev) => !prev)
      if (e.code === 'KeyZ' && e.ctrlKey) {
        if (e.shiftKey) {
          dispatch(redo())
        } else {
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
          <button tabIndex={1} onClick={handleNewGame} className={button}>
            🔄︎
          </button>
          <span className={label}>{number}</span>
        </div>
        <div>
          <span className={label}>{score}</span>
          <button tabIndex={1} onClick={handleShowOptions} className={button}>
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
            {...(stack.type === StackType.stock && { overDrawn })}
          />
        ))}
      </GameCanvas>
    </div>
  )
}

export default hot(React.memo(Container))
