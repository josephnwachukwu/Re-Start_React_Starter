import React from 'react'

import './index.css'

const Footer = props => {
  return (
    <footer className='footer grid'>
      <div className='grid__col-3'>
        <h4>SiteMap</h4>
      </div>
      <div className='grid__col-3'>
        <p className='footer__bold-text'>Copyright &copy; Genisystems / HPTP Design LLC</p>
        <p><a href=''>Privacy Policy</a></p>
        <p><a href=''>Terms of Use</a></p>
      </div>
      <div className='grid__col-3'>
        <p>Phone: 646-829-6133</p>
        <p>Fax: 718-842-3787</p>
      </div>
      <div className='grid__col-3'>
        <p>Email: <a href='javascript:;'>genisystems@gmail.com</a></p>
        <p>Twitter: <a href='javascript:;'>@jovoxo</a></p>
        <p>facebook: <a href='javascript:;'>@joehasfreshswag</a></p>

      </div>
    </footer>
  )
}

Footer.propTypes = {
}

export default Footer
