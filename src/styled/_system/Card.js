import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { Link } from 'react-router-dom'

import {
  transitions, colors, typography,
} from '_system/Theme'

const baseStyles = css`
  display: flex;
  flex-direction: column;
  grid-column-start: auto;
  grid-row-start: auto;
  transition: ${transitions.default};
  border-bottom: 1px solid ${colors.border.default};
  padding: 1em;

  a {
    display: block;
    width: 100%;
  }

  &:hover {
    cursor: pointer;
    background-color: ${colors.n100};
  }
`

const largeCardStyles = css`
  grid-column-end: auto;
  grid-column: 1;
`

const Card = styled('div')`
  ${baseStyles};
  ${largeCardStyles};
`

const CardTitle = styled('h2')`
  ${typography.headings.medium};
  color: ${colors.b400};
  font-family: Theinhardt-Bold;
  margin: 0;

  :hover {
    text-decoration: underline;
  }
`

const CardAuthor = styled('span')`
  color: ${colors.b300};

  :hover {
    text-decoration: underline;
  }
`

const CardWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  /* height: 5em; */
  width: 100%;
  justify-content:  space-between;
  align-items: flex-start;
  /* border-radius: 4px 4px 0 0; */
`

const CardBadgeWrapper = styled('div')`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  padding: 0 1em;
  margin: 1em 0;
`

const CardMetaWrapper = styled('div')`
  display: flex;
  border-radius: 4px;
  flex-direction: row;
  margin-top: 1em;
  align-items: center;
  z-index: 5;
`

const CardMetaAction = styled('button')`
  outline: 0;
  border: 0;
  color: ${colors.n300};
  ${typography.text.xsmall};
  border-radius: 4px;
  background-color: transparent;
  transition: ${transitions.default};
  margin: 0.25em;
  padding: 0.25em;

  &:hover {
    cursor: pointer;
    background-color: ${colors.b200};
  }

  &> svg {
    margin-right: 0.35em;
  }
`

export {
  Card,
  CardTitle,
  CardAuthor,
  CardWrapper,
  CardBadgeWrapper,
  CardMetaWrapper,
  CardMetaAction,
}
