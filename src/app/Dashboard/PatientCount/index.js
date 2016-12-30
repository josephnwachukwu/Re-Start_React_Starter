import React, { PropTypes } from 'react'
import { VictoryPie, VictoryContainer } from 'victory'

import variables from '../../../theme/variables.js'

import './index.css'

const PatientCount = props => {
  return (
    <div className='patient-count grid__cell'>
      <div className='patient-count__pie-chart'>
        <div className='patient-count__pie-chart-number'>
          {props.pinnedCount}
        </div>
        <VictoryPie
          data={[
            {patients: 'pinned', number: props.pinnedCount},
            {patients: 'total', number: props.totalCount}
          ]}
          x='month'
          y={(datum) => datum.number}
          style={{
            data: {
              fill: (d) => {
                switch (d.patients) {
                  case 'total':
                    return variables.lightBlue3
                  case 'pinned':
                    return variables.neonGreen
                  default:
                    return variables.lightBlue3
                }
              }
            }
          }}
          padding={0}
          padAngle={3}
          responsive={false}
          innerRadius={25}
          startAngle={340}
          endAngle={-20}
          width={70}
          height={70}
          containerComponent={<VictoryContainer responsive={false} />}
        />
      </div>
      <div className='patient-count__info'>
        <p className='patient-count__fraction'><strong>{props.pinnedCount}</strong> out of <strong>{props.totalCount}</strong></p>
        <p className='patient-count__text'>patients pinned</p>
      </div>
      <button className='patient-count__help'>?</button>
    </div>
  )
}

PatientCount.propTypes = {
  pinnedCount: PropTypes.number,
  totalCount: PropTypes.number
}

export default PatientCount