import styled, { css } from 'react-emotion'


const ViewStoryWidthAdapter = styled('div')`
  display: flex;
  width: 70vw;
  flex-direction: column;
  align-self: center;
  align-items: flex-start;
`

const ViewStoryWrapper = styled('div')`
  display: grid;
  grid-template-columns: 75% 25%;
  grid-template-rows: repeat(4, 100px);
  grid-gap: 1em;
  width: 70vw;
  align-self: center;
`

const StoryGridPosition = css`
  grid-column: 1;
  grid-row: 1 / -1;
`

const SecondaryTitleGridPosition = css`
  grid-column: 2;
  grid-row: 1;
  margin: 10px;
  align-items: center;
  justify-self: center;
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
  ViewStoryWrapper,
  StoryGridPosition,
  SecondaryTitleGridPosition,
  ContributeGridPosition,
  CloneGridPosition,
  LikeButtonGridPosition,
}
