import styled from '@emotion/styled'

import { typography, transitions, colors } from 'System/Theme'

const TitleText = styled('h1')`
  ${typography.headings.xlarge};
  font-family: Theinhardt-Bold;
  margin: 0;
`

const TitleSecondary = styled('h2')`
  ${typography.headings.large};
  font-family: Theinhardt-Bold;
`

const AuthorLabel = styled('label')`
  ${typography.text.small};
  transition: ${transitions.default};
  margin:0.5em;
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
  margin: 0.5em 0 0 0;
`

const FieldInputError = styled('span')`
  color: ${colors.r300};
  margin-top: -2em;
  margin-bottom: 1em;
`

export {
  TitleText,
  TitleSecondary,
  CardTitle,
  CardDesc,
  AuthorLabel,
  FieldInputError,
}
