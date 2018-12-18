import React from 'react'

import ErrorFallback from 'Components/Error/ErrorFallback'

class ErrorBoundary extends React.Component {
  state = { error: null }

  componentDidCatch(error) {
    this.setState({ error })
  }

  render() {
    const { error } = this.state
    const { children } = this.props

    if (error) {
      return <ErrorFallback />
    }

    return children
  }
}

export default ErrorBoundary
