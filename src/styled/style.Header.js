import styled from 'styled-components'

const HeaderWrapper = styled.header`
  padding: 2vh 10vw 2vh 10vw;
  display: flex;
  flex-align: center;
  justify-content: space-between;
  background: rgb(28, 36, 128);
  color: #FFF;
  position: relative;
`

const HeaderBar = styled.div`
  width: 80vw;
  height: 1px;
  background: #FFF;
  position: absolute;
  bottom: 2rem;
`

const HeaderLogo = styled.h1`
  font-size: 2rem;
  color: #fff;
`

const HeaderUsername = styled.h1`
  font-size: 2rem;
  font-weight: 300;
`

export {
  HeaderWrapper,
  HeaderBar,
  HeaderLogo,
  HeaderUsername,
}
