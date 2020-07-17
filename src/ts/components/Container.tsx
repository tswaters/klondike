import * as React from 'react'
import { hot } from 'react-hot-loader/root'
import { useDispatch, useSelector } from 'react-redux'
import FireworksComponent from './Fireworks'
import { undo, redo } from '../redux/undoable'
import GameCanvas from './GameCanvas'
import StackElement from './StackElement'

import { getDraws, getShowing, getAllStacks } from '../redux/selectors'
import TopBar from './TopBar'

const Container: React.FC = () => {
  const dispatch = useDispatch()
  const stacks = useSelector(getAllStacks)
  const draws = useSelector(getDraws)
  const showing = useSelector(getShowing)

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
