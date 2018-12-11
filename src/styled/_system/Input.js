import styled, { css } from 'react-emotion'

import { colors, typography } from '_system/Theme'

const oldInput = styled.input`
  padding: 0 0.5em;
  margin: 1em 0 0 0;
  height: 56px;
  border: 0;
  font-size: 1rem;
  max-width: 100%;
  width: 100%;
  background: #f3f3f3;
  border-radius: 3px;
  outline: 0;
`

const inputBaseStyles = css`
  label: input;
  background-color: ${colors.white};
  border-width: 1px;
  border-style: solid;
  border-color: ${colors.n200};
  border-radius: 4px;
  /* box-shadow: rgba(8, 35, 51, 0.05) 0px 3px 6px; */
  padding: 0.90rem 0.75rem;
  margin-bottom: 2em;
  transition: border-color 200ms ease-in-out;
  width: 100%;
  ${typography.text.small};

  &:focus,
  &:active {
    border: 1px solid ${colors.b300};
    outline: none;
  }

  &::placeholder {
    color: #9DA7B1;
    transition: color 200ms ease-in-out;
  }
  &[disabled],
  &:disabled {
    background-color: ${colors.background.tint1};
    &:active {
      border: 1px solid ${colors.background.tint2};
    }
  }
`

const inputWarningStyles = css`
  &:not(:focus) {
    border-color: ${colors.intent.warning};

    &::placeholder {
      color: ${colors.y200};
    }
  }
`

const inputOptionalStyles = css`
  background-color: #FAFAFA;
  border-style: dashed;
  box-shadow: none;
`

const inputDangerStyles = css`
  &:not(:focus) {
    border-color: ${colors.intent.danger};

    &::placeholder {
      color: ${colors.r200};
    }
  }
`

const Input = styled('input')`
  ${inputBaseStyles};
  ${p => p.isWarn ? `${inputWarningStyles}` : null};
  ${p => p.isOptional ? `${inputOptionalStyles}` : null};
  ${p => p.isInvalid ? `${inputDangerStyles}` : null};
`

const Label = styled.label`
  label: form-label;
  margin-bottom: 0.25em;
  display: block
`

const LabelTip = styled('sup')`
  color: #7D7D7D;
`

const LabelConstraint = styled('sup')`
  color: ${colors.r300};
`

const InlineLabel = styled.label`
  label: form-label;
  /* margin-bottom: 0.25em; */
  margin-right: 0.25em;
  margin-left: 0.25em;
  display: inline
`
const InlineInput = styled.input`
  display: inline;
  padding: 0 0.5em;
  margin: 1em 0 0 0;
  height: 56px;
  border: 0;
  font-size: 1rem;
  background: #f3f3f3;
  border-radius: 3px;
  outline: 0;
`

export default Input

export {
  Label, LabelTip, LabelConstraint, InlineLabel, InlineInput,
}
