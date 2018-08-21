import styled from 'styled-components'
import { Box } from 'grid-styled'


const FormWrapper = styled.div`
  display: flex;
  height: calc(100vh - 69px);
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
`

// const FormContainer = styled.div`
//   width: 25vw;
//   text-align: center;
// `
const FormContainer = styled(Box)`
  /* width: 25vw; */
  text-align: center;
`

const FormTitle = styled.h1`
  color: #333;
`

export {
  FormWrapper,
  FormContainer,
  FormTitle,
}
