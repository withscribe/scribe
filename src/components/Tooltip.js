import React from 'react'
import PropTypes from 'prop-types'

import { InfoIcon } from '_system/Icons'

const styles = {
  'aria-hidden': true,
  height: '16',
  width: '16',
  viewBox: '0 0 16 16',
  style: {
    display: 'block',
    verticalAlign: 'text-top',
    fill: 'currentColor',
  },
}

const Tooltip = ({ onHover, shouldShow, text }) => (
  <>
    <InfoIcon onMouseEnter={onHover} onMouseLeave={onHover} {...styles} />
    { shouldShow
      && <span>{text}</span>
    }
  </>
)

export default Tooltip
