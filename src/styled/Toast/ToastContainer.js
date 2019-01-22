import styled from '@emotion/styled'

const ToastContainer = styled.div`
  box-sizing: border-box;
  max-height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  pointer-events: auto;
  position: fixed;
  top: 0px;
  right: 0px;
  left: 0;
  width: 650px;
  margin: 0 auto;
  z-index: 100;

  // fix so that the first toast doesn't appear flush with the top of the screen
  >div {
    :first-of-type {
      padding-top: 1em;
    }
  }
`

export default ToastContainer
