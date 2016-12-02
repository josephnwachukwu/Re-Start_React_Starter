import React, {PropTypes} from 'react'
import ClaimCard from '../ClaimCard'
import './index.css'

const Section = props => {
  const claims = props.claims || []
  const title = props.title !== 'Pinned' ? props.title.toUpperCase() : 'Pinned'

  return (
    <div id={title} className='grid section'>
      <div className='grid__col-1 section__count'>
        {claims.length}
      </div>
      <div className='grid__col-auto section__title'>
        {title}
      </div>
      <div className='grid__col-12 section__cards'>
        {
          claims.map((claim, key) => {
            return (
              <ClaimCard
                claim={claim}
                onClick={props.onClick}
                key={key}
              />
            )
          })
        }
      </div>
    </div>
  )
}

Section.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
  claims: PropTypes.array
}

export default Section
