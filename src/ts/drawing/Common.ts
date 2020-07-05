import { Cards, StackCard } from '../lib/Card'
import { ColorSchemeType, ColorScheme, colorSchemes } from './ColorScheme'
import {
  getErrorImageData,
  getEmptyImageData,
  getHiddenImageData,
  getCardImageData,
} from './Card'

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

export type DrawingContext = {
  ctx: CanvasRenderingContext2D
  colorScheme: ColorScheme
  cardWidth: number
  cardHeight: number
  gutterWidth: number
  gutterHeight: number
}

export const getKey = ({ card: { suit, value }, selected }: StackCard) =>
  `${suit}_${value}_${(selected || false).toString()}`

export const cardCache: Map<string, ImageData> = new Map()

let c2: HTMLCanvasElement

export const initialize = (context: DrawingContext) => {
  cardCache.set('hidden', getHiddenImageData(context))
  cardCache.set('empty', getEmptyImageData(context))
  cardCache.set('error', getErrorImageData(context))
  Cards.forEach((card) => {
    cardCache
      .set(
        getKey({ card, selected: true }),
        getCardImageData(context, { card, selected: true }),
      )
      .set(
        getKey({ card, selected: false }),
        getCardImageData(context, { card, selected: false }),
      )
  })

  c2 = document.createElement('canvas')
  c2.width = context.cardWidth
  c2.height = context.cardHeight
  console.log('INITIALIZING TO', context.cardWidth, context.cardHeight)
  context.ctx.clearRect(0, 0, context.cardWidth + 2, context.cardHeight + 2)
}

export const writeDataToCanvas = (
  context: DrawingContext,
  data: ImageData,
  x: number,
  y: number,
) => {
  const ctx2 = c2.getContext('2d')
  ctx2?.putImageData(data, 0, 0)
  context.ctx.drawImage(c2, x, y)
}
