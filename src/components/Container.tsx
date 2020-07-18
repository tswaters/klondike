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

const Container: React.FC = () => {
  const dispatch = useDispatch()
  const stacks = useSelector(getStacks)
  const draws = useSelector(getDraws)
  const showing = useSelector(getShowing)

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.keyCode !== 90) return
      if (e.ctrlKey && e.shiftKey) {
        dispatch(redo())
      } else if (e.ctrlKey) {
        dispatch(undo())
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [dispatch])

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (e.button === 1) {
        e.preventDefault()
        dispatch(performMoves())
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [dispatch])

  return (
    <div>
      <FireworksComponent />
      <GameCanvas>
        <TopBar />
        {stacks.map((stack) => (
          <StackElement key={`${stack.type}-${stack.index}`} stack={stack} showing={showing} draws={draws} />
        ))}
      </GameCanvas>
    </div>
  )
}

export default hot(React.memo(Container))
