import styled from 'react-emotion'

const HomeGrid = styled('div')`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30%, 1fr));
  grid-gap: 2rem;
  grid-auto-flow: row dense;
  /* grid-auto-rows: 150px; */
`

export {
  HomeGrid,
}
