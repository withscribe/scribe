import styled from 'react-emotion'

const HomeGrid = styled('div')`
  display: grid;
  /* grid-template-columns: repeat(auto-fit, minmax(30%, 1fr)); */
  grid-template-columns: 1fr;
  grid-gap: 0.5rem;
  grid-auto-flow: row dense;
  /* grid-auto-rows: 150px; */
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
