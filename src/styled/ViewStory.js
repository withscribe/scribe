import styled from '@emotion/styled'
import { css } from '@emotion/core'


const ViewStoryWidthAdapter = styled('div')`
  display: flex;
  width: 70vw;
  flex-direction: column;
  align-self: center;
  align-items: flex-start;
`

const ViewStoryGrid = styled('div')`
  display: grid;
  grid-template-columns: 75% 25%;
  grid-template-rows: repeat(4, min-content) 1fr;
  grid-gap: 1em;
  width: 100%;
  align-self: center;
`

const StoryGridPosition = css`
  grid-column: 1;
  grid-row: 1 / -1;
`

const SecondaryTitleGridPosition = css`
  grid-column: 2;
  grid-row: 1;
  margin: 0;
`

const ContributeGridPosition = styled('div')`
  grid-column: 2;
  grid-row: 2;
  align-items: center;
  justify-self: start;
`

const CloneGridPosition = styled('div')`
  grid-column: 2;
  grid-row: 3;
  align-items: center;
  justify-self: start;
`

const LikeButtonGridPosition = css`
  grid-column: 1;
  grid-row: -1;
`

export {
  ViewStoryWidthAdapter,
  ViewStoryGrid,
  StoryGridPosition,
  SecondaryTitleGridPosition,
  ContributeGridPosition,
  CloneGridPosition,
  LikeButtonGridPosition,
}
