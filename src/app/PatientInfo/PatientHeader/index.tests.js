import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import PatientHeader from './index.js'

describe('Patient Header component', function () {
  it('has the correct patient name', function () {
    expect(shallow(
      <PatientHeader
        patientFirstName='John'
        patientLastName='Smith'
      />
    ).find('.patient-header__label-name').text()).to.equal('John Smith')
  })
})
