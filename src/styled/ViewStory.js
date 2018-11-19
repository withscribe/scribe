import styled, { css } from 'react-emotion'
import { Flex } from 'grid-styled/emotion'

const ViewStoryWrapper = styled(Flex)`
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
  grid-gap: 10px;
`

const ActionInfo = styled(Flex)`
  color: white;
  margin-top: 1em;
  opacity: 0;
  height: 0;
  wdith: 0;
  display: none;
`

const baseStyles = css`
  height: 40px;
  width: 120px;
  background-color: #282828;
  border: 0;
  outline: 0;
  color: white;
  border-radius: 4px;
  padding: 0 1em;
  cursor: pointer;
  display: inline-block;
  text-decoration: none;
  text-align: left;
  padding-top: 10px;
  transition-duration: 0.4s;

  &:active {
    background-color: #DCDCDC;
  }

  &:hover {
    background-color: lightgrey;
    height: 100px;
    width: 400px;
    color: lightgrey
    transition: width 0.4s, height 0.4s
  }

  &:hover > ${ActionInfo} {
    opacity: 1;
    transition: opacity 3s;
    position: relative;
    text-align: center;
    color: white;
    display: block;
  }
`
const StoryGrid = styled(Flex)`
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 4;
`

const SecondaryTitleGrid = styled(Flex)`
  grid-column-start: 4;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 1;
  margin: 10px;
  align-items: center;
  justify-self: center;
`

const ContributeGrid = styled(Flex)`
  grid-column-start: 4;
  grid-column-end: 4;
  grid-row-start: 2;
  grid-row-end: 2;
  align-items: center;
  justify-self: start;
`

const CloneGrid = styled(Flex)`
  grid-column-start: 4;
  grid-column-end: 4;
  grid-row-start: 3;
  grid-row-end: 3;
  align-items: center;
  justify-self: start;
`

const CloneButton = styled(Flex)`
  ${baseStyles}
`
const ContributeButton = styled(Flex)`
  ${baseStyles}
`

// const LikeButton = styled(Flex)`

// `


export {
  ViewStoryWrapper,
  StoryGrid,
  SecondaryTitleGrid,
  ActionInfo,
  ContributeButton,
  CloneButton,
  ContributeGrid,
  CloneGrid,
}
