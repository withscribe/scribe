import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'react-emotion'

import { CaretDownIcon } from '_system/Icons'
import { colors } from '_system/Theme'

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
    <CaretDownIcon className={extraIconStyles} />
  </SelectWrapper>
)

Select.propTypes = {
  onChange: PropTypes.func,
  children: PropTypes.node,
}


export default Select
