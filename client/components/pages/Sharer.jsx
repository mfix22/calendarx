import React from 'react'

import Viewer from './Viewer'
import Confirmation from '../Confirmation'

const Sharer = ({ location, params }) => (
  <Viewer params={params} location={location}>
    <Confirmation location={location} params={params} />
  </Viewer>
)

export default Sharer
