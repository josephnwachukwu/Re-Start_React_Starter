import React from 'react'

import './index.css'


import SubHeader from '../../components/subheader'


 const card = {
      pinned: false,
      number: 'WC12312234234',
      name: 'Mitchelson, Sam',
      birthday: '01/01/1980',
      injuryDate: '01/01/2016'
    }

const Layout = () => (
  <div className='grid__col-xl-11 grid__col-sm-9'>
  	<SubHeader />
  </div>
)

export default Layout
