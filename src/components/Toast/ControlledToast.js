import React from 'react'

import { CloseIcon } from 'system/Icons'
import { ToastElement, Icon, Content, Button } from 'Styled/Toast/ToastElement'


class ControlledToast extends React.PureComponent {
  state ={
    alive: true,
  }

  componentDidMount() {
    const { onDismiss } = this.props
    setTimeout(() => {
      onDismiss()
    }, 5300)
    this.setState({ alive: false })
  }

  render() {
    const { appearance, autoDismiss, onDismiss, children, style } = this.props
    return (
      <ToastElement
        style={style}
        appearance={appearance}>
        <Icon
          appearance={appearance}
          autoDismiss={autoDismiss} />
        <Content>{children}</Content>
        <Button onClick={onDismiss} role="button">
          <CloseIcon />
        </Button>
      </ToastElement>
    )
  }
}

export default ControlledToast
