import React from 'react'
import PropTypes from 'prop-types'

import { InfoIcon } from '_system/Icons'
import { colors } from '_system/Theme'

const styles = {
  'aria-hidden': true,
  height: '16',
  width: '16',
  viewBox: '0 0 16 16',
  style: {
    display: 'inline',
    // verticalAlign: 'bottom',
    fill: colors.n300,
  },
}

const popoverStyles = {
  boxShadow: '0 3px 12px rgba(27,31,35,.15)',
  borderRadius: '4px',
  padding: '1em',
  zIndex: '100',
  position: 'absolute',
  backgroundColor: colors.white,
  maxWidth: '250px',
}

const Tooltip = ({ onHover, shouldShow, text }) => (
  <>
    <InfoIcon onMouseEnter={onHover} onMouseLeave={onHover} {...styles} />
    { shouldShow
      && <div style={popoverStyles}>{text}</div>
    }
  </>
)

Tooltip.propTypes = {
  onHover: PropTypes.func.isRequired,
  shouldShow: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
}

export default Tooltip
