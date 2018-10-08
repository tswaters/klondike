
import * as React from 'react'
import {connect} from 'react-redux'
import {createSelector} from 'reselect'
import {StackComponent} from './Stack'
import {container, top, play, newGame, score, version} from '../../styles/cards.scss'
import {StoreState, ThunkDispatch} from '../redux'
import {Stack, StackCard, StackType, StackDirection} from '../lib/Stack'
import {initialize, clickStock, clickTableau, clickWaste, clickFoundation, doubleClick} from '../redux/actions'
import {WasteStore} from '../redux/waste'
import {getWaste, getTableau, getFoundation, getStock, getScore} from '../redux/selectors'

type ContainerConnectedProps = {
  tableau: Stack[],
  foundation: Stack[],
  stock: Stack,
  waste: WasteStore,
  score: number
}

type ContainerActionProps = {
  handleNewGame: () => void
  handleStockClick: (stack: Stack, card?: StackCard) => void,
  handleTableauClick: (stack: Stack, card?: StackCard) => void,
  handleWasteClick: (stack: Stack, card?: StackCard) => void,
  handleFoundationClick: (stack: Stack, card?: StackCard) => void,
  handleDoubleClick: (stack: Stack, card?: StackCard) => void
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
  }

  handleNewGameClick () {
    this.props.handleNewGame()
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
            stack={this.props.stock}
            onClick={this.handleStockClick}
            direction={StackDirection.none}
            type={StackType.stock}
            hidden={true}
          />
          <StackComponent
            stack={this.props.waste.stacks[0]}
            onClick={this.handleWasteClick}
            onDoubleClick={this.handleDoubleClick}
            direction={StackDirection.horizontal}
            type={StackType.waste}
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
  {stack: stock},
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
  handleDoubleClick: (stack, card) => dispatch(doubleClick(stack, card))
})

const mapStateToProps = (state: StoreState): ContainerConnectedProps => selector(state)

export const Container = connect(mapStateToProps, mapDispatchToProps)(ContainerComponent)
