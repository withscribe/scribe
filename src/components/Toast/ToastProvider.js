import React from 'react'
import { inject, observer } from 'mobx-react'
import { Transition } from 'react-spring'

// import { Button, Content, Countdown } from 'Styled/Toast/ToastElement'
import ToastContainer from 'Styled/Toast/ToastContainer'
import { DefaultToast } from 'Styled/Toast/ToastElement'

@inject('errorStore')
@observer
class ToastProvider extends React.Component {
  state = {}

  render() {
    const { errorStore: { errors }, errorStore } = this.props
    console.log(errorStore.errorList)
    return (
      <>
        {errors && (
          <ToastContainer>
            <Transition
              keys={errorStore.errorList.map(e => e.id)}
              from={{ opacity: 0 }}
              enter={{ opacity: 1 }}
              leave={{ opacity: 0, pointerEvents: 'none' }}>
              {errorStore.errorList.map(error => styles => (
                <DefaultToast
                  style={styles}
                  autoDismiss
                  appearance="success"
                  onDismiss={() => errorStore.removeError(error.id)}>
                  {error.message}
                </DefaultToast>
              ))}
            </Transition>
          </ToastContainer>
        )}
      </>
    )
  }
}

export default ToastProvider
