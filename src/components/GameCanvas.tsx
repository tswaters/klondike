import * as React from 'react'
import { Drawable, DrawingContext, Clickable, Handler } from '../drawing/Common'
import { colorSchemes } from '../drawing/ColorScheme'
import { initialize } from '../drawing/Common'
import { useCanvasSize } from '../hooks/useCanvasSize'
import { useSelector } from 'react-redux'
import { getTheme } from '../redux/selectors'

export type GameContext = {
  context: DrawingContext
  add: (thing: Drawable, events: Clickable) => void
  remove: (path: Path2D) => void
}

export const GameCtx = React.createContext<GameContext | null>(null)

const intersect = (evt: React.MouseEvent<HTMLCanvasElement>, pointsRef: Map<Path2D, Drawable>) => {
  const { nativeEvent: e } = evt
  const canvas = e.target as HTMLCanvasElement
  const point = { x: e.offsetX, y: e.offsetY }
  const ctx = canvas.getContext('2d')
  for (const path of pointsRef.keys())
    if (ctx?.isPointInPath(path, point.x, point.y)) {
      const thing = pointsRef.get(path)
      if (thing == null) return
      return { thing, point }
    }
}

const GameCanvas: React.FC<React.HTMLAttributes<HTMLCanvasElement>> = ({ children, ...rest }) => {
  const pointsRef = React.useRef<Map<Path2D, Drawable>>(new Map())
  const clickHandlers = React.useRef<Map<Path2D, Handler>>(new Map())
  const doubleClickHandlers = React.useRef<Map<Path2D, Handler>>(new Map())

  const { ctx, width, height, handleCanvasRef } = useCanvasSize()
  const colorSchemeType = useSelector(getTheme)
  const colorScheme = colorSchemes[colorSchemeType]

  const context = React.useMemo<DrawingContext | null>(() => {
    if (!width || !height || !ctx) return null
    return { ctx, width, height, colorSchemeType, colorScheme }
  }, [ctx, width, height, colorSchemeType, colorScheme])

  React.useLayoutEffect(() => (context && initialize(context)) || void 0, [context])

  const value = React.useMemo<GameContext | null>(
    () =>
      context && {
        context,
        add(thing, events) {
          pointsRef.current.set(thing.path, thing)
          if (events.onClick) clickHandlers.current.set(thing.path, events.onClick)
          if (events.onDoubleClick) doubleClickHandlers.current.set(thing.path, events.onDoubleClick)
        },
        remove(path: Path2D) {
          pointsRef.current.delete(path)
          clickHandlers.current.delete(path)
          doubleClickHandlers.current.delete(path)
        },
      },
    [context],
  )

  const handleCanvasDoubleClick = React.useCallback((evt: React.MouseEvent<HTMLCanvasElement>) => {
    const selection = intersect(evt, pointsRef.current)
    if (selection) {
      const { thing, point } = selection
      const event = doubleClickHandlers.current.get(thing.path)
      if (event) event(thing, point)
    }
  }, [])

  const handleCanvasClick = React.useCallback((evt: React.MouseEvent<HTMLCanvasElement>) => {
    const selection = intersect(evt, pointsRef.current)
    if (selection) {
      const { thing, point } = selection
      const event = clickHandlers.current.get(thing.path)
      if (event) event(thing, point)
    }
  }, [])

  return (
    <>
      <canvas
        id="canvas"
        ref={handleCanvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onClick={handleCanvasClick}
        onDoubleClick={handleCanvasDoubleClick}
        {...rest}
      />
      <GameCtx.Provider value={value}>{children}</GameCtx.Provider>
    </>
  )
}

export { GameCanvas }
export default React.memo(GameCanvas)
