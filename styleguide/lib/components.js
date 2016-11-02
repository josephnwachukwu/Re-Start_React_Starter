import React from 'react'
import Shell from './components/shell'
import Showcase from './components/showcase'
import examples from '../example_components'

export default () => (
  <Shell>
    { examples.map((example, key) => <Showcase key={key} {...example} />) }
  </Shell>
)
