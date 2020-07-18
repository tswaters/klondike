export enum ColorSchemeType {
  dark,
  light,
}

export type ColorScheme = {
  background: string
  faceDown: string
  buttonBorder: string
  cardBorder: string
  faceUp: string
  selected: string
  red: string
  black: string
  emptyColor: string
  errorColor: string
}

export const colorSchemes: { [key in ColorSchemeType]: ColorScheme } = {
  [ColorSchemeType.dark]: {
    background: '#000',
    emptyColor: '#060606',
    faceUp: '#222',
    faceDown: '#333',
    buttonBorder: '#ddd',
    cardBorder: '#000',
    black: '#999',
    red: '#900',
    selected: '#660',
    errorColor: '#900',
  },
  [ColorSchemeType.light]: {
    background: '#fff',
    emptyColor: '#eee',
    faceUp: '#ddd',
    faceDown: '#ccc',
    buttonBorder: '#000',
    cardBorder: '#333',
    black: '#333',
    red: 'crimson',
    selected: 'yellow',
    errorColor: 'red',
  },
}
