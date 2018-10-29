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
  background-color: ${colors.g300};
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
    background-color: ${colors.g200};
  }

  &:hover {
    background-color: ${colors.g400};
  }

  &[disabled],
  &:disabled {
    ${disabledStyles};
  }
`

const primaryStyles = css`
  background-color: ${colors.b500};
  color: ${colors.white};

  &:active {
    background-color: ${colors.b700};
  }

  &:hover {
    background-color: ${colors.b700};
  }

  &:hover,
  &:active {
    background-color: ${colors.b900};
  }
`

const secondaryStyles = css`
  background-color: transparent;
  border-color: ${colors.b500};
  border-width: 1px;
  border-style: solid;
  color: ${colors.g500};

  &:active {
    border-color: ${colors.b700};
  }

  &:hover {
    background-color: transparent;
    border-color: ${colors.b700};
  }

  &:hover,
  &:active {
    border-color: ${colors.b900};
  }
`

const inlayStyles = css`
  background-color: transparent;
  color: ${colors.white};

  &:hover {
    background-color: ${colors.g300};
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

export { Button, ButtonPrimary, ButtonSecondary, ButtonInlay, ButtonFill }
