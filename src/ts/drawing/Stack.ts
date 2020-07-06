import { Stack, StackCard, StackDirection, StackType } from '../lib/Card'
import { Box, Point, writeDataToCanvas, cardCache, getKey, DrawingContext } from './Common'

type StackDrawingOptions = {
  direction: StackDirection | null
  max?: number
  offset: Point
}

type DrawStackReturn = {
  path: Path2D
  box: Box
  stack: Stack
  direction: StackDirection | null
  cards: StackCard[]
}

type StackDrawingContext = {
  stack: Stack
  draws?: number
  showing?: number
}

interface GetStackOptions {
  (arg0: DrawingContext, arg1: StackDrawingContext): StackDrawingOptions
}

export const getStackOptions: GetStackOptions = (
  { cardWidth, cardHeight, gutterWidth, gutterHeight },
  { stack, showing },
) => {
  const y = gutterHeight
  const x = gutterWidth
  const cw = cardWidth + gutterWidth
  const ch = cardHeight + gutterHeight
  let offset: Point
  let direction: StackDirection | null = null
  let max
  switch (stack.type) {
    case StackType.stock:
      offset = { x, y }
      max = 1
      break
    case StackType.waste:
      offset = { x: x + cw, y }
      direction = StackDirection.horizontal
      max = showing
      break
    case StackType.foundation:
      offset = { x: x + 3 * cw + cw * stack.index, y }
      max = 1
      break
    case StackType.tableau:
      offset = { x: x + cw * stack.index, y: y + ch * 1 }
      direction = StackDirection.vertical
      break
  }
  return { offset, direction, max }
}

export interface DrawStack {
  (context: DrawingContext, arg1: StackDrawingContext): DrawStackReturn
}

export const drawStack: DrawStack = (context, { stack, draws, showing }) => {
  let { cards } = stack
  const { direction, max, offset } = getStackOptions(context, {
    stack,
    showing,
  })
  if (max) cards = cards.slice(-max)

  const space = direction === StackDirection.horizontal ? 'gutterWidth' : 'gutterHeight'
  const box = {
    x: offset.x,
    y: offset.y,
    width:
      direction === StackDirection.horizontal
        ? cards.length === 0
          ? context.cardHeight
          : context[space] * (cards.length - 1) + context.cardWidth
        : context.cardWidth,
    height:
      direction === StackDirection.vertical
        ? cards.length === 0
          ? context.cardHeight
          : context[space] * (cards.length - 1) + context.cardHeight
        : context.cardHeight,
  }

  const path = new Path2D()
  path.rect(box.x, box.y, box.width, box.height)
  path.closePath()

  const empty = cards.length === 0
  const error = empty && draws === 0
  const elements = []

  if (error) elements.push({ data: cardCache.get('error'), x: box.x, y: box.y })
  else if (empty) elements.push({ data: cardCache.get('empty'), x: box.x, y: box.y })
  else
    cards.forEach((card, i) => {
      const drawing = card.hidden ? cardCache.get('hidden') : cardCache.get(getKey(card))
      if (drawing) {
        const x = direction === StackDirection.horizontal ? i * context[space] : 0
        const y = direction === StackDirection.horizontal ? 0 : i * context[space]
        elements.push({ data: drawing, x: box.x + x, y: box.y + y })
      }
    })

  for (const { data, x, y } of elements) data && writeDataToCanvas(context, data, x, y)

  return { path, box, direction, space, stack, cards }
}
