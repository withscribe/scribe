import styled from 'react-emotion'
import { Flex, Box } from 'grid-styled/emotion'


const ProfileSettingsHeader = styled.h1`
  font-size: 4rem;
  font-family: Theinhardt-Bold;
`

const ProfileWrapper = styled(Flex)`
  margin: auto;
  justify-content: center;
  /* align-items: center; */
  flex-direction: column;
  width: 80vw;
`


export {
  ProfileSettingsHeader,
  ProfileWrapper,
}
