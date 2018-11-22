import styled, { css } from 'react-emotion'

import { colors, typography, transitions } from '_system/Theme'

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

const Button = styled.button`
  ${baseStyles};
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

const ButtonFill = Button

export {
  Button,
  ButtonPrimary,
  ButtonSecondary,
  ButtonInlay,
  ButtonFill,
}
