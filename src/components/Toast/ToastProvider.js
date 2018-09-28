import React from 'react'
import { inject, observer } from 'mobx-react'
import { Transition } from 'react-spring'

import errors from 'Services/Errors'
import { Button, Content, Countdown } from 'Styled/Toast/ToastElement'
import ToastContainer from 'Styled/Toast/ToastContainer'

@inject('userStore')
@observer
class ToastProvider extends React.Component {
  state = {
    thingerrors: errors,
  }

  render() {
    const { thingerrors } = this.state
    console.log(thingerrors)
    // const { userStore: { errors } } = this.props
    // const { userStore: { usE: errors } } = this.props
    // const { profileStore: { psE: errors } } = this.props
    // const { authStore: { asE: errors } } = this.props
    return (
      <ToastContainer>
        <Transition
          keys={thingerrors.map(error => error.id)}
          from={{ opacity: 0, height: 0 }}
          enter={{ opacity: 1, height: 20 }}
          leave={{ opacity: 0, height: 0 }}>
          {thingerrors.map(err => styles => (
            <li style={styles}>{err.message}</li>
          ))}
        </Transition>
      </ToastContainer>
      // <section>
      //   <Transition
      //     keys={errors.map(item => item.id)}
      //     from={{ opacity: 0, height: 0 }}
      //     enter={{ opacity: 1, height: 20 }}
      //     leave={{ opacity: 0, height: 0 }}>
      //     {errors.map(err => styles => (
      //       <li style={styles}>{err.message}</li>
      //     ))}
      //   </Transition>
      // </section>
    )
  }
}

export default ToastProvider
