import React, {Component} from 'react'

import LoadingSpinner from '../../../theme/spinners/Animation-Loader.svg'
import UndoClose from '../../../theme/icons/Undo-Close.svg'
import './index.css'

export default class UndoBar extends Component {
  constructor (props) {
    super(props)

    this.undoAction = this.undoAction.bind(this)
    this.undoDisplay = this.undoDisplay.bind(this)

    this.state = {
      clickable: true,
      loading: false
    }
  }

  componentDidMount () {
    if (this.props.timeoutLength > 0) {
      setTimeout(
        () => {
          this.props.closeUndoBar()
        },
        this.props.timeoutLength
      )
    }
  }

  undoAction (e) {
    e.stopPropagation()

    this.setState(
      {
        clickable: false,
        loading: true
      },
      () => {
        this.props.undoAction()
      }
    )
  }

  undoDisplay () {
    const undoLoadingClass = (!this.state.clickable) ? 'undo-bar__loading-container' : ''
    const loading = this.state.loading

    if (loading) {
      return (
        <div className={undoLoadingClass}>
          <LoadingSpinner className='undo-bar__loading-spinner' />
        </div>
      )
    } else {
      return (
        <span className='undo-bar__undo-action' onClick={this.undoAction}>Undo This Action</span>
      )
    }
  }

  render () {
    if (this.props.showUndo) {
      return (
        <div className='undo-bar'>
          <span className='undo-bar__message'>You have unpinned <span className='undo-bar__message-name'>{this.props.undoPatientName}</span> / </span>
          {this.undoDisplay()}
          <span className='undo-bar__close-action' onClick={this.props.closeUndoBar}><UndoClose /></span>
        </div>
      )
    } else {
      return null
    }
  }
}

UndoBar.propTypes = {
  undoPatientName: React.PropTypes.string.isRequired,
  showUndo: React.PropTypes.bool.isRequired,
  closeUndoBar: React.PropTypes.func.isRequired,
  undoAction: React.PropTypes.func.isRequired,
  timeoutLength: React.PropTypes.number
}
