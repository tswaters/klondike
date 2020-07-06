import * as React from 'react'
import { Point, Drawable, DrawingContext } from '../drawing/Common'
import {
  ColorSchemeType,
  ColorScheme,
  colorSchemes,
} from '../drawing/ColorScheme'
import { initialize } from '../drawing/Common'
import { game } from '../../styles/cards.css'

interface Handler<T> {
  (arg0: T, arg1: Point): void
}

interface Add<T> {
  (
    path: Path2D,
    thing: T,
    events: {
      click?: Handler<T>
      doubleClick?: Handler<T>
    },
  ): void
}

type SizeDetails = {
  canvasWidth: number
  canvasHeight: number
  cardWidth: number
  cardHeight: number
  gutterWidth: number
  gutterHeight: number
}

export type GameContext<T extends Drawable> = {
  context: DrawingContext
  add: Add<T>
  remove: (path: Path2D) => void
}

export const GameCtx = React.createContext<GameContext<Drawable> | null>(null)

const useCanvasSize = (canvas: HTMLCanvasElement | null) => {
  const getSize = () => {
    const gutterWidth = 20
    const gutterHeight = 30
    return {
      canvasWidth: canvas?.width ?? 0,
      canvasHeight: canvas?.height ?? 0,
      cardWidth: Math.max(
        100,
        Math.floor((window.innerWidth - gutterWidth * 8) / 7),
      ),
      cardHeight: Math.max(
        200,
        Math.floor((window.innerHeight - gutterHeight * (19 + 3)) / 2),
      ),
      gutterWidth,
      gutterHeight,
    }
  }
  const [size, setSize] = React.useState<SizeDetails>(getSize())
  React.useEffect(() => {
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (ctx == null) return
    let tid: number
    const handleSize = () => {
      if (tid) clearTimeout(tid)
      tid = window.setTimeout(() => {
        setSize(getSize())
      }, 300)
    }
    window.addEventListener('resize', handleSize)
    return () => {
      window.removeEventListener('resize', handleSize)
    }
  })
  return size
}

const intersect = (
  evt: React.MouseEvent<HTMLCanvasElement>,
  pointsRef: Map<Path2D, Drawable>,
) => {
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

const GameCanvas: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pointsRef = React.useRef<Map<Path2D, Drawable>>(new Map())
  const clickHandlers = React.useRef<Map<Path2D, Handler<Drawable>>>(new Map())
  const doubleClickHandlers = React.useRef<Map<Path2D, Handler<Drawable>>>(
    new Map(),
  )

  const [colorScheme] = React.useState<ColorScheme>(
    colorSchemes[ColorSchemeType.light],
  )
  const [canvas, setContext] = React.useState<HTMLCanvasElement | null>(null)
  const canvasSize = useCanvasSize(canvas)

  const gameContext = React.useMemo(() => {
    if (!canvas) return null
    const ctx = canvas.getContext('2d')
    if (!ctx) return null
    return {
      ctx,
      canvasWidth: canvasSize.canvasWidth,
      canvasHeight: canvasSize.canvasHeight,
      cardWidth: canvasSize.cardWidth,
      cardHeight: canvasSize.cardHeight,
      gutterWidth: canvasSize.gutterWidth,
      gutterHeight: canvasSize.gutterHeight,
      colorScheme,
    }
  }, [canvas, canvasSize, colorScheme])

  React.useLayoutEffect(() => {
    if (gameContext) initialize(gameContext)
  }, [gameContext])

  const handleCanvasRef = React.useCallback((canvas: HTMLCanvasElement) => {
    if (canvas) {
      setContext(canvas)
    }
  }, [])

  const add = React.useCallback<Add<Drawable>>((path, thing, events) => {
    pointsRef.current.set(path, thing)
    const { click, doubleClick } = events
    if (click) clickHandlers.current.set(path, click)
    if (doubleClick) doubleClickHandlers.current.set(path, doubleClick)
  }, [])

  const remove = React.useCallback((path: Path2D) => {
    pointsRef.current.delete(path)
    clickHandlers.current.delete(path)
    doubleClickHandlers.current.delete(path)
  }, [])

  const handleCanvasDoubleClick = React.useCallback(
    (evt: React.MouseEvent<HTMLCanvasElement>) => {
      const selection = intersect(evt, pointsRef.current)
      if (selection) {
        const { thing, point } = selection
        const event = doubleClickHandlers.current.get(thing.path)
        if (event) event(thing, point)
      }
    },
    [],
  )

  const handleCanvasClick = React.useCallback(
    (evt: React.MouseEvent<HTMLCanvasElement>) => {
      const selection = intersect(evt, pointsRef.current)
      if (selection) {
        const { thing, point } = selection
        const event = clickHandlers.current.get(thing.path)
        if (event) event(thing, point)
      }
    },
    [],
  )

  const value = React.useMemo(
    () => gameContext && { context: gameContext, add, remove },
    [gameContext, add, remove],
  )

  return (
    <>
      <canvas
        className={game}
        ref={handleCanvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onClick={handleCanvasClick}
        onDoubleClick={handleCanvasDoubleClick}
      />
      <GameCtx.Provider value={value}>{children}</GameCtx.Provider>
    </>
  )
}

export { GameCanvas }
export default React.memo(GameCanvas)
