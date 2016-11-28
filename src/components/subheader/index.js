import React from 'react'
import './index.css'

const SubHeader = props => {
  return (
    <div className="grid">
      <div className="grid__col-lg-12 left-align">
        <h2 className="AC__SubHeader">Active Claims <span className="AC__SubHeader--badge">278</span></h2>
      </div>
    </div>
    
  )
}

SubHeader.propTypes = {
}

export default SubHeader