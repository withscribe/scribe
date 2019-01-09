import styled from '@emotion/styled'
import { css } from '@emotion/core'
import PropTypes from 'prop-types'

import { colors, typography, transitions } from 'system/Theme'

const intentMeta = {
  none: {
    text: colors.white,
    bg: colors.intent.none,
    hover: colors.p400,
  },
  success: {
    text: colors.white,
    bg: colors.intent.success,
    hover: colors.g400,
  },
  danger: {
    text: colors.white,
    bg: colors.intent.danger,
    hover: colors.r400,
  },
  warning: {
    text: colors.white,
    bg: colors.intent.warning,
    hover: colors.y400,
  },
}

const normal = {
  none: {
    text: colors.p300,
    bg: colors.background.tint1,
    hover: colors.n200,
  },
  success: {
    text: colors.g300,
    bg: colors.background.tint1,
    hover: colors.n200,
  },
  warning: {
    text: colors.o300,
    bg: colors.background.tint1,
    hover: colors.n200,
  },
  danger: {
    text: colors.r300,
    bg: colors.background.tint1,
    hover: colors.n200,
  },
}

const primary = {
  none: {
    text: colors.white,
    bg: colors.p300,
    hover: colors.p400,
  },
  success: {
    text: colors.white,
    bg: colors.g300,
    hover: colors.g400,
  },
  warning: {
    text: colors.white,
    bg: colors.o300,
    hover: colors.o400,
  },
  danger: {
    text: colors.white,
    bg: colors.r300,
    hover: colors.r400,
  },
}

const minimal = {
  none: {
    text: colors.n400,
    hover: colors.background.tint1,
    bg: 'transparent',
  },
  success: {
    text: colors.g300,
    hover: colors.background.tint1,
    bg: 'transparent',
  },
  warning: {
    text: colors.o300,
    hover: colors.background.tint1,
    bg: 'transparent',
  },
  danger: {
    text: colors.r300,
    hover: colors.background.tint1,
    bg: 'transparent',
  },
}

const bundle = {
  intent: intentMeta,
  primary,
  minimal,
  default: normal,
}

const disabledStyles = css`
  opacity: 0.4;
  pointer-events: none;
  user-selectable: none;
`

const buttonBaseStyles = css`
  height: 40px;
  width: auto;
  border: 0;
  outline: 0;
  border-radius: 4px;
  ${typography.text.small};
  padding: 0 1.5em;
  margin-right: 1em;
  cursor: pointer;
  display: inline-block;
  text-decoration: none;
  transition: ${transitions.default};
  text-align: center;

  :last-of-type {
    margin-right: 0;
  }

  &[disabled],
  &:disabled {
    ${disabledStyles};
  }

  &> svg {
    margin-right: 0.35em;
  }
`

const Button = styled('button')(
  buttonBaseStyles,
  ({ appearance, intent }) => `
    background-color: ${bundle[appearance][intent].bg};
    color: ${bundle[appearance][intent].text};
    :hover {
      background-color: ${bundle[appearance][intent].hover};
    }
  `,
)

Button.propTypes = {
  intent: PropTypes.oneOf(['none', 'success', 'warning', 'danger']),
  appearance: PropTypes.oneOf(['default', 'minimal', 'primary']).isRequired,
}

Button.defaultProps = {
  intent: 'none',
  appearance: 'default',
}

export default Button
