import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getScoringType, getTheme, getGameNumber } from '../redux/selectors'
import { ScoringType, changeTheme, setGameNumber } from '../redux/game-state'
import { initialize } from '../redux/thunks'
import { ColorSchemeType } from '../drawing/ColorScheme'

type OptionContextType = {
  add: (cb: () => void) => void
  remove: (cb: () => void) => void
}

export const OptionCtx = React.createContext<OptionContextType | null>(null)

type OptionType<T = number> = React.HTMLAttributes<HTMLFieldSetElement> & {
  name: string
  label: string
  selector: (arg0: unknown) => T
  action: (arg0: T) => void
  options?: [string, T][]
}

const Option: React.FC<OptionType> = React.memo(({ name, options = [], label, selector, action, ...props }) => {
  const optionCtx = React.useContext(OptionCtx)
  const dispatch = useDispatch()
  const thing = useSelector(selector)
  const [newThing, setNewThing] = React.useState(thing)

  const handleChangeThing = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setNewThing(parseInt(e.target.value, 10)),
    [],
  )

  const handleSubmit = React.useCallback(() => {
    if (newThing !== thing) dispatch(action(newThing))
  }, [dispatch, action, thing, newThing])

  React.useEffect(() => {
    if (optionCtx == null) return
    optionCtx.add(handleSubmit)
    return () => optionCtx.remove(handleSubmit)
  })

  return (
    <fieldset {...props}>
      <legend>{label}</legend>
      {options.length === 0 ? (
        <div>
          <label htmlFor={`option-${name}`} style={{ display: 'none' }}>
            {label}
          </label>
          <input type="text" id={`option-${name}`} value={newThing} onChange={handleChangeThing} />
        </div>
      ) : (
        options.map(([label, option]) => (
          <div key={label.toString()}>
            <input
              type="radio"
              id={`${name}-${label}`}
              checked={newThing === option}
              value={option}
              onChange={handleChangeThing}
            />
            <label htmlFor={`${name}-${label}`}>{label}</label>
          </div>
        ))
      )}
    </fieldset>
  )
})

Option.displayName = 'Option'

const gameTypeOptions: [string, ScoringType][] = [
  ['Regular', ScoringType.regular],
  ['Vegas', ScoringType.vegas],
]

const colorSchemeOptions: [string, ColorSchemeType][] = [
  ['Dark', ColorSchemeType.dark],
  ['Light', ColorSchemeType.light],
]

type OptionContainerProps = { onClose(): void } & React.HTMLAttributes<HTMLFormElement>

const Options: React.FC<OptionContainerProps> = React.memo(({ onClose, ...props }) => {
  const options = React.useRef<Set<() => void>>(new Set())

  const value = React.useMemo(
    () => ({
      add: (cb: () => void) => options.current.add(cb),
      remove: (cb: () => void) => options.current.delete(cb),
    }),
    [],
  )

  const handleSubmit = React.useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      options.current.forEach((cb) => cb())
      onClose()
    },
    [onClose],
  )

  return (
    <form onSubmit={handleSubmit} {...props}>
      <OptionCtx.Provider value={value}>
        <Option name="game-number" label="Game Number" selector={getGameNumber} action={setGameNumber} />
        <Option name="type" label="Game Type" selector={getScoringType} action={initialize} options={gameTypeOptions} />
        <Option name="theme" label="Theme" selector={getTheme} action={changeTheme} options={colorSchemeOptions} />
      </OptionCtx.Provider>
      <button type="submit">Save</button>
    </form>
  )
})

Options.displayName = 'OptionContainer'

export { Options }
export default React.memo(Options)
