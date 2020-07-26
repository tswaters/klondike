declare namespace IndexCssNamespace {
  export interface IIndexCss {
    fireworks: string
    game: string
    gameNumberLabel: string
    optionsButton: string
    optionsMask: string
    optionsModal: string
    scoreLabel: string
    topBar: string
  }
}

declare const IndexCssModule: IndexCssNamespace.IIndexCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: IndexCssNamespace.IIndexCss
}

export = IndexCssModule
