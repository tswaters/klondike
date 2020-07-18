import * as React from 'react'
import { GameCtx } from '../components/GameCanvas'
import { Clickable, DrawingContext, Drawable } from '../drawing/Common'

export interface Drawer {
  (context: DrawingContext): Drawable | null
}

export const useDrawing = (draw: Drawer, events: Clickable = {}) => {
  const gameContext = React.useContext(GameCtx)
  const performCleanup = React.useRef(true)
  const lastWidth = React.useRef(gameContext?.context.width ?? 0)
  const lastHeight = React.useRef(gameContext?.context.height ?? 0)

  // should only clear the rects if we haven't just resized the screen
  // a screen resize will already clear the entire canvas
  // if this isn't tracked, we end up drawing a new game and clear out the old sizes, leaving blank holes.

  React.useEffect(() => {
    if (!gameContext) return
    performCleanup.current = !(
      (lastHeight.current !== gameContext.context.height || lastWidth.current !== gameContext.context.width) &&
      lastHeight.current > 0 &&
      lastWidth.current > 0
    )
  }, [gameContext])

  React.useEffect(() => {
    if (gameContext == null) return
    const { add, remove, context } = gameContext
    const { ctx } = context

    const thing = draw(context)
    if (thing == null) return
    add(thing, events)

    return () => {
      remove(thing.path)
      if (performCleanup.current) {
        ctx.clearRect(thing.box.x, thing.box.y, thing.box.width, thing.box.height)
      }
      performCleanup.current = true
    }
  })
}
