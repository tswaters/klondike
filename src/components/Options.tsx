import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ScoringType } from '../lib/Scoring'
import { ColorSchemeType } from '../drawing/ColorScheme'
import { getType, getTheme, getNumber } from '../redux/selectors'
import { changeTheme } from '../redux/game-state'
import { newNumber, newType } from '../redux/thunks'

const submitCallbacks: Set<() => void> = new Set()
export const OptionCtx = React.createContext(submitCallbacks)

type OptionType = React.HTMLAttributes<HTMLFieldSetElement> & {
  name: string
  label: string
  value: unknown
  onChange: (arg0: unknown) => void
  options?: [string, unknown][]
}

const Option: React.FC<OptionType> = React.memo(({ value, onChange, name, options = [], label, ...props }) => {
  const [newValue, setValue] = React.useState(value)

  const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value), [])

  const handleSubmit = React.useCallback(() => {
    if (newValue !== value) onChange(newValue)
  }, [value, newValue, onChange])

  React.useEffect(() => {
    submitCallbacks.add(handleSubmit)
    return () => {
      submitCallbacks.delete(handleSubmit)
    }
  })

  return (
    <fieldset {...props}>
      <legend>{label}</legend>
      {options.length === 0 ? (
        <div>
          <label htmlFor={`option-${name}`} style={{ display: 'none' }}>
            {label}
          </label>
          <input type="text" id={`option-${name}`} value={String(newValue)} onChange={handleChange} />
        </div>
      ) : (
        options.map(([label, option]) => (
          <div key={label.toString()}>
            <input
              type="radio"
              id={`${name}-${label}`}
              checked={newValue === option}
              value={String(option)}
              onChange={handleChange}
            />
            <label htmlFor={`${name}-${label}`}>{label}</label>
          </div>
        ))
      )}
    </fieldset>
  )
})

Option.displayName = 'Option'

const typeOptions: [string, ScoringType][] = [
  ['Regular', ScoringType.regular],
  ['Vegas', ScoringType.vegas],
]

const colorSchemeOptions: [string, ColorSchemeType][] = [
  ['Dark', ColorSchemeType.dark],
  ['Light', ColorSchemeType.light],
]

type OptionContainerProps = { onClose(): void } & React.HTMLAttributes<HTMLFormElement>

const Options: React.FC<OptionContainerProps> = React.memo(({ onClose, ...props }) => {
  const handleSubmit = React.useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      submitCallbacks.forEach((cb) => cb())
      onClose()
    },
    [onClose],
  )

  const dispatch = useDispatch()
  const type = useSelector(getType)
  const theme = useSelector(getTheme)
  const gameNumber = useSelector(getNumber)

  const handleNewNumber = React.useCallback((number) => dispatch(newNumber(parseInt(number, 10))), [dispatch])
  const handleNewType = React.useCallback((type) => dispatch(newType(type)), [dispatch])
  const handleNewTheme = React.useCallback((theme) => dispatch(changeTheme(theme)), [dispatch])

  return (
    <form onSubmit={handleSubmit} {...props}>
      <Option name="game-number" label="Game Number" value={gameNumber} onChange={handleNewNumber} />
      <Option name="type" label="Game Type" value={type} onChange={handleNewType} options={typeOptions} />
      <Option name="theme" label="Theme" value={theme} onChange={handleNewTheme} options={colorSchemeOptions} />
      <button type="submit">Save</button>
    </form>
  )
})

Options.displayName = 'OptionContainer'

export { Options }
export default React.memo(Options)
