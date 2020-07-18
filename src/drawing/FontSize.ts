const allFontSizes = Array.from<number, number>({ length: 200 }, (v, k) => k)

interface isBigEnough {
  (width: number, height: number): boolean
}

export const measureWidth = (ctx: CanvasRenderingContext2D, font: string, text: string) => {
  ctx.font = font
  return ctx.measureText(text).width
}

export const measureHeight = (ctx: CanvasRenderingContext2D, font: string) => {
  ctx.font = font
  return ctx.measureText('M').width // close enough
}

const searchFontSize = (
  ctx: CanvasRenderingContext2D,
  isBigEnough: isBigEnough,
  text: string,
  min: number,
  max: number,
): string => {
  const index = Math.floor((max + min) / 2)
  const font = `${allFontSizes[index]}px sans-serif`
  const width = measureWidth(ctx, font, text)
  const height = measureHeight(ctx, font)
  if (min > max) return font
  if (isBigEnough(width, height)) return searchFontSize(ctx, isBigEnough, text, min, index - 1)
  return searchFontSize(ctx, isBigEnough, text, index + 1, max)
}

export const search = (ctx: CanvasRenderingContext2D, isBigEnough: isBigEnough, text: string) =>
  searchFontSize(ctx, isBigEnough, text, 0, allFontSizes.length - 1)
