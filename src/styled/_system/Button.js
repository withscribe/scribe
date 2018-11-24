import styled, { css } from 'react-emotion'
import PropTypes from 'prop-types'

import { colors, typography, transitions } from '_system/Theme'

const intentMeta = {
  none: {
    text: colors.white,
    bg: colors.intent.none,
    hover: colors.b400,
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
    text: colors.b300,
    bg: colors.background.tint1,
    hover: colors.background.tint2,
  },
  success: {
    text: colors.g300,
    bg: colors.background.tint1,
    hover: colors.background.tint2,
  },
  warning: {
    text: colors.o300,
    bg: colors.background.tint1,
    hover: colors.background.tint2,
  },
  danger: {
    text: colors.r300,
    bg: colors.background.tint1,
    hover: colors.background.tint2,
  },
}

const primary = {
  none: {
    text: colors.white,
    bg: colors.b300,
    hover: colors.b400,
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
    text: colors.b300,
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

const style = {
  white: {
    text: colors.n300,
    bg: colors.white,
    hover: colors.background.tint1,
  },
  blue: {
    text: colors.white,
    bg: colors.b300,
    hover: colors.b400,
  },
}

const disabledStyles = css`
  opacity: 0.4;
  pointer-events: none;
  user-selectable: none;
`

const baseStyles = css`
  height: 40px;
  width: auto;
  background-color: ${colors.n300};
  border: 0;
  outline: 0;
  color: ${colors.white};
  border-radius: 4px;
  ${typography.text.small};
  padding: 0 1em;
  cursor: pointer;
  display: inline-block;
  text-decoration: none;
  transition: ${transitions.default};
  text-align: center;

  &:active {
    background-color: ${colors.n300};
  }

  &:hover {
    background-color: ${colors.n400};
  }

  &[disabled],
  &:disabled {
    ${disabledStyles};
  }
`

const primaryStyles = css`
  background-color: ${colors.b300};
  color: ${colors.white};

  &:active {
    background-color: ${colors.b400};
  }

  &:hover {
    background-color: ${colors.b400};
  }

  &:hover,
  &:active {
    background-color: ${colors.b400};
  }
`

const secondaryStyles = css`
  background-color: transparent;
  border-color: ${colors.b300};
  border-width: 1px;
  border-style: solid;
  color: ${colors.n400};

  &:active {
    border-color: ${colors.b400};
  }

  &:hover {
    background-color: transparent;
    border-color: ${colors.b300};
  }

  &:hover,
  &:active {
    border-color: ${colors.b400};
  }
`

const inlayStyles = css`
  background-color: transparent;
  color: ${colors.black};

  &:hover {
    background-color: ${colors.n200};
  }
`

const ButtonPrimary = styled('button')`
  ${baseStyles};
  ${primaryStyles}
`

const ButtonSecondary = styled('button')`
  ${baseStyles};
  ${secondaryStyles};
`

const ButtonInlay = styled('button')`
  ${baseStyles};
  ${inlayStyles};
`

const IntentButton = styled('button')(
  baseStyles,
  ({ appearance }) => `
    background-color: ${intent[appearance].bg};
    color: ${intent[appearance].bg};
    :hover {
      color: ${intent[appearance].hover};
    }
  `,
)

// const Button = styled('button')(
//   baseStyles,
//   ({ appearance }) => `
//     background-color: ${style[appearance].bg};
//     color: ${style[appearance].text};
//     :hover {
//       background-color: ${style[appearance].hover};
//     }
//   `,
// )

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

export {
  Button,
  ButtonPrimary,
  ButtonSecondary,
  ButtonInlay,
  IntentButton,
}
