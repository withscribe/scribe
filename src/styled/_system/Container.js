import styled from 'react-emotion'

const Container = styled.div`
  width: 100%;
  display: flex;
  max-width: 50vw;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: flex-start;
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
