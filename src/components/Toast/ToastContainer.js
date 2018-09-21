import React from 'react'
import { inject, observer } from 'mobx-react'
import { Transition } from 'react-spring'

@inject('authStore', 'profileStore', 'userStore')
@observer
class ToastProvider extends React.Component {


  render() {
    const { userStore: { errors } } = this.props
    // const { userStore: { usE: errors } } = this.props
    // const { profileStore: { psE: errors } } = this.props
    // const { authStore: { asE: errors } } = this.props
    return (
      <section>
        <Transition
          keys={errors.map(item => item.id)}
          from={{ opacity: 0, height: 0 }}
          enter={{ opacity: 1, height: 20 }}
          leave={{ opacity: 0, height: 0 }}>
          {errors.map(err => styles => (
            <li style={styles}>{err.message}</li>
          ))}
        </Transition>
      </section>
    )
  }
}

export default ToastProvider
