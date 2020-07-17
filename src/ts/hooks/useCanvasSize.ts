import * as React from 'react'
import { SizeDetails } from '../drawing/Common'

type CanvasSizeReturn = {
  ctx?: CanvasRenderingContext2D
  width?: number
  height?: number
  handleCanvasRef: (canvas: HTMLCanvasElement) => void
}

export const useCanvasSize = (): CanvasSizeReturn => {
  const [canvas, setCanvas] = React.useState<HTMLCanvasElement | null>(null)
  const handleCanvasRef = React.useCallback((canvas: HTMLCanvasElement) => canvas && setCanvas(canvas), [])

  const getSize = () => ({ width: window.innerWidth, height: window.innerHeight })

  const [size, setSize] = React.useState<SizeDetails>()

  React.useEffect(() => {
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (ctx == null) return
    let tid: number
    const handleSize = () => {
      if (tid) clearTimeout(tid)
      tid = window.setTimeout(() => setSize(getSize()), 300)
    }
    window.addEventListener('resize', handleSize)
    return () => {
      window.removeEventListener('resize', handleSize)
    }
  })

  const retVal = React.useMemo(
    () => ({
      handleCanvasRef,
      ...(canvas && {
        ctx: canvas.getContext('2d') as CanvasRenderingContext2D,
        ...(size ?? getSize()),
      }),
    }),
    [size, handleCanvasRef, canvas],
  )

  return retVal
}
