import { Cards, StackCard } from '../lib/Card'
import { ColorScheme, ColorSchemeType } from './ColorScheme'
import { getErrorImageData, getEmptyImageData, getHiddenImageData, getCardImageData } from './Card'
import { getCardDimensions } from './Layout'

// this is passed to all drawing routines. it includes :
// the color they should draw,
// the ctx to draw it on, and
// the width/height of the canvas.

export type DrawingContext = {
  ctx: CanvasRenderingContext2D
  colorScheme: ColorScheme
  colorSchemeType: ColorSchemeType
} & Dimensions

export type Dimensions = { width: number; height: number }

export type Point = { x: number; y: number }

export type Box = Dimensions & Point

// something that is drawable includes an x/y coords and a height/width
// once removed, clearRect is with these values to clean it from the canvas
// also, the click/double click handlers will inspect if point is in their path.

export type Drawable = { path: Path2D; box: Box }

// a draw routine takes drawing context above, and include whatever options they want
// they perform mutations to the cavas (draw the thing) and return a drawable for tracking (above)

export interface DrawRoutine<DrawingOpts> {
  (context: DrawingContext, arg1: DrawingOpts | null): Drawable | null
}

export interface Handler {
  (arg0: Drawable, arg1: Point): void
}

export type Clickable = { onClick?: Handler; onDoubleClick?: Handler }

// a cache of cards is kept and re-initialized when color scheme / window dimensions change
// this is a map of a key identifying the stack card, and the raw pixel data to draw it.
// the idea is this is all cached one time at the beginning and re-used

// this uses a string with keys because it's actually a "StackCard" we're interested in
// this includes the selected flag - the highlighted / non-highlighted state need to both be kept
// while `Cards` is immutable singleton of all available cads, StackCards is not and
// using a non-string key, we'll wind up with missing references not hitting the cache.

export const getKey = ({ card: { suit, value }, selected }: StackCard) =>
  `${suit}_${value}_${(selected || false).toString()}`

export const cardCache: Map<string, ImageData> = new Map()

let c2: HTMLCanvasElement

export const initialize = (context: DrawingContext) => {
  const { width, height } = getCardDimensions(context)
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

// to get transarency working, (maybe other composition?) need an intermediary canvas to proxy the drawing.

export const writeDataToCanvas = (context: DrawingContext, data: ImageData, x: number, y: number) => {
  const ctx2 = c2.getContext('2d')
  ctx2?.putImageData(data, 0, 0)
  context.ctx.drawImage(c2, x, y)
}
