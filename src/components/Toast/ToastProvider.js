import React from 'react'
import { inject, observer } from 'mobx-react'
import { Transition } from 'react-spring'

import ToastContainer from 'Styled/Toast/ToastContainer'
import ControlledToast from 'Components/Toast/ControlledToast'

@inject('toastStore')
@observer
class ToastProvider extends React.Component {
  state = { }

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
                <ControlledToast
                  style={props}
                  autoDismiss
                  appearance={t.intent}
                  onDismiss={() => toastStore.removeToast(t.id)}>
                  {t.message}
                </ControlledToast>
              )}
            </Transition>
          </ToastContainer>
        )}
      </>
    )
  }
}

export default ToastProvider
