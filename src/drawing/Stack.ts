import { Stack, StackDirection, StackType } from '../lib/Card'
import { writeDataToCanvas, cardCache, getKey, DrawingContext, Box } from './Common'
import { getStackCardOffsetWidth, getStackCardOffsetHeight, getStackBox } from './Layout'

export type StackDrawingOptions = {
  overDrawn: boolean
  showing: number
}

export type StackDrawingContext = StackDrawingOptions & {
  stack: Stack
  space: number
  max: number
  box: Box
}

export const getStackDrawingContext = (
  context: DrawingContext,
  stack: Stack,
  opts: StackDrawingOptions,
): StackDrawingContext => {
  const max =
    stack.type === StackType.stock || stack.type === StackType.foundation
      ? 1
      : stack.type === StackType.waste
      ? opts.showing || 0
      : stack.cards.length

  const box = getStackBox(context, stack, max)

  const space =
    stack.direction === StackDirection.horizontal ? getStackCardOffsetWidth(context) : getStackCardOffsetHeight(context)

  return {
    stack,
    overDrawn: opts.overDrawn,
    showing: opts.showing,
    space,
    box,
    max,
  }
}

export const drawStack = (context: DrawingContext, drawingOpts: StackDrawingContext | null) => {
  if (drawingOpts == null) return null
  const { stack, overDrawn, max, space, box } = drawingOpts
  const cards = stack.cards.slice(-max)

  const path = new Path2D()
  path.rect(box.x, box.y, box.width, box.height)
  path.closePath()

  const empty = cards.length === 0
  const error = stack.type === StackType.stock && empty && overDrawn
  const elements = []

  if (error) elements.push({ data: cardCache.get('error'), x: box.x, y: box.y })
  else if (empty) elements.push({ data: cardCache.get('empty'), x: box.x, y: box.y })
  else
    cards.forEach((card, i) => {
      const drawing = card.hidden ? cardCache.get('hidden') : cardCache.get(getKey(card))
      if (drawing) {
        const x = stack.direction === StackDirection.horizontal ? i * space : 0
        const y = stack.direction === StackDirection.horizontal ? 0 : i * space
        elements.push({ data: drawing, x: box.x + x, y: box.y + y })
      }
    })

  for (const { data, x, y } of elements) data && writeDataToCanvas(context, data, x, y)
  return { path, box }
}
