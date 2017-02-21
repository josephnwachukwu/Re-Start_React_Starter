import React, {Component, PropTypes} from 'react'

import './index.css'

export default class Modal extends Component {
  constructor (props) {
    super(props)

    this.renderButton = this.renderButton.bind(this)
  }

  renderButton (name, index) {
    let buttonClasses = 'modal__button modal__button--normal'
    if (this.props.defaultButton === index) {
      buttonClasses = 'modal__button modal__button--default'
    }
    return (
      <button
        key={index}
        className={buttonClasses}
        onClick={() => this.props.buttonCallbacks[index] && this.props.buttonCallbacks[index]()}>
        <div className='modal__button-text'>{name}</div>
      </button>
    )
  }

  render () {
    const { showModal } = this.props

    if (showModal) {
      return (
        <div className='modal__backdrop'>
          <div className='modal__main-container'>
            <div className='modal__body-container'>
              {this.props.children}
            </div>
            <div className='modal__buttons-container'>
              {this.props.buttons.map(this.renderButton)}
            </div>
          </div>
        </div>
      )
    } else {
      return null
    }
  }
}

const NOOP = () => {}

Modal.defaultProps = {
  buttons: ['Save', 'Cancel'],
  buttonCallbacks: [NOOP, NOOP],
  defaultButton: 0
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  showModal: PropTypes.bool.isRequired,
  buttons: PropTypes.array.isRequired,
  buttonCallbacks: PropTypes.array.isRequired,
  defaultButton: PropTypes.number.isRequired
}
