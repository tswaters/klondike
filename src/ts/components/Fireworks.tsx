import * as React from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import * as FireworksCanvas from 'fireworks-canvas'

import { fireworks } from '../../styles/cards.scss'
import { StoreState } from '../redux'
import { getFoundation } from '../redux/selectors'

type FireworksConnectedProps = {
  active: boolean
}

type FireworksProps = FireworksConnectedProps

class Fireworks extends React.PureComponent<FireworksProps> {
  ref: React.RefObject<HTMLDivElement>
  fireworks: FireworksCanvas

  constructor(props: FireworksProps) {
    super(props)
    this.ref = React.createRef()
    this.handleDocumentKeyDown = this.handleDocumentKeyDown.bind(this)
  }

  handleDocumentKeyDown(ev: KeyboardEvent) {
    if (ev.keyCode === 27) {
      this.fireworks.stop()
    }
  }

  componentDidMount() {
    if (!this.ref.current) {
      return null
    }
    this.fireworks = new FireworksCanvas(this.ref.current)
  }

  componentDidUpdate() {
    if (this.props.active) {
      document.addEventListener('keydown', this.handleDocumentKeyDown)
      this.fireworks.start()
    } else {
      document.removeEventListener('keydown', this.handleDocumentKeyDown)
      this.fireworks.kill()
    }
  }

  componentWillUnmount() {
    this.fireworks.destroy()
  }

  render() {
    return <div className={fireworks} ref={this.ref} />
  }
}

const selector = createSelector(
  [getFoundation],
  ({ stacks: foundation }) => ({
    active: foundation.every(stack => stack.cards.length === 13)
  })
)

const mapStateToProps = (state: StoreState): FireworksConnectedProps =>
  selector(state)

export default connect(mapStateToProps)(Fireworks)
