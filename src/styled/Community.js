import styled, { css } from 'react-emotion'
import { Box } from 'grid-styled/emotion'

import { colors } from '_system/Theme'

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

const CommunityStorySection = styled(Box)``

const CommunityInfoSection = styled(Box)`
  background-color: ${colors.background.tint1};
  border-radius: 6px;
  display: flex;
  flex-direction: column;
`

const CommunityInfoHeader = styled('div')`
  background-color: ${colors.b300};
  color: ${colors.white};
  padding: 0.5em 1em;
  border-radius: 6px 6px 0 0;
  margin: -.05em;
`

export {
  CommunityWidthAdapter,
  CommunitySeperator,
  CommunityStorySection,
  CommunityInfoSection,
  CommunityInfoHeader,
}
