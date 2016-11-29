import React, {PropTypes} from 'react'
import './index.css'

const Letter = props => {
  return (
    <li className='grid__col-auto claims-navigation__letter'>
      <a href={props.title}>{props.title}</a>
    </li>
  )
}

Letter.propTypes = {
  title: PropTypes.string
}
export default Letter
