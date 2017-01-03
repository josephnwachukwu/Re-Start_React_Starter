import React, { Component, PropTypes } from 'react'

import { setPinnedStatus } from './Api'

import Pin from '../../../theme/icons/Pinned.svg'
import Unpin from '../../../theme/icons/Unpinned.svg'

import './index.css'

export default class PinButton extends Component {
  constructor (props) {
    super(props)

    this.state = {
      clickable: true
    }

    this.onClick = this.onClick.bind(this)
  }

  onClick (e) {
    e.stopPropagation()
    const newPinnedStatus = !this.props.pinned

    if (this.state.clickable) {
      this.setState(
        { clickable: false },
        () => {
          setPinnedStatus(this.props.claimId, newPinnedStatus)
            .then((response) => {
              // Call parent handler on success of API call
              this.props.updatePinnedStatus(this.props.claimId, newPinnedStatus)

              this.setState({
                clickable: true
              })
            })
        }
      )
    }
  }

  render () {
    const disabledClass = (!this.state.clickable) ? 'disabled' : ''
    const pinnedClass = this.props.pinned ? 'pin-button--pinned' : 'pin-button--unpinned'

    return (
      <div className='pin-button-container'>
        <div
          className={`pin-button ${pinnedClass} ${disabledClass}`}
          onClick={this.onClick}>
          {this.props.pinned ? <Pin /> : <Unpin />}
        </div>
      </div>
    )
  }
}

PinButton.propTypes = {
  claimId: PropTypes.string,
  pinned: PropTypes.bool,
  updatePinnedStatus: PropTypes.func
}
