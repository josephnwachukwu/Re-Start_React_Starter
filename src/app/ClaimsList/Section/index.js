import React, {PropTypes} from 'react'
import ClaimCard from '../ClaimCard'
import './index.css'

const Section = props => {
  const claims = props.claims || []
  const title = props.title
  const emptySectionTitleText = `You have no patients with last name beginning with ${title}`

  return (
    <div id={title} className='grid section'>
      <div className='grid__col-1 section__count'>
        {claims.length}
      </div>
      <div className='grid__col-auto'>
        <div className='grid__cell section__title-block'>
          <div className='section__title'>{title}</div>
          {!claims.length &&
            <div className='section__title-empty-text'>{emptySectionTitleText}</div>
          }
        </div>
      </div>
      <div className='grid__col-12 section__cards'>
        {
          claims.map((claim, key) => {
            return (
              <ClaimCard
                claim={claim}
                key={claim.ClaimSystemId || key}
                updatePinnedStatus={props.updatePinnedStatus}
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
  claims: PropTypes.array,
  updatePinnedStatus: PropTypes.func
}

export default Section
