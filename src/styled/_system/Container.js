import styled from 'react-emotion'

const Container = styled.div`
  width: 100%;
  display: flex;
  max-width: 80em;
  flex-direction: column;
  flex-wrap: wrap;
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
  HomeContainer,
}
