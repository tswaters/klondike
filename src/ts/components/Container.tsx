
import * as React from 'react'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import {StackComponent} from './Stack'
import FireworksComponent from './Fireworks'
import {container, top, play, newGame, score, version} from '../../styles/cards.scss'
import {StoreState, ThunkDispatch} from '../redux'
import {Stack, StackCard, StackType, StackDirection} from '../lib/Stack'
import {initialize, clickStock, clickTableau, clickWaste, clickFoundation, doubleClick} from '../redux/actions'
import {WasteStore} from '../redux/waste'
import {getWaste, getTableau, getFoundation, getStock, getScore} from '../redux/selectors'
import {undo, redo} from '../redux/undoable'
import {StockStore} from '../redux/stock'

type ContainerConnectedProps = {
  tableau: Stack[],
  foundation: Stack[],
  stock: StockStore,
  waste: WasteStore,
  score: number
}

type ContainerActionProps = {
  handleNewGame: () => void
  handleStockClick: (stack: Stack, card?: StackCard) => void,
  handleTableauClick: (stack: Stack, card?: StackCard) => void,
  handleWasteClick: (stack: Stack, card?: StackCard) => void,
  handleFoundationClick: (stack: Stack, card?: StackCard) => void,
  handleDoubleClick: (stack: Stack, card?: StackCard) => void,
  handleUndo: () => void,
  handleRedo: () => void
}

type ContainerProps = ContainerConnectedProps & ContainerActionProps

class ContainerComponent extends React.PureComponent<ContainerProps> {

  constructor (props: ContainerProps) {
    super(props)
    this.handleNewGameClick = this.handleNewGameClick.bind(this)
    this.handleStockClick = this.handleStockClick.bind(this)
    this.handleTableauClick = this.handleTableauClick.bind(this)
    this.handleWasteClick = this.handleWasteClick.bind(this)
    this.handleFoundationClick = this.handleFoundationClick.bind(this)
    this.handleDoubleClick = this.handleDoubleClick.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  componentDidMount () {
    document.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  handleNewGameClick () {
    this.props.handleNewGame()
  }

  handleKeyDown (e: KeyboardEvent) {
    if (e.keyCode !== 90) { return }
    if (e.ctrlKey && e.shiftKey) {
      this.props.handleRedo()
    } else if (e.ctrlKey) {
      this.props.handleUndo()
    }
  }

  handleStockClick (stack: Stack, card?: StackCard) {
    this.props.handleStockClick(stack, card)
  }

  handleTableauClick (stack: Stack, card?: StackCard) {
    this.props.handleTableauClick(stack, card)
  }

  handleWasteClick (stack: Stack, card?: StackCard) {
    this.props.handleWasteClick(stack, card)
  }

  handleFoundationClick (stack: Stack, card?: StackCard) {
    this.props.handleFoundationClick(stack, card)
  }

  handleDoubleClick (stack: Stack, card?: StackCard) {
    this.props.handleDoubleClick(stack, card)
  }

  render () {
    return (
      <div className={container}>
        <FireworksComponent/>
        <div>
          <button id="new-game" className={newGame} onClick={this.handleNewGameClick}>
            {'New Game'}
          </button>
          <label id="score" className={score}>
            {'Score: '}
            {this.props.score}
          </label>
        </div>
        <div className={top}>
          <StackComponent
            stack={this.props.stock.stacks[0]}
            onClick={this.handleStockClick}
            direction={StackDirection.none}
            type={StackType.stock}
            hidden={true}
            max={1}
          />
          <StackComponent
            stack={this.props.waste.stacks[0]}
            onClick={this.handleWasteClick}
            onDoubleClick={this.handleDoubleClick}
            direction={StackDirection.horizontal}
            type={StackType.waste}
            hidden={false}
            max={this.props.waste.showing}
            offset={15}
          />
          {this.props.foundation.map((stack, index) => (
            <StackComponent
              key={`foundation-${index}`}
              onClick={this.handleFoundationClick}
              stack={stack}
              direction={StackDirection.none}
              type={StackType.foundation}
              max={1}
            />
          ))}
        </div>
        <div className={play}>
          {this.props.tableau.map((stack, index) => (
            <StackComponent
              key={`tableau-${index}`}
              onClick={this.handleTableauClick}
              onDoubleClick={this.handleDoubleClick}
              stack={stack}
              direction={StackDirection.vertical}
              type={StackType.tableau}
            />
          ))}
        </div>
        <div className={version}>
          {process.env.version}
        </div>
      </div>
    )
  }
}

const selector = createSelector([
  getTableau,
  getFoundation,
  getStock,
  getWaste,
  getScore
], (
  {stacks: tableau},
  {stacks: foundation},
  stock,
  waste,
  {score}
) => ({
  tableau,
  foundation,
  stock,
  waste,
  score
}))

const mapDispatchToProps = (dispatch: ThunkDispatch): ContainerActionProps => ({
  handleNewGame: () => dispatch(initialize()),
  handleStockClick: () => dispatch(clickStock()),
  handleTableauClick: (stack, card) => dispatch(clickTableau(stack, card)),
  handleWasteClick: (stack, card) => dispatch(clickWaste(stack, card)),
  handleFoundationClick: (stack, card) => dispatch(clickFoundation(stack, card)),
  handleDoubleClick: (stack, card) => dispatch(doubleClick(stack, card)),
  handleUndo: () => dispatch(undo()),
  handleRedo: () => dispatch(redo())
})

const mapStateToProps = (state: StoreState): ContainerConnectedProps => selector(state)

export const Container = connect(mapStateToProps, mapDispatchToProps)(ContainerComponent)
