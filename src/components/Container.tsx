import * as React from 'react'
import { hot } from 'react-hot-loader/root'
import { useDispatch, useSelector } from 'react-redux'
import FireworksComponent from './Fireworks'
import { undo, redo } from '../redux/undoable'
import GameCanvas from './GameCanvas'
import StackElement from './StackElement'

import { getDraws, getShowing, getStacks } from '../redux/selectors'
import TopBar from './TopBar'
import { performMoves } from '../redux/thunks'
import { StackType } from '../lib/Card'

const Container: React.FC = () => {
  const dispatch = useDispatch()
  const stacks = useSelector(getStacks)
  const draws = useSelector(getDraws)
  const showing = useSelector(getShowing)

  React.useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (e.button !== 1) return
      e.preventDefault()
      dispatch(performMoves())
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.keyCode !== 90) return
      if (e.ctrlKey && e.shiftKey) {
        dispatch(redo())
      } else if (e.ctrlKey) {
        dispatch(undo())
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
    <div>
      <FireworksComponent />
      <GameCanvas>
        <TopBar />
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
