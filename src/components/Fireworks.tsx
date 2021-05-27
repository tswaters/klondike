import * as React from 'react'
import { useSelector } from 'react-redux'
import * as FireworksCanvas from 'fireworks-canvas'
import { getGameWon } from '../redux/selectors'
import { fireworks } from '../css/index.css'

const Fireworks: React.FC = () => {
  const ref = React.useRef<HTMLDivElement>(null)
  const fireworksObj = React.useRef<FireworksCanvas>()
  const active = useSelector(getGameWon)
  const display = active ? '' : 'none'

  React.useEffect(() => {
    if (ref.current == null) return
    fireworksObj.current = new FireworksCanvas(ref.current)

    const handleDocumentKeyDown = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') fireworksObj.current?.stop()
    }

    document.addEventListener('keydown', handleDocumentKeyDown)

    return () => {
      fireworksObj.current?.destroy()
    }
  }, [ref, active])

  React.useEffect(() => {
    if (active) {
      fireworksObj.current?.start()
    } else {
      fireworksObj.current?.stop()
    }
  }, [active])

  return <div className={fireworks} style={{ display, zIndex: 5 }} ref={ref} />
}

export default React.memo(Fireworks)
