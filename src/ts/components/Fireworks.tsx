import * as React from 'react'
import { useSelector } from 'react-redux'
import * as FireworksCanvas from 'fireworks-canvas'
import { getFoundation } from '../redux/selectors'

const Fireworks: React.FC = () => {
  const ref = React.useRef<HTMLDivElement>(null)
  const fireworksObj = React.useRef<FireworksCanvas>()
  const { stacks: foundation } = useSelector(getFoundation)
  const active = foundation.every((stack) => stack.cards.length === 13)
  const display = active ? '' : 'none'

  React.useEffect(() => {
    if (ref.current == null) return
    fireworksObj.current = new FireworksCanvas(ref.current)

    const handleDocumentKeyDown = (ev: KeyboardEvent) => {
      if (ev.keyCode === 27) fireworksObj.current?.stop()
    }

    document.addEventListener('keydown', handleDocumentKeyDown)

    return () => {
      fireworksObj.current?.destroy()
    }
  }, [ref, active])

  React.useEffect(() => {
    if (active) {
      fireworksObj.current?.stop()
    } else {
      fireworksObj.current?.start()
    }
  }, [active])

  return (
    <div
      style={{
        display,
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        position: 'absolute',
      }}
      ref={ref}
    />
  )
}

export default React.memo(Fireworks)
