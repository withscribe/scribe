import styled from 'react-emotion'
import { Box } from 'grid-styled/emotion'
import { Link } from 'react-router-dom'

import { typography, colors } from '_system/Theme'

const FormWrapper = styled.div`
  display: flex;
  width: 100%;
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
  ${typography.headings.large};
  font-family: Theinhardt-Bold;
  margin: 0;
`

const FormDesc = styled('p')`
  ${typography.text.small};
`

const FormChangeLink = styled(Link)`
  margin-top: 0.5em;
  color: ${colors.black};
`


export {
  FormWrapper,
  FormContainer,
  FormTitle,
  FormDesc,
  FormChangeLink,
}
