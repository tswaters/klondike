export function removeListeners (disposables: Function[]) {
  disposables.forEach((disposable) => disposable())
}

export function addListener (
  element: HTMLElement,
  event: string,
  listener: EventListener | EventListenerObject,
  useCapture: boolean
): Function {
  element.addEventListener(event, listener, useCapture)
  return () => element.removeEventListener(event, listener, useCapture)
}

export const random = async (min: number, max: number): Promise<number> => {
  if (process.env.ISOLATED) {
    return Promise.resolve(Math.floor(Math.random() * max) + min)
  } else {
    const res = await fetch('/random', {
      method: 'POST',
      body: JSON.stringify({min, max}),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    const data: number = await res.json()
    return data
  }
}
