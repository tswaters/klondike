import * as React from 'react'
import { GameCtx } from './GameCanvas'
import { drawStack, StackDrawingContext, getStackDrawingContext } from '../drawing/Stack'
import { Stack, StackDirection, StackType } from '../lib/Card'
import { useDispatch } from 'react-redux'
import { clickCard, doubleClickCard } from '../redux/thunks'
import { Point, Drawable } from '../drawing/Common'
import { useDrawing } from '../hooks/useDrawing'
import { useMemo } from 'react'

const StackElement: React.FC<{
  stack: Stack
  draws: number
  showing: number
}> = ({ stack, draws, showing }) => {
  const dispatch = useDispatch()
  const gameContext = React.useContext(GameCtx)

  const drawingOpts = useMemo<StackDrawingContext | null>(
    () => gameContext && getStackDrawingContext(gameContext.context, stack, { draws, showing }),
    [gameContext, stack, draws, showing],
  )

  const onDoubleClick = React.useCallback(
    (thing: Drawable, point: Point) => {
      if (gameContext == null || drawingOpts == null) return
      const prop = stack.direction === StackDirection.horizontal ? 'x' : 'y'
      const cards = stack.cards.slice(-drawingOpts.max)
      const index = Math.min(cards.length - 1, Math.floor((point[prop] - drawingOpts.box[prop]) / drawingOpts.space))
      if (stack.type !== StackType.waste || index === cards.length - 1)
        dispatch(doubleClickCard({ stack, stackCard: cards[index] }))
    },
    [dispatch, gameContext, drawingOpts, stack],
  )

  const onClick = React.useCallback(
    (thing: Drawable, point: Point) => {
      if (gameContext == null || drawingOpts == null) return
      const prop = stack.direction === StackDirection.horizontal ? 'x' : 'y'
      const cards = stack.cards.slice(-drawingOpts.max)
      const index = Math.min(cards.length - 1, Math.floor((point[prop] - drawingOpts.box[prop]) / drawingOpts.space))
      if (stack.type !== StackType.waste || index === cards.length - 1)
        dispatch(clickCard({ stack, stackCard: cards[index] }))
    },
    [dispatch, gameContext, drawingOpts, stack],
  )

  useDrawing((context) => drawStack(context, drawingOpts), { onClick, onDoubleClick })

  return null
}

export { StackElement }
export default React.memo(StackElement)
