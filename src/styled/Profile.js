import styled from 'react-emotion'
import { Flex } from 'grid-styled/emotion'
import { typography } from '_system/Theme'


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
