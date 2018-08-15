import styled from 'styled-components'
import { Box } from 'grid-styled'


const LoginWrapper = styled.div`
  display: flex;
  height: 50vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

// const LoginContainer = styled.div`
//   width: 25vw;
//   text-align: center;
// `
const LoginContainer = styled(Box)`
  /* width: 25vw; */
  text-align: center;
`

export {
  LoginWrapper,
  LoginContainer,
}
