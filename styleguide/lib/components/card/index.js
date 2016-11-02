import React, { PropTypes } from 'react'
import classnames from 'classnames'

import './index.css'

const Card = ({label, children, className, ...props}) => {
  return (
    <div {...props} className={classnames('t7-card', className)}>
      <div className="t7-card__label">{label}</div>
      <div className="t7-card__content">{children}</div>
    </div>
  )
}

Card.propTypes = {
  label: PropTypes.node,
  children: PropTypes.node,
  className: PropTypes.string
}

export default Card
