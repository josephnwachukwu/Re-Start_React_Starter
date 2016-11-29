import React, {PropTypes} from 'react'
import ClaimCard from '../ClaimCard'
import './index.css'

const Section = props => {
  const cards = props.cards || []

  return (
    <div id={props.title} className='grid section'>
      <div className='grid__col-1 section__count'>
        {cards.length}
      </div>
      <div className='grid__col-auto section__title'>
        {props.title}
      </div>
      <div className='grid__col-12 section__cards'>
        {
          cards.map((card, key) => {
            return (
              <ClaimCard
                card={card.card}
                onClick={card.onClick}
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
  cards: PropTypes.array
}

export default Section
