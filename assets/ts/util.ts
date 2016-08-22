namespace Program {

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

}
