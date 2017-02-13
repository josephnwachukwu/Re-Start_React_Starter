import React, {Component} from 'react'

import Product from './Product'
import ProductSelector from './ProductSelector'

import './index.css'

export default class ProductPage extends Component {
  constructor (props) {
    super(props)

    this.onHideHintBar = this.onHideHintBar.bind(this)
    this.renderHintBar = this.renderHintBar.bind(this)

    this.state = {
      showHintBar: true
    }
  }

  onHideHintBar () {
    this.setState({ showHintBar: false })
  }

  renderHintBar () {
    if (this.state.showHintBar) {
      const message = 'Keep in mind, the more information you can provide us, the faster we can process your order.'

      return (
        <div className='product-page__hint-bar'>
          <div className='product-page__hint-icon-container'>
            <div className='product-page__hint-icon'>!</div>
          </div>
          <div className='product-page__hint-message'>{message}</div>
          <button
            className='product-page__hint-button'
            onClick={this.onHideHintBar}>
            <div className='product-page__hint-button-text'>Got It!</div>
          </button>
        </div>
      )
    }
  }

  render () {
    return (
      <div className='product-page__main-container'>
        <section className='product-page__section-top'>
          <ProductSelector />
          {this.renderHintBar()}
        </section>
        <section className='product-page__section-bottom'>
          <Product />
        </section>
      </div>
    )
  }
}
