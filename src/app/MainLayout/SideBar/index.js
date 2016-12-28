import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import './index.css'

import DashboardIcon from '../../../theme/icons/Left-Nav-Dashboard.svg'
import OrderIcon from '../../../theme/icons/Left-Nav-Order.svg'
import QuoteIcon from '../../../theme/icons/Left-Nav-Quote.svg'
import ContactIcon from '../../../theme/icons/Left-Nav-Contact.svg'
import ChatIcon from '../../../theme/icons/Left-Nav-Chat.svg'
import FeedbackIcon from '../../../theme/icons/Left-Nav-Feedback.svg'
import ClaimsIcon from '../../../theme/icons/Left-Nav-Claims.svg'

const SideBar = props => {
  const dashboardClass = props.location.pathname === '/dashboard' || props.location.pathname === '/' ? 'active' : ''
  const claimsClass = props.location.pathname === '/activeclaims' ? 'active' : ''
  const ordersClass = props.location.pathname === '/orders' ? 'active' : ''
  const quoteClass = props.location.pathname === '/quote' ? 'active' : ''
  const contactClass = props.location.pathname === '/contact' ? 'active' : ''
  const chatClass = props.location.pathname === '/chat' ? 'active' : ''
  const feedbackClass = props.location.pathname === '/feedback' ? 'active' : ''

  return (
    <div className='sidebar'>
      <ul className='sidebar__menu'>
        <li className={'sidebar__menu-item ' + dashboardClass}>
          <Link to='dashboard'>
            <DashboardIcon />
            <span className='sidebar__menu-link-text'>Dashboard</span>
          </Link>
        </li>
        <li className={'sidebar__menu-item ' + claimsClass}>
          <Link to='activeclaims'>
            {<ClaimsIcon /> }
            <span className='badge'>{props.claimCount}</span>
            <span className='sidebar__menu-link-text'>Claims</span>
          </Link>
        </li>
        <li className={'sidebar__menu-item ' + ordersClass}>
          <Link to='orders'>{<OrderIcon /> }
            <span className='sidebar__menu-link-text'>Order</span>
          </Link>
        </li>
        <li className={'sidebar__menu-item ' + quoteClass}>
          <Link to='quote'>{<QuoteIcon /> }
            <span className='sidebar__menu-link-text'>Quote</span>
          </Link>
        </li>
        <li className={'sidebar__menu-item ' + contactClass}>
          <Link to='contact'>{<ContactIcon /> }
            <span className='sidebar__menu-link-text'>Contact</span>
          </Link>
        </li>
        <li className={'sidebar__menu-item ' + chatClass}>
          <Link to='chat'>{<ChatIcon /> }
            <span className='sidebar__menu-link-text'>Chat</span>
          </Link>
        </li>
        <li className={'sidebar__menu-item ' + feedbackClass}>
          <Link to='Feedback'>{<FeedbackIcon /> }
            <span className='sidebar__menu-link-text'>FeedBack</span>
          </Link>
        </li>
      </ul>
    </div>
  )
}

SideBar.propTypes = {
  claimCount: PropTypes.number,
  location: PropTypes.object
}

export default SideBar
