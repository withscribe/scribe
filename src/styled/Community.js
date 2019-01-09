import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { Box } from '@rebass/grid/emotion'

import { colors } from 'system/Theme'

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
  padding: 1em;
`

const CommunityInfoHeader = styled('div')`
  background-color: ${colors.b300};
  color: ${colors.white};
  padding: 0.5em 1em;
  border-radius: 6px 6px 0 0;
  margin: -1em;
  margin-bottom: 0.5em;
`

export {
  CommunityWidthAdapter,
  CommunitySeperator,
  CommunityStorySection,
  CommunityInfoSection,
  CommunityInfoHeader,
}
