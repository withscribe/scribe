import styled from 'react-emotion'
import PropTypes from 'prop-types'
import { Flex } from 'grid-styled/emotion'

const Container = styled.div`
  width: 100%;
  display: flex;
  max-width: 70em;
  flex-direction: column;
`

const Wrapper = styled('main')`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`

export {
  Wrapper,
  Container,
}
