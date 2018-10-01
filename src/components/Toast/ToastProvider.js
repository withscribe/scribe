import React from 'react'
import { inject, observer } from 'mobx-react'
import { Transition } from 'react-spring'

import { Button, Content, Countdown } from 'Styled/Toast/ToastElement'
import ToastContainer from 'Styled/Toast/ToastContainer'

@inject('errorStore')
@observer
class ToastProvider extends React.Component {
  state = {}

  render() {
    const { errorStore: { errors } } = this.props
    return (
      <>
        {errors && (
          <ToastContainer>
            <Transition
              keys={errors.map(e => e.id)}
              from={{ opacity: 0, height: 0 }}
              enter={{ opacity: 1, height: 20 }}
              leave={{ opacity: 0, height: 0 }}>
              {errors.map(error => styles => (
                <li style={styles}>{error.message}</li>
              ))}
            </Transition>
          </ToastContainer>
        )}
      </>
    )
  }
}

export default ToastProvider
