import { Drawable, DrawRoutine, DrawingContext, Box } from './Common'

import { search, measureWidth } from './FontSize'

type LabelDrawingOpts = {
  label: string
  padding: number
  x?: number
  y: number
  height: number
  border?: boolean
}

type LabelDrawingContext = LabelDrawingOpts & {
  box: Box
  font: string
}

export const getLabelDrawingContext = (context: DrawingContext, opts: LabelDrawingOpts): LabelDrawingContext => {
  const isBigEnough = (_: number, boxHeight: number) => boxHeight > height
  const { ctx } = context
  const { x, y, height, label } = opts
  const font = search(context.ctx, isBigEnough, label)
  const width = measureWidth(ctx, font, label)
  return {
    ...opts,
    box: { x: x ?? 0, y, width: width + opts.padding * 2, height: height + opts.padding * 2 },
    font,
  }
}

export const drawLabel: DrawRoutine<LabelDrawingContext, Drawable> = (context, drawingOpts) => {
  if (drawingOpts == null) return null
  const { ctx } = context
  const { font, box, label, padding, border } = drawingOpts
  ctx.save()
  ctx.beginPath()
  ctx.rect(box.x, box.y, box.width, box.height)
  ctx.closePath()
  ctx.clip()

  ctx.font = font
  ctx.textAlign = 'left'
  ctx.textBaseline = 'top'
  ctx.fillText(label, box.x + padding, box.y + padding)

  if (border) {
    ctx.strokeStyle = context.colorScheme.buttonBorder
    ctx.strokeRect(box.x, box.y, box.width, box.height)
  }

  ctx.restore()

  const path = new Path2D()
  path.rect(box.x, box.y, box.width, box.height)
  path.closePath()

  return { box, path }
}
