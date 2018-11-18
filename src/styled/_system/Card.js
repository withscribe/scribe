import styled, { css } from 'react-emotion'
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
  border: 1px solid #d1d5da;
  border-radius: 4px;
  padding: 1em;
  background-color: #fbfdff;

  a {
    display: block;
    width: 100%;
  }

  &:hover {
    cursor: pointer;
    background-color: #fbfbfb;
  }
`

const largeCardStyles = css`
  grid-column-end: auto;
  grid-column: 1 / -1;
  /* grid-row-end: span 2; */
`

const Card = styled('div')`
  ${baseStyles};
  ${largeCardStyles};
`

const CardTitle = styled('h2')`
  ${typography.headings.medium};
  color: ${colors.b500};
  font-family: Theinhardt-Bold;
  margin: 0;

  :hover {
    text-decoration: underline;
  }
`

const CardAuthor = styled('span')`
  color: ${colors.g100};

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
`

const CardMetaAction = styled('button')`
  outline: 0;
  border: 0;
  color: ${colors.g300};
  ${typography.text.xsmall};
  border-radius: 4px;
  background-color: transparent;
  transition: ${transitions.default};
  margin: 0.25em;
  padding: 0.25em;

  &:hover {
    cursor: pointer;
    background-color: ${colors.g200};
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
