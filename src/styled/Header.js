import styled from '@emotion/styled'
import { Link } from 'react-router-dom'

import { colors } from 'system/Theme'

const HeaderWrapper = styled.header``

const HeaderContainer = styled.nav`
  width: 100%;
  display: grid;
  position: relative;
  grid-template-columns: auto auto auto auto 1fr auto;
  grid-template-rows: 1fr;
  grid-template-areas: 'logo discover create library . profile login signup';
  line-height: 1;
  box-shadow: rgba(22, 23, 26, 0.05) 0px 4px 8px;
  border-bottom: 1px solid #E4E7EB;
  padding: 0 1.5em;
  z-index: 99;
  align-items: stretch;
  background-color: ${colors.white};
`

const Tab = styled(Link)`
  margin-left: 1em;
  text-decoration: none;
  color: ${colors.n300};
  display: grid;
  grid-template-areas: 'icon label';
  grid-template-rows: auto;
  grid-template-columns: auto auto;
  align-items: center;
  justify-items: center;
`

const DiscoverTab = styled(Tab)`
  grid-area: discover;
`

const CreateTab = styled(Tab)`
  grid-area: create;
`

const LibraryTab = styled(Tab)`
  grid-area: library;
`

const ProfileTab = styled.div`
  grid-area: profile;
`

const LoginTab = styled(Tab)`
  grid-area: login;
`

const SignupTab = styled(Tab)`
  grid-area: signup;
`

const HeaderLogo = styled('img')`
  height: 45px;
`

export {
  HeaderWrapper,
  HeaderContainer,
  HeaderLogo,
  DiscoverTab,
  CreateTab,
  LibraryTab,
  ProfileTab,
  LoginTab,
  SignupTab,
}
