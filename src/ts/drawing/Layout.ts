import { DrawingContext, Box } from './Common'
import { Stack, StackDirection, StackType } from '../lib/Card'

export const getStackCardOffsetWidth = (ctx: DrawingContext) => Math.floor(ctx.height * 0.03)

export const getStackCardOffsetHeight = (ctx: DrawingContext) => Math.floor(ctx.height * 0.03)

export const getVerticalMarginSize = (ctx: DrawingContext) => Math.floor(ctx.height * 0.01)

export const getHorizontalMarginSize = (ctx: DrawingContext) => Math.floor(ctx.width * 0.01)

export const getTopbarBox = (): Box => ({ x: 0, y: 0, width: 0, height: 30 })

// the goal is to find the highest possible card width/height satisfying the desired ratio
// assuming a fixed top-bar height with no margin, ( it will account for its own padding )
// and 1 vertical separator + 6 horizontal separators
// also, need room to stack 13 stack + 6 hidden => 19 cards.
// without exceeding the size of the window.

export const getCardBox = (ctx: DrawingContext): Box => {
  const horizontalMargin = getHorizontalMarginSize(ctx)
  const verticalMargin = getVerticalMarginSize(ctx)
  const topBarBox = getTopbarBox()
  const stackCardOffsetHeight = getStackCardOffsetHeight(ctx)

  const usedVerticalSpace = topBarBox.height + verticalMargin * 2 + stackCardOffsetHeight * 19
  const usedHorizontalSpace = horizontalMargin * 6

  const maxWidth = Math.floor((ctx.width - usedHorizontalSpace) / 7)
  const maxHeight = Math.floor((ctx.height - usedVerticalSpace) / 1.5)

  const DESIRED_RATIO = 1.618 // try to get golden ratio size cards
  const width = maxWidth * DESIRED_RATIO < maxHeight ? maxWidth : maxHeight / DESIRED_RATIO
  const height = maxWidth * DESIRED_RATIO < maxHeight ? maxWidth * DESIRED_RATIO : maxHeight

  return {
    x: 0,
    y: 0,
    width: Math.floor(width),
    height: Math.floor(height),
  }
}

export const getStackBox = (ctx: DrawingContext, stack: Stack, max: number): Box => {
  const verticalMargin = getVerticalMarginSize(ctx)
  const horizontalMargin = getHorizontalMarginSize(ctx)
  const topBar = getTopbarBox()
  const cardBox = getCardBox(ctx)
  const cardLength = Math.min(stack.cards.length, max)

  // we know horizontal space used
  // it might be less than available width
  // base x width is half that available space (for centering)

  const usedWidth = horizontalMargin * 6 + cardBox.width * 7
  const baseX = usedWidth < ctx.width ? (ctx.width - usedWidth) / 2 : 0

  const width =
    stack.direction === StackDirection.horizontal
      ? cardLength === 0
        ? cardBox.height
        : getStackCardOffsetWidth(ctx) * (cardLength - 1) + cardBox.width
      : cardBox.width

  const height =
    stack.direction === StackDirection.vertical
      ? cardLength === 0
        ? cardBox.height
        : getStackCardOffsetHeight(ctx) * (cardLength - 1) + cardBox.height
      : cardBox.height

  switch (stack.type) {
    case StackType.stock:
      return {
        y: topBar.height + verticalMargin,
        x: baseX,
        width,
        height,
      }
    case StackType.waste:
      return {
        y: topBar.height + verticalMargin,
        x: baseX + horizontalMargin + cardBox.width,
        width,
        height,
      }
    case StackType.foundation:
      return {
        y: topBar.height + verticalMargin,
        x: baseX + 3 * horizontalMargin + 3 * cardBox.width + stack.index * (horizontalMargin + cardBox.width),
        width,
        height,
      }
    case StackType.tableau:
      return {
        y: topBar.height + verticalMargin * 3 + cardBox.height,
        x: baseX + stack.index * (horizontalMargin + cardBox.width),
        width,
        height,
      }
  }
}
