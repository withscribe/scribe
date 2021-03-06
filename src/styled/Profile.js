import styled from '@emotion/styled'
import { Flex } from '@rebass/grid/emotion'

import { typography } from 'System/Theme'


const ProfileSettingsHeader = styled.h1`
  font-size: 4rem;
  font-family: Theinhardt-Bold;
`

const ProfileWrapper = styled(Flex)`
  margin: auto;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
`


export {
  ProfileSettingsHeader,
  ProfileWrapper,
}
