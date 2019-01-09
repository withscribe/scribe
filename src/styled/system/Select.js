/** @jsx jsx */
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { css, jsx } from '@emotion/core'

import { CaretDownIcon } from 'System/Icons'
import { colors } from 'System/Theme'

const selectWrapperStyles = css`
  display: inline-flex;
  flex: 1;
  position: relative;
  width: auto;
  align-items: center;
  margin-bottom: 2em;
`

const extraIconStyles = css`
  position: absolute;
  right: 0.25em;
`

const baseSelectStyles = css`
  outline: none;
  cursor: pointer;
  width: 100%;
  height: 4em;
  padding-left: 1em;
  padding-right: 3em;
  -webkit-appearance: none;
  background-color: ${colors.background.tint1};
  border: 1px solid ${colors.border.default};
  :hover {
    background-color: ${colors.background.tint2};
  }
`

const SelectWrapper = styled('div')`
  ${selectWrapperStyles};
`

const StyledSelect = styled('select')`
  ${baseSelectStyles};
`

const Select = ({ onChange, children, ...props }) => (
  <SelectWrapper>
    <StyledSelect
      {...props}
      onChange={onChange}>
      {children}
    </StyledSelect>
    <CaretDownIcon css={extraIconStyles} />
  </SelectWrapper>
)

Select.propTypes = {
  onChange: PropTypes.func,
  children: PropTypes.node,
}


export default Select
