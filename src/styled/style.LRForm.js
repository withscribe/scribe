import styled from 'react-emotion'
import { Box } from 'grid-styled/emotion'


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
