import * as React from 'react'
import { stock, waste, tableau, foundation } from '../../styles/cards.scss'
import { Stack, StackCard, StackType, StackDirection } from '../lib/Stack'

type CardClickEvent = (stack: Stack, card: StackCard) => void

type StackOwnProps = {
  type: StackType
  direction: StackDirection
  children?: React.ReactNode
  stack: Stack
  onClick?: CardClickEvent
  onDoubleClick?: CardClickEvent
  max: number
  hidden: boolean
  width: number
  height: number
  offset: number
  radius: number
  drawsLeft?: number
}

type StackConnectedProps = {}

type StackProps = StackOwnProps & StackConnectedProps

type Point = {
  x: number
  y: number
}

export class StackComponent extends React.PureComponent<StackProps> {
  static defaultProps = {
    max: Infinity,
    hidden: false,
    width: 74,
    height: 97,
    offset: 20,
    radius: 10,
  }

  private ref = React.createRef<HTMLCanvasElement>()

  constructor(props: StackProps) {
    super(props)
    this.handleCanvasClick = this.handleCanvasClick.bind(this)
    this.handleCanvasDoubleClick = this.handleCanvasDoubleClick.bind(this)
  }

  get stack_style(): string {
    switch (this.props.type) {
      case StackType.foundation:
        return foundation
      case StackType.tableau:
        return tableau
      case StackType.stock:
        return stock
      case StackType.waste:
        return waste
    }
  }

  get canvas_width() {
    switch (this.props.direction) {
      case StackDirection.none:
      case StackDirection.vertical:
        return this.props.width
      case StackDirection.horizontal:
        return this.cards.length === 0
          ? this.props.height
          : this.props.offset * (this.cards.length - 1) + this.props.width
    }
  }

  get canvas_height() {
    switch (this.props.direction) {
      case StackDirection.none:
      case StackDirection.horizontal:
        return this.props.height
      case StackDirection.vertical:
        return this.cards.length === 0
          ? this.props.height
          : this.props.offset * (this.cards.length - 1) + this.props.height
    }
  }

  get cards() {
    return this.props.stack.cards.slice(-this.props.max)
  }

  handleCanvasDoubleClick(evt: React.MouseEvent<Element>) {
    const { cards } = this
    const { stack, offset, direction, onDoubleClick } = this.props
    const { nativeEvent: e } = evt
    if (!onDoubleClick) {
      return
    }

    const prop = direction === StackDirection.horizontal ? 'offsetX' : 'offsetY'
    const index = Math.min(cards.length - 1, Math.floor(e[prop] / offset))
    onDoubleClick(stack, cards[index])
  }

  handleCanvasClick(evt: React.MouseEvent<Element>) {
    const { cards } = this
    const { stack, offset, direction, onClick } = this.props
    const { nativeEvent: e } = evt
    if (!onClick) {
      return
    }

    const prop = direction === StackDirection.horizontal ? 'offsetX' : 'offsetY'
    const index = Math.min(cards.length - 1, Math.floor(e[prop] / offset))
    onClick(stack, cards[index])
  }

  componentDidMount() {
    this.updateCanvas()
  }

  componentDidUpdate() {
    this.updateCanvas()
  }

  updateCanvas() {
    const canvas = this.ref.current
    if (!canvas) {
      return
    }

    const ctx = canvas.getContext('2d')
    if (!ctx) {
      return
    }

    const { cards } = this
    const { direction, offset } = this.props

    ctx.save()
    ctx.translate(0.5, 0.5)
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if (cards.length === 0) {
      this.drawBoxRadius(ctx, { x: 0, y: 0 })

      if (this.props.drawsLeft === 0) {
        ctx.save()
        ctx.font = '48px sans-serif'
        ctx.fillStyle = 'red'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText('X', this.props.width / 2, this.props.height / 2)
        ctx.restore()
      }
    }

    for (let i = 0; i < cards.length; i++) {
      const x = direction === StackDirection.horizontal ? i * offset : 0
      const y = direction === StackDirection.horizontal ? 0 : i * offset

      if (i < cards.length - 1) {
        ctx.save()
        this.drawClipRegion(ctx, { x, y })
      }

      this.drawCard(ctx, cards[i], { x, y })

      if (i < cards.length - 1) {
        ctx.restore()
      }
    }
    ctx.restore()
  }

  drawClipRegion(ctx: CanvasRenderingContext2D, { x, y }: Point) {
    const { direction, radius, offset, width, height } = this.props
    const clip_width = direction === StackDirection.horizontal ? offset : width
    const clip_height =
      direction === StackDirection.horizontal ? height : offset

    ctx.beginPath()
    if (direction === StackDirection.horizontal) {
      ctx.moveTo(x, y)
      ctx.lineTo(x + clip_width + radius, y)
      ctx.quadraticCurveTo(x + clip_width, y, x + clip_width, y + radius)
      ctx.lineTo(x + clip_width, y + clip_height - radius)
      ctx.quadraticCurveTo(
        x + clip_width,
        y + clip_height,
        x + clip_width + radius,
        y + clip_height
      )
      ctx.lineTo(x, y + clip_height)
    } else {
      ctx.moveTo(x + clip_width, y)
      ctx.lineTo(x + clip_width, y + clip_height + radius)
      ctx.quadraticCurveTo(
        x + clip_width,
        y + clip_height,
        x + clip_width - radius,
        y + clip_height
      )
      ctx.lineTo(x + radius, y + clip_height)
      ctx.quadraticCurveTo(x, y + clip_height, x, y + clip_height + radius)
      ctx.lineTo(x, y)
    }
    ctx.closePath()
    ctx.clip()
  }

  drawBoxRadius(ctx: CanvasRenderingContext2D, { x, y }: Point) {
    const { radius, height, width } = this.props
    ctx.beginPath()
    ctx.moveTo(x + radius, y)
    ctx.lineTo(x + width - radius, y)
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
    ctx.lineTo(x + width, y + height - radius)
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
    ctx.lineTo(x + radius, y + height)
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
    ctx.lineTo(x, y + radius)
    ctx.quadraticCurveTo(x, y, x + radius, y)
    ctx.closePath()
    ctx.stroke()
  }

  drawCard(
    ctx: CanvasRenderingContext2D,
    stack_card: StackCard,
    { x, y }: Point
  ) {
    const { card, hidden, selected } = stack_card

    this.drawBoxRadius(ctx, { x, y })

    if (hidden) {
      ctx.fillStyle = '#0aa'
      ctx.fill()
      return
    }

    if (selected) {
      ctx.fillStyle = 'yellow'
      ctx.fill()
    }

    const { value, suit, drawing } = card

    ctx.fillStyle = drawing.color
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'

    ctx.font = drawing.cornerFont
    ctx.fillText(value, drawing.valueXOffset + x, drawing.valueYOffset + y, 12)
    ctx.fillText(suit, drawing.suitXOffset + x, drawing.suitYOffset + y)

    ctx.save()
    ctx.translate(this.props.width, this.props.height)
    ctx.rotate(Math.PI)
    ctx.fillText(value, drawing.valueXOffset - x, drawing.valueYOffset - y, 12)
    ctx.fillText(suit, drawing.suitXOffset - x, drawing.suitYOffset - y)
    ctx.restore()

    ctx.textBaseline = 'middle'

    for (const pos of drawing.positions) {
      const factor = pos.rotated ? -1 : 1
      ctx.textAlign = pos.textAlign

      if (pos.rotated) {
        ctx.save()
        ctx.translate(this.props.width, this.props.height)
        ctx.rotate(Math.PI)
      }

      ctx.font = `${drawing.fontSize} sans-serif`
      ctx.fillText(suit, pos.left + x * factor, pos.top + y * factor)

      if (pos.rotated) {
        ctx.restore()
      }
    }
  }

  render() {
    return (
      <canvas
        onDoubleClick={this.handleCanvasDoubleClick}
        onClick={this.handleCanvasClick}
        className={this.stack_style}
        width={this.canvas_width + 1}
        height={this.canvas_height + 1}
        ref={this.ref}
      />
    )
  }
}
