import * as React from 'react'
import { GameCtx } from './GameCanvas'
import { drawStack } from '../drawing/Stack'
import { Stack, StackDirection, StackCard } from '../lib/Card'
import { useDispatch } from 'react-redux'
import { clickCard, doubleClickCard } from '../redux/actions'
import { Drawable, Point } from '../drawing/Common'

type DrawableStack = Drawable & {
  stack: Stack
  direction: StackDirection | null
  cards: StackCard[]
}

const StackElement: React.FC<{
  stack: Stack
  draws?: number
  showing?: number
}> = ({ stack, draws, showing }) => {
  const dispatch = useDispatch()
  const gameContext = React.useContext(GameCtx)
  const performCleanup = React.useRef(true)
  const lastWidth = React.useRef(gameContext?.context.canvasWidth ?? 0)
  const lastHeight = React.useRef(gameContext?.context.canvasHeight ?? 0)

  const doubleClick = React.useCallback(
    (thing: DrawableStack, point: Point) => {
      if (gameContext == null || gameContext.context == null) return
      const { stack, cards, box, direction } = thing
      const prop = direction === StackDirection.horizontal ? 'x' : 'y'
      const spaceProp = direction === StackDirection.horizontal ? 'gutterWidth' : 'gutterHeight'
      const guess = Math.floor((point[prop] - box[prop]) / gameContext.context[spaceProp] ?? 20)
      const index = Math.min(cards.length - 1, guess)
      dispatch(doubleClickCard(stack, cards[index]))
    },
    [dispatch, gameContext],
  )

  const click = React.useCallback(
    (thing: DrawableStack, point: Point) => {
      if (gameContext == null || gameContext.context == null) return
      const { stack, cards, box, direction } = thing
      const prop = direction === StackDirection.horizontal ? 'x' : 'y'
      const spaceProp = direction === StackDirection.horizontal ? 'gutterWidth' : 'gutterHeight'
      const guess = Math.floor((point[prop] - box[prop]) / gameContext.context[spaceProp] ?? 20)
      const index = Math.min(cards.length - 1, guess)
      dispatch(clickCard(stack, cards[index]))
    },
    [dispatch, gameContext],
  )

  React.useEffect(() => {
    if (
      lastHeight.current !== gameContext?.context.canvasHeight ||
      lastWidth.current !== gameContext?.context.canvasWidth
    ) {
      performCleanup.current = false
    }
  }, [gameContext])

  React.useEffect(() => {
    if (gameContext == null) return
    const { add, remove, context } = gameContext
    const { ctx } = context

    const thing = drawStack(context, { stack, draws, showing })
    const { path, box } = thing

    add(path, thing, { click, doubleClick })

    return () => {
      remove(path)
      if (performCleanup.current) {
        ctx.clearRect(box.x, box.y, box.width, box.height)
      } else {
        performCleanup.current = true
      }
    }
  }, [gameContext, click, doubleClick, stack, draws, showing])

  return null
}

export { StackElement }
export default React.memo(StackElement)
