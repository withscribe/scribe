import styled from '@emotion/styled'

import { mq } from '_system/Theme'

const HomeGrid = styled('div')`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 0.5em 3em;
  grid-auto-flow: row dense;
  /* width: 50vw; */
  align-self: center;

  ${mq({
    width: ['50vw', '65vw', '95vw'],
  })}
`

const ContributionsGrid = styled('div')`
  display: grid;
  grid-template-columns: repeat(1, minmax(250px, 100vw) );
  grid-gap: 2rem;
  grid-auto-flow: row;
  /* grid-auto-rows: 150px; */
`

export {
  HomeGrid,
  ContributionsGrid,
}
