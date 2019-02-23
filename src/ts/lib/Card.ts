const WIDTH = 75
const HEIGHT = 97

export enum ValueType {
  ace = 'A',
  two = '2',
  three = '3',
  four = '4',
  five = '5',
  six = '6',
  seven = '7',
  eight = '8',
  nine = '9',
  ten = '10',
  jack = 'J',
  queen = 'Q',
  king = 'K'
}

enum SuitType {
  heart = '\u2665',
  diamond = '\u2666',
  spade = '\u2660',
  club = '\u2663'
}

type Position = {
  left: number
  top: number
  rotated: boolean
  textAlign: CanvasTextAlign
}

type Drawing = {
  color: string
  cornerFont: string
  fontSize: string
  suitXOffset: number
  suitYOffset: number
  valueXOffset: number
  valueYOffset: number
  positions: Position[]
}

export type Card = {
  suit: SuitType
  value: ValueType
  drawing: Drawing
  isRed: boolean
  isBlack: boolean
}

export const Cards: Card[] = []
for (const [, value] of Object.entries(ValueType)) {
  for (const [, suit] of Object.entries(SuitType)) {
    Cards.push({
      suit,
      value,
      isRed: [SuitType.diamond, SuitType.heart].indexOf(suit) > -1,
      isBlack: [SuitType.club, SuitType.spade].indexOf(suit) > -1,
      drawing: getDrawing(suit, value)
    })
  }
}

function getDrawing(suit: SuitType, value: ValueType): Drawing {
  type ypos = 0 | 1 | 2 | 3 | 4 | 5 | 6
  type xpos = 0 | 1 | 2

  const color =
    [SuitType.diamond, SuitType.heart].indexOf(suit) > -1 ? 'red' : 'black'

  const fontSize =
    [ValueType.ace, ValueType.jack, ValueType.queen, ValueType.king].indexOf(
      value
    ) > -1
      ? '72px'
      : '20px'

  const pos: { x: xpos; y: ypos }[] = []

  if (
    [
      ValueType.ace,
      ValueType.three,
      ValueType.five,
      ValueType.nine,
      ValueType.jack,
      ValueType.queen,
      ValueType.king
    ].indexOf(value) > -1
  ) {
    pos.push({ x: 1, y: 3 })
  }

  if ([ValueType.two, ValueType.three].indexOf(value) > -1) {
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
      ValueType.ten
    ].indexOf(value) > -1
  ) {
    pos.push({ x: 0, y: 0 }, { x: 2, y: 0 }, { x: 0, y: 6 }, { x: 2, y: 6 })
  }

  if ([ValueType.six, ValueType.seven, ValueType.eight].indexOf(value) > -1) {
    pos.push({ x: 0, y: 3 }, { x: 2, y: 3 })
  }

  if ([ValueType.seven, ValueType.ten, ValueType.eight].indexOf(value) > -1) {
    pos.push({ x: 1, y: 1 })
  }

  if ([ValueType.nine, ValueType.ten].indexOf(value) > -1) {
    pos.push({ x: 0, y: 2 }, { x: 2, y: 2 }, { x: 0, y: 4 }, { x: 2, y: 4 })
  }

  if ([ValueType.ten, ValueType.eight].indexOf(value) > -1) {
    pos.push({ x: 1, y: 5 })
  }

  const getTop = (y: ypos) => {
    switch (y) {
      case 0:
      case 6:
        return HEIGHT * 0.2
      case 1:
      case 5:
        return HEIGHT * 0.3
      case 2:
      case 4:
        return HEIGHT * 0.4
      case 3:
        return HEIGHT * 0.5
    }
  }

  const getLeft = (x: xpos) => {
    switch (x) {
      case 0:
        return WIDTH * 0.25
      case 1:
        return WIDTH * 0.5
      case 2:
        return WIDTH * 0.75
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

  const positions: Position[] = pos.map(({ x, y }) => {
    return {
      textAlign: getTextAlign(x),
      rotated: y > 3,
      left: getLeft(x),
      top: getTop(y)
    }
  })

  return {
    cornerFont: 'bold 15px sans-serif',
    valueXOffset: 9,
    valueYOffset: 2,
    suitXOffset: 9,
    suitYOffset: 12,
    color,
    fontSize,
    positions
  }
}
