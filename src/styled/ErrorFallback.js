import styled from '@emotion/styled'

import { typography } from '_system/Theme'

const Error = styled.div`
  height: 100%;
  width: 50vw;
  display: flex;
  flex-direction: column;
  margin: auto;
  align-items: flex-start;
`

const Heading = styled.h3`
  font-family: Theinhardt-Bold;
  ${typography.headings.large};
  margin-bottom: 1em;
`

const SubHeading = styled.h4`
  font-family: Theinhardt;
  ${typography.text.medium};
`

export {
  Error,
  Heading,
  SubHeading,
}
