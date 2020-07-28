declare namespace IndexCssNamespace {
  export interface IIndexCss {
    button: string
    fireworks: string
    game: string
    label: string
    optionsMask: string
    optionsModal: string
    topBar: string
  }
}

declare const IndexCssModule: IndexCssNamespace.IIndexCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: IndexCssNamespace.IIndexCss
}

export = IndexCssModule
