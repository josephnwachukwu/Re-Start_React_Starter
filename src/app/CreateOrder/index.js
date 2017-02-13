import React, {Component, PropTypes} from 'react'

import {getOrderForms} from './Api'
import LoadingSpinner from '../../theme/spinners/Animation-Loader.svg'
import ProductCart from './ProductCart'

import './index.css'

export default class CreateOrder extends Component {
  constructor (props) {
    super(props)

    this.renderHeader = this.renderHeader.bind(this)
    this.renderOrderInfo = this.renderOrderInfo.bind(this)

    this.state = {
      loading: false,
      patientInfo: {
        patientId: 'WC12312509834',
        patientName: 'Sam Mitchelson'
      },
      currentOrder: {},
      orderForms: null
    }
  }

  componentDidMount () {
    this.setState({
      loading: true
    }, () => {
      getOrderForms().then((orderForms) => {
        this.setState({
          loading: false,
          orderForms
        })
      })
    })
  }

  renderHeader () {
    return (
      <div className='create-order__header-container'>
        <div className='create-order__header-top'>
          <h1 className='create-order__header-content'>Create an Order</h1>
        </div>
        <div className='create-order__header-bottom'>
          {this.renderOrderInfo()}
        </div>
      </div>
    )
  }

  renderOrderInfo () {
    const { patientId, patientName } = this.state.patientInfo
    const nonBreakingSpaceHTMLEntity = String.fromCharCode(0xA0)
    const wideSpace = `${nonBreakingSpaceHTMLEntity}${nonBreakingSpaceHTMLEntity}`
    const separator = `${wideSpace}|${wideSpace}`

    return (
      <div className='create-order__info-container'>
        <div className='create-order__patient-info'>
          <h2>
            <span className='create-order__patient-id'>{patientId}{separator}</span>
            <span className='create-order__patient-name'>{patientName}</span>
          </h2>
        </div>
        <div className='create-order__product-cart'>
          <ProductCart />
        </div>
      </div>
    )
  }

  render () {
    if (this.state.loading) {
      return (
        <div className='create-order__spinner-container'>
          <LoadingSpinner />
        </div>
      )
    } else {
      return (
        <div className='create-order__main-container'>
          {this.renderHeader()}
          <div className='create-order__body-container'>
            {this.props.children}
          </div>
        </div>
      )
    }
  }
}

CreateOrder.propTypes = {
  children: PropTypes.node
}
