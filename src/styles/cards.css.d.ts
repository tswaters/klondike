declare namespace CardsCssNamespace {
  export interface ICardsCss {
    fireworks: string
    game: string
    'new-game': string
    newGame: string
    score: string
    'switch-score-type': string
    switchScoreType: string
    version: string
  }
}

declare const CardsCssModule: CardsCssNamespace.ICardsCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: CardsCssNamespace.ICardsCss
}

export = CardsCssModule
