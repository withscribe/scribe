import styled from 'react-emotion'
import { Box } from 'grid-styled/emotion'

import { typography } from '_system/Theme'

const FormWrapper = styled.div`
  display: flex;
  height: 30vw;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
`

const FormContainer = styled(Box)`
  /* width: 25vw; */
  /* text-align: center; */
  display: flex;
  flex-direction: column;

  & >form {
    display: flex;
    flex-direction: column;
  }
`

const FormTitle = styled('h1')`
  ${typography.headings.xlarge};
  font-family: Theinhardt-Bold;
  margin: 0;
`

const FormDesc = styled('p')`
  ${typography.text.small};
`


export {
  FormWrapper,
  FormContainer,
  FormTitle,
  FormDesc,
}
