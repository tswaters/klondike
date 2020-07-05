export enum ColorSchemeType {
  dark,
  light,
}

export type ColorScheme = {
  faceDown: string
  border: string
  faceUp: string
  selected: string
  red: string
  black: string
  emptyColor: string
  errorColor: string
}

export const colorSchemes: { [key in ColorSchemeType]: ColorScheme } = {
  [ColorSchemeType.dark]: {
    faceUp: '#111',
    faceDown: '#333',
    border: '#aaa',
    selected: '#660',
    red: '#600',
    black: '#777',
    errorColor: 'red',
    emptyColor: '#333',
  },
  [ColorSchemeType.light]: {
    faceUp: '#eee',
    faceDown: '#ddd',
    border: '#333',
    selected: 'yellow',
    red: 'crimson',
    black: '#333',
    errorColor: 'red',
    emptyColor: '#fff',
  },
}

// export { colorSchemes }
