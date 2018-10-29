import React from 'react'
import { inject, observer } from 'mobx-react'
import { Transition } from 'react-spring'

// import { Button, Content, Countdown } from 'Styled/Toast/ToastElement'
import ToastContainer from 'Styled/Toast/ToastContainer'
import { DefaultToast } from 'Styled/Toast/ToastElement'

@inject('toastStore')
@observer
class ToastProvider extends React.Component {
  state = {}

  render() {
    const { toastStore: { toasts }, toastStore } = this.props
    return (
      <>
        {toasts && (
          <ToastContainer>
            <Transition
              items={toastStore.toastList}
              keys={toast => toast.id}
              from={{ opacity: 0 }}
              enter={{ opacity: 1 }}
              leave={{ opacity: 0, pointerEvents: 'none' }}>
              {t => props => (
                <DefaultToast
                  style={props}
                  autoDismiss
                  appearance="success"
                  onDismiss={() => toastStore.removeToast(t.id)}>
                  {t.message}
                </DefaultToast>
              )}
            </Transition>
          </ToastContainer>
        )}
      </>
    )
  }
}

export default ToastProvider
