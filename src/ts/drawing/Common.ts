import { Cards, StackCard } from '../lib/Card'
import { ColorScheme } from './ColorScheme'
import { getErrorImageData, getEmptyImageData, getHiddenImageData, getCardImageData } from './Card'
import { getCardBox } from './Layout'

export type Box = {
  x: number
  y: number
  width: number
  height: number
}

export type Point = {
  x: number
  y: number
}

export type Drawable = {
  path: Path2D
  box: Box
}

export interface Drawer {
  (context: DrawingContext): Drawable
}

export interface DrawRoutine<T, R = Drawable> {
  (context: DrawingContext, arg1: T | null): R | null
}

export interface Handler {
  (arg0: Drawable, arg1: Point): void
}

export type Clickable = {
  onClick?: Handler
  onDoubleClick?: Handler
}

export type SizeDetails = {
  width: number
  height: number
}

export type DrawingContext = { ctx: CanvasRenderingContext2D; colorScheme: ColorScheme } & SizeDetails

export const getKey = ({ card: { suit, value }, selected }: StackCard) =>
  `${suit}_${value}_${(selected || false).toString()}`

export const cardCache: Map<string, ImageData> = new Map()

let c2: HTMLCanvasElement

export const initialize = (context: DrawingContext) => {
  const { width, height } = getCardBox(context)
  cardCache.set('hidden', getHiddenImageData(context))
  cardCache.set('empty', getEmptyImageData(context))
  cardCache.set('error', getErrorImageData(context))
  Cards.forEach((card) => {
    cardCache
      .set(getKey({ card, selected: true }), getCardImageData(context, { card, selected: true }))
      .set(getKey({ card, selected: false }), getCardImageData(context, { card, selected: false }))
  })

  c2 = document.createElement('canvas')
  c2.width = width
  c2.height = height
  context.ctx.clearRect(0, 0, width + 2, height + 2)
}

export const writeDataToCanvas = (context: DrawingContext, data: ImageData, x: number, y: number) => {
  const ctx2 = c2.getContext('2d')
  ctx2?.putImageData(data, 0, 0)
  context.ctx.drawImage(c2, x, y)
}
