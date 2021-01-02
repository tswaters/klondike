// add variables to `style` declaration
declare module 'csstype' {
  interface Properties {
    '--background'?: string
    '--emptyColor'?: string
    '--faceUp'?: string
    '--hiddenColor1'?: string
    '--hiddenColor2'?: string
    '--buttonBorder'?: string
    '--cardBorder'?: string
    '--black'?: string
    '--red'?: string
    '--selected'?: string
    '--errorColor'?: string
    '--labelColor'?: string
  }
}

export enum ColorSchemeType {
  dark = 'dark',
  light = 'light',
}

export type ColorScheme = {
  background: string
  hiddenColor1: string
  hiddenColor2: string
  buttonBorder: string
  cardBorder: string
  faceUp: string
  selected: string
  red: string
  black: string
  emptyColor: string
  errorColor: string
  color: string
}

export const colorSchemes: { [key in ColorSchemeType]: ColorScheme } = {
  [ColorSchemeType.dark]: {
    background: '#000',
    color: '#fff',
    emptyColor: '#060606',
    faceUp: '#ddd',
    hiddenColor1: '#404dac',
    hiddenColor2: '#263278',
    buttonBorder: '#ddd',
    cardBorder: '#000',
    black: '#505050',
    red: '#f03a17',
    selected: '#fff000',
    errorColor: '#900',
  },
  [ColorSchemeType.light]: {
    background: '#ffffff',
    color: '#000',
    emptyColor: '#f5f5f5',
    faceUp: '#ddd',
    hiddenColor1: '#606dbc',
    hiddenColor2: '#465298',
    buttonBorder: '#000',
    cardBorder: '#000',
    black: '#505050',
    red: '#f03a17',
    selected: '#fff000',
    errorColor: 'red',
  },
}
