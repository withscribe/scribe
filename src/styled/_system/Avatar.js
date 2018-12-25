import styled from '@emotion/styled'
import { colors } from '_system/Theme'

const AvatarBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${props => props.size + 'px'};
  min-width: ${props => props.size + 'px'};
  border-radius: 50px;
  border: 1px solid ${colors.n300};
  margin: 0 1em;
  user-select: none;
  display: ${props => props.inline ? 'inline' : null};

  &:hover {
    cursor: pointer;
    /* background-color: hsla(0, 0% ,100%, .1); */
  }
`

AvatarBox.defaultProps = {
  size: 32,
  inline: false,
}

export default AvatarBox
