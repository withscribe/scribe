import styled from 'styled-components'

const AvatarBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${props => props.size + 'px'}
  width: ${props => props.size + 'px'}
  border-radius: 50px;
  border: 1px solid rgb(255, 255, 255);
  margin: 1em;
  user-select: none;
  display: ${props => props.inline ? 'inline' : null};

  &:hover {
    cursor: pointer;
    background-color: hsla(0, 0% ,100%, .1);
  }
`

AvatarBox.defaultProps = {
  size: 32,
  inline: false,
}

export default AvatarBox
