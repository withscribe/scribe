import styled from 'react-emotion'

import { typography, transitions } from '_system/Theme'

const TitleText = styled('h1')`
  ${typography.headings.xlarge};
  font-family: Theinhardt-Bold;
`

const StoryText = styled('p')`
  ${typography.text.medium};
  font-family: Helvetica;
  margin: 1em 2em 1em 2em
`

const CardTitle = styled('h1')`
  ${typography.headings.small};
  transition: ${transitions.default};
  font-family: Theinhardt-Bold;
  margin: 0.5em 0 0 0;
`

const CardDesc = styled('p')`
  ${typography.text.small};
  transition: ${transitions.default};
  margin: 0;
`

export {
  TitleText,
  StoryText,
  CardTitle,
  CardDesc,
}
