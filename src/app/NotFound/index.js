import React from 'react'
import { Link } from 'react-router'

import 'flatpickr/dist/themes/material_green.css'
import '../Shared/DatePicker/index.css'

import Flatpickr from 'react-flatpickr'

import './index.css'

// TODO   JN 01-17-2017
// the flatpickr is here temporarily because the place where it will reside has not been developed yet. and the config for the arrows is a strigified svg so its here till we can copy it over.

const NotFound = props => (
  <div className='page-not-found'>
    <p>
      Page not found.
    </p>
    <p>
      <Link to='/'>Go back to Home page</Link>

      <Flatpickr
        onChange={v => console.info(v)}
        options={{nextArrow: '<svg width="10px" height="16px" viewBox="0 0 10 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Arrow---Right" fill="#2D7DAB"><polygon id="Rectangle-15" transform="translate(5.000000, 8.000000) rotate(90.000000) translate(-5.000000, -8.000000) " points="-3 11 5 3 13 11 11 13 5 7 -1 13"></polygon></g></g></svg>', prevArrow: '<svg width="10px" height="16px" viewBox="0 0 10 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Arrow---Left" fill="#2D7DAB"><polygon id="Rectangle-15" transform="translate(5.000000, 8.000000) rotate(-90.000000) translate(-5.000000, -8.000000) " points="-3 11 5 3 13 11 11 13 5 7 -1 13"></polygon></g></g></svg>'}} />
    </p>
  </div>
)

NotFound.propTypes = {
}

export default NotFound
