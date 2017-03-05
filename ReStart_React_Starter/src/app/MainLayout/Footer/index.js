import React from 'react'

import './index.css'

const Footer = props => {
  return (
    <footer className='footer grid'>
      <div className='grid__col-3' />
      <div className='grid__col-3'>
        <p className='footer__bold-text'>Genisystems / HPTP Design LLC</p>
        <p>1569 Bruckner Blvd 7C</p>
        <p>Bronx, NY 10472</p>
      </div>
      <div className='grid__col-3'>
        <p>Phone: 646-829-6133</p>
        <p>Fax: 718-842-3787</p>
      </div>
      <div className='grid__col-3'>
        <p>Email: <a href='javascript:;'>genisystems@gmail.com</a></p>
      </div>
    </footer>
  )
}

Footer.propTypes = {
}

export default Footer
