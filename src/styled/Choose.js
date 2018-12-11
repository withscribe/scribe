import styled from 'react-emotion'
import { Flex, Box } from 'grid-styled/emotion'
import { Link } from 'react-router-dom'

const ChoiceWrapper = styled(Flex)`
  height: calc(100vh - 69px);
  padding-top: 10vh;
  width: 100%;
`

const ChoiceBox = styled(Box)`
  background: #000;
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  position: relative;
`

const ChoiceLink = styled(Link)`
  height: 100%;
  width: 100%;
  background: #efefef;

  &:hover {
    background: #3f3f3f;
  }
`

// const Choice

export {
  ChoiceWrapper,
  ChoiceBox,
  ChoiceLink,
}
