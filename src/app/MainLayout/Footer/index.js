import React from 'react'

import Logo from '../../../theme/icons/Logo.svg'

import './index.css'

const Footer = props => {
  return (
    <div className='footer'>
      <Logo className='footer__icon' />
      <div className='footer__text-block'>
        <p className='footer__bold-text'>One Call Care Management</p>
        <p>841 Prudential Dr., Suite 900</p>
        <p>Jacksonville, FL 32207</p>
      </div>
      <div className='footer__text-block'>
        <p>Phone: 800-848-1989</p>
        <p>Fax: 866-672-6807</p>
      </div>
      <div className='footer__text-block-last'>
        <p>Email: <a href='javascript:;'>diagnostics@onecallcm.com</a></p>
      </div>
    </div>
  )
}

Footer.propTypes = {
}

export default Footer
