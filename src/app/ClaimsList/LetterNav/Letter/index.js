import React, {PropTypes} from 'react'
import Scrollchor from 'react-scrollchor'
import './index.css'

const Letter = props => {
  return (
    <li className='grid__col-auto claims-navigation__letter'>
      <Scrollchor
        className='claims-navigation__letter-anchor'
        to={`#${props.title}`}
        disabled={props.disabled}>
        {props.title}
      </Scrollchor>
    </li>
  )
}

Letter.propTypes = {
  title: PropTypes.string,
  disabled: PropTypes.bool
}
export default Letter
