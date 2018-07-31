import styled from 'styled-components'
import { Flex, Box } from 'grid-styled'
import { Link } from 'react-router-dom'

const ChoiceWrapper = styled(Flex)``

const ChoiceBox = styled(Box)`
  background: #000;
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  position: relative;
`

const ChoiceLink = styled(Link)`//TODO: img w/ icon
  height: 100%;
  width: 100%;
  background: #efefef;
`

// const Choice

export {
  ChoiceWrapper,
  ChoiceBox,
  ChoiceLink,
}
