import styled, { css } from 'react-emotion'
import { Box } from 'grid-styled/emotion'

const CommunityWidthAdapter = styled('div')`
  display: flex;
  width: 70vw;
  flex-direction: column;
  align-self: center;
  align-items: flex-start;
  flex-wrap: wrap;
`

const CommunitySeperator = styled('div')`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
`

const CommunityStorySection = styled(Box)`

`

const CommunityInfoSection = styled(Box)`

`

export {
  CommunityWidthAdapter,
  CommunitySeperator,
  CommunityStorySection,
  CommunityInfoSection,
}
