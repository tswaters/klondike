import { ValueType, SuitType, StackCard } from '../lib/Card'
import { Box, DrawingContext } from './Common'
import { isBig, isRed } from '../lib/util'
import { search, measureHeight } from './FontSize'

import { getCardDimensions, getVerticalMarginSize, getHorizontalMarginSize } from './Layout'

type Glyph = {
  glyph: ValueType | SuitType
  x: number
  y: number
  rotated: boolean
  textAlign: CanvasTextAlign
  textBaseline: CanvasTextBaseline
  font: string
}

interface GetCard {
  (context: DrawingContext, card?: StackCard): ImageData
}

export const getBoxPath = ({ x, y, width, height }: Box, radius = 10, smaller = 0) => {
  const path = new Path2D()

  const dx = x + smaller
  const dy = y + smaller
  const dw = width - smaller * 2
  const dh = height - smaller * 2

  path.moveTo(dx + radius, dy)
  path.lineTo(dx + dw - radius, dy)
  path.quadraticCurveTo(dx + dw, dy, dx + dw, dy + radius)
  path.lineTo(dx + dw, dy + dh - radius)
  path.quadraticCurveTo(dx + dw, dy + dh, dx + dw - radius, dy + dh)
  path.lineTo(dx + radius, dy + dh)
  path.quadraticCurveTo(dx, dy + dh, dx, dy + dh - radius)
  path.lineTo(dx, dy + radius)
  path.quadraticCurveTo(dx, dy, dx + radius, dy)
  path.closePath()
  return path
}

enum FontSizeType {
  Regular,
  Corner,
}

export const getGlyphLocations = (context: DrawingContext, { card, hidden }: StackCard): Glyph[] => {
  if (hidden) return []

  const { ctx } = context
  const { width: cardWidth, height: cardHeight } = getCardDimensions(context)
  const gutterHeight = getVerticalMarginSize(context)
  const gutterWidth = getHorizontalMarginSize(context)

  const cornerWidth = Math.floor(cardWidth * 0.2)
  const figureOutFontSize = (type: FontSizeType) =>
    search(
      ctx,
      (width: number, height: number) =>
        type === FontSizeType.Corner
          ? width > cornerWidth
          : isBig(card)
          ? width > cardWidth - Math.floor(cardWidth / 5) * 2
          : width > Math.floor(cardWidth / 5) && height > Math.floor(cardHeight / 20),
      type === FontSizeType.Corner ? '10' : '\u2665',
    )

  const fontSizes: { [key in FontSizeType]: string } = {
    [FontSizeType.Corner]: figureOutFontSize(FontSizeType.Corner),
    [FontSizeType.Regular]: figureOutFontSize(FontSizeType.Regular),
  }

  // 20% of width is reserved for corner pieces
  // y of suit is margin + height of value + margin
  const cornerHeight = measureHeight(ctx, fontSizes[FontSizeType.Corner])

  const cornerValueX = gutterWidth / 2
  const cornerValueY = gutterHeight / 2
  const cornerSuitX = gutterWidth / 2
  const cornerSuitY = gutterWidth / 2 + cornerHeight

  const { suit, value } = card

  // top-left, bottom-right glyphs
  const positions = [
    { x: cornerValueX, y: cornerValueY, glyph: value },
    { x: cornerSuitX, y: cornerSuitY, glyph: suit },
  ].reduce((memo, glyph) => {
    memo.push(
      {
        ...glyph,
        rotated: false,
        textAlign: 'left',
        textBaseline: 'top',
        font: fontSizes[FontSizeType.Corner],
      },
      {
        ...glyph,
        rotated: true,
        textAlign: 'left',
        textBaseline: 'top',
        font: fontSizes[FontSizeType.Corner],
      },
    )
    return memo
  }, [] as Glyph[])

  type ypos = 0 | 1 | 2 | 3 | 4 | 5 | 6

  type xpos = 0 | 1 | 2

  const pos: { x: xpos; y: ypos }[] = []

  if (
    [
      ValueType.ace,
      ValueType.three,
      ValueType.five,
      ValueType.nine,
      ValueType.jack,
      ValueType.queen,
      ValueType.king,
    ].includes(value)
  ) {
    pos.push({ x: 1, y: 3 })
  }

  if ([ValueType.two, ValueType.three].includes(value)) {
    pos.push({ x: 1, y: 0 }, { x: 1, y: 6 })
  }

  if (
    [
      ValueType.four,
      ValueType.five,
      ValueType.six,
      ValueType.seven,
      ValueType.eight,
      ValueType.nine,
      ValueType.ten,
    ].includes(value)
  ) {
    pos.push({ x: 0, y: 0 }, { x: 2, y: 0 }, { x: 0, y: 6 }, { x: 2, y: 6 })
  }

  if ([ValueType.six, ValueType.seven, ValueType.eight].includes(value)) {
    pos.push({ x: 0, y: 3 }, { x: 2, y: 3 })
  }

  if ([ValueType.seven, ValueType.ten, ValueType.eight].includes(value)) {
    pos.push({ x: 1, y: 1 })
  }

  if ([ValueType.nine, ValueType.ten].includes(value)) {
    pos.push({ x: 0, y: 2 }, { x: 2, y: 2 }, { x: 0, y: 4 }, { x: 2, y: 4 })
  }

  if ([ValueType.ten, ValueType.eight].includes(value)) {
    pos.push({ x: 1, y: 5 })
  }

  const getTop = (y: ypos) => {
    switch (y) {
      case 0:
      case 6:
        return cardHeight * 0.2
      case 1:
      case 5:
        return cardHeight * 0.3
      case 2:
      case 4:
        return cardHeight * 0.4
      case 3:
        return cardHeight * 0.5
    }
  }

  const getLeft = (x: xpos) => {
    switch (x) {
      case 0:
        return cardWidth * 0.25
      case 1:
        return cardWidth * 0.5
      case 2:
        return cardWidth * 0.75
    }
  }

  const getTextAlign = (x: xpos): CanvasTextAlign => {
    switch (x) {
      case 0:
        return 'left'
      case 1:
        return 'center'
      case 2:
        return 'right'
    }
  }

  pos.forEach(({ x, y }) => {
    positions.push({
      x: getLeft(x),
      y: getTop(y),
      glyph: suit,
      textAlign: getTextAlign(x),
      textBaseline: 'middle',
      rotated: y > 3,
      font: fontSizes[FontSizeType.Regular],
    })
  })

  return positions
}

export const getEmptyImageData: GetCard = (context: DrawingContext) => {
  const { ctx, colorScheme } = context
  const { width, height } = getCardDimensions(context)
  const box = { x: 0, y: 0, width, height }
  ctx.clearRect(0, 0, width, height)
  ctx.fillStyle = colorScheme.emptyColor
  ctx.fillRect(box.x, box.y, box.width, box.height)
  ctx.lineWidth = 0.5
  ctx.strokeStyle = colorScheme.cardBorder
  ctx.strokeRect(box.x, box.y, box.width, box.height)
  return ctx.getImageData(box.x, box.y, box.width, box.height)
}

export const getHiddenImageData: GetCard = (context: DrawingContext) => {
  const { ctx, colorScheme } = context
  const { width, height } = getCardDimensions(context)
  const box = { x: 0, y: 0, width, height }
  ctx.clearRect(box.x, box.y, box.width, box.height)
  ctx.strokeStyle = colorScheme.cardBorder
  ctx.lineWidth = 2
  ctx.stroke(getBoxPath(box, 10))
  ctx.fillStyle = colorScheme.faceDown
  ctx.fill(getBoxPath(box, 10, 0.5))
  return ctx.getImageData(box.x, box.y, box.width, box.height)
}

export const getCardImageData: GetCard = (context: DrawingContext, card: StackCard) => {
  const { ctx, colorScheme } = context
  const { width, height } = getCardDimensions(context)
  const box = { x: 0, y: 0, width, height }

  ctx.clearRect(box.x, box.y, box.width, box.height)
  ctx.strokeStyle = colorScheme.cardBorder
  ctx.lineWidth = 2
  ctx.stroke(getBoxPath(box, 10))

  ctx.fillStyle = card.selected ? colorScheme.selected : colorScheme.faceUp
  ctx.fill(getBoxPath(box, 10, 0.5))

  for (const glyph of getGlyphLocations(context, card)) {
    ctx.fillStyle = isRed(card.card) ? colorScheme.red : colorScheme.black
    ctx.textAlign = glyph.textAlign
    ctx.textBaseline = glyph.textBaseline
    ctx.font = glyph.font
    if (glyph.rotated) {
      ctx.save()
      ctx.translate(width, height)
      ctx.rotate(Math.PI)
    }
    ctx.fillText(glyph.glyph, glyph.x + box.x * (glyph.rotated ? -1 : 1), glyph.y + box.y * (glyph.rotated ? -1 : 1))
    if (glyph.rotated) ctx.restore()
  }
  return ctx.getImageData(box.x, box.y, box.width, box.height)
}

export const getErrorImageData: GetCard = (context: DrawingContext) => {
  const { ctx, colorScheme } = context
  const { width, height } = getCardDimensions(context)
  const box = { x: 0, y: 0, width, height }
  ctx.clearRect(box.x, box.y, box.width, box.height)
  ctx.fillStyle = colorScheme.emptyColor
  ctx.fill(getBoxPath(box))
  ctx.font = '48px sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = colorScheme.errorColor
  ctx.fillText('X', box.width / 2, box.height / 2)
  return ctx.getImageData(box.x, box.y, box.width, box.height)
}
