import styled, { css } from 'react-emotion'

import { colors, typography, transitions } from '_system/Theme'

const intent = {
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

const Button = styled('button')(
  baseStyles,
  ({ appearance }) => `
    background-color: ${style[appearance].bg};
    color: ${style[appearance].text};
    :hover {
      background-color: ${style[appearance].hover};
    }
  `,
)

export {
  Button,
  ButtonPrimary,
  ButtonSecondary,
  ButtonInlay,
  IntentButton,
}
