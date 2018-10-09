import React from 'react'
import styled, { keyframes } from 'react-emotion'

import { colors } from '_system/Theme'

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const Spinner = styled('div')`
  height: 30px;
  width: 30px;
  border: 4px solid ${colors.b300};
  border-right-color: transparent;
  border-radius: 50%;
  display: inline-block;
  animation: ${rotate} 1s linear infinite;
`

const SpinnerContainer = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40vh;
`

const LoadingSpinner = () => (
  <SpinnerContainer>
    <Spinner />
  </SpinnerContainer>
)

export {
  LoadingSpinner,
}
