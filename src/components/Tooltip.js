import React from 'react'
import PropTypes from 'prop-types'

import { InfoIcon } from '_system/Icons'

const styles = {
  'aria-hidden': true,
  height: '16',
  width: '16',
  viewBox: '0 0 16 16',
  style: {
    display: 'inline-block',
    verticalAlign: 'text-top',
    fill: 'currentColor',
  },
}

const Tooltip = ({ hover, shouldShow }) => (
  <>
    <InfoIcon onClick={hover} {...styles} />
    { shouldShow
      && <span>I'm being shown</span>
    }
  </>
)

export default Tooltip
