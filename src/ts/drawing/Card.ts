import { ValueType, SuitType, StackCard } from '../lib/Card'
import { Box, DrawingContext } from './Common'

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

export const isRed = ({ card: { suit } }: StackCard) =>
  [SuitType.diamond, SuitType.heart].includes(suit)

interface CalculateFontSizes {
  (context: DrawingContext, card: StackCard, type: FontSizeType): string
}

export const isBig = ({ card: { value } }: StackCard) =>
  [ValueType.ace, ValueType.jack, ValueType.queen, ValueType.king].includes(
    value,
  )
    ? true
    : false

export const getBoxPath = (
  { x, y, width, height }: Box,
  radius = 10,
  smaller = 0,
) => {
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

const allFontSizes = Array.from<number, number>({ length: 200 }, (v, k) => k)

export const getGlyphLocations = (
  { ctx, cardWidth, cardHeight, gutterHeight }: DrawingContext,
  stackCard: StackCard,
): Glyph[] => {
  const { card, hidden } = stackCard
  if (hidden) return []

  const minCellWidth = Math.floor(cardWidth / 5)
  const minCellHeight = Math.floor(cardHeight / 10)

  const searchFontSize = (
    type: FontSizeType,
    min: number,
    max: number,
  ): string => {
    const isBigEnough = (width: number, height: number) => {
      if (type === FontSizeType.Corner)
        return width > minCellWidth && height > minCellHeight / 2
      else if (isBig(stackCard)) return width > cardWidth - minCellWidth * 2
      else return width > minCellWidth && height > minCellHeight
    }
    const index = Math.floor((max + min) / 2)
    ctx.font = `${allFontSizes[index]}px sans-serif`
    const { width } = ctx.measureText(
      type === FontSizeType.Corner ? '10' : '\u2665',
    )
    const { width: height } = ctx.measureText('M') // approx
    if (min > max) return `${allFontSizes[index]}px sans-serif`
    if (isBigEnough(width, height)) return searchFontSize(type, min, index - 1)
    return searchFontSize(type, index + 1, max)
  }

  const fontSizes: { [key in FontSizeType]: string } = {
    [FontSizeType.Corner]: searchFontSize(
      FontSizeType.Corner,
      0,
      allFontSizes.length - 1,
    ),
    [FontSizeType.Regular]: searchFontSize(
      FontSizeType.Regular,
      0,
      allFontSizes.length - 1,
    ),
  }

  const { suit, value } = card

  // top-left, bottom-right glyphs
  const positions = [
    { x: minCellWidth / 2, y: gutterHeight * 0.25, glyph: value },
    { x: minCellWidth / 2, y: gutterHeight, glyph: suit },
  ].reduce((memo, glyph) => {
    memo.push(
      {
        ...glyph,
        rotated: false,
        textAlign: 'center',
        textBaseline: 'top',
        font: fontSizes[FontSizeType.Corner],
      },
      {
        ...glyph,
        rotated: true,
        textAlign: 'center',
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

export const getEmptyImageData: GetCard = ({
  ctx,
  cardWidth: width,
  cardHeight: height,
  colorScheme,
}: DrawingContext) => {
  const box = { x: 0, y: 0, width, height }
  ctx.clearRect(0, 0, width, height)
  ctx.fillStyle = colorScheme.emptyColor
  ctx.lineWidth = 0.5
  ctx.strokeRect(box.x, box.y, box.width, box.height)
  return ctx.getImageData(box.x, box.y, box.width, box.height)
}

export const getHiddenImageData: GetCard = ({
  ctx,
  cardWidth: width,
  cardHeight: height,
  colorScheme,
}: DrawingContext) => {
  const box = { x: 0, y: 0, width, height }
  ctx.clearRect(box.x, box.y, box.width, box.height)
  ctx.strokeStyle = colorScheme.border
  ctx.lineWidth = 2
  ctx.stroke(getBoxPath(box, 10))
  ctx.fillStyle = colorScheme.faceDown
  ctx.fill(getBoxPath(box, 10, 0.5))
  return ctx.getImageData(box.x, box.y, box.width, box.height)
}

export const getCardImageData: GetCard = (
  context: DrawingContext,
  card: StackCard,
) => {
  const { ctx, cardWidth: width, cardHeight: height, colorScheme } = context
  const box = { x: 0, y: 0, width, height }

  ctx.clearRect(box.x, box.y, box.width, box.height)
  ctx.strokeStyle = colorScheme.border
  ctx.lineWidth = 2
  ctx.stroke(getBoxPath(box, 10))

  ctx.fillStyle = card.selected ? colorScheme.selected : colorScheme.faceUp
  ctx.fill(getBoxPath(box, 10, 0.5))

  for (const glyph of getGlyphLocations(context, card)) {
    ctx.fillStyle = isRed(card) ? colorScheme.red : colorScheme.black
    ctx.textAlign = glyph.textAlign
    ctx.textBaseline = glyph.textBaseline
    ctx.font = glyph.font
    if (glyph.rotated) {
      ctx.save()
      ctx.translate(width, height)
      ctx.rotate(Math.PI)
    }
    ctx.fillText(
      glyph.glyph,
      glyph.x + box.x * (glyph.rotated ? -1 : 1),
      glyph.y + box.y * (glyph.rotated ? -1 : 1),
    )
    if (glyph.rotated) ctx.restore()
  }
  return ctx.getImageData(box.x, box.y, box.width, box.height)
}

export const getErrorImageData: GetCard = ({
  ctx,
  cardWidth: width,
  cardHeight: height,
  colorScheme,
}: DrawingContext) => {
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
