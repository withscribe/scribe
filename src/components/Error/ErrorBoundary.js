import React from 'react'

class ErrorBoundary extends React.Component {
  state = { error: null }

  componentDidCatch(error) {
    this.setState({ error })
  }

  render() {
    const { error } = this.state
    const { children } = this.props

    if (error) {
      return 'looks like something went wrong :( reload the page'
    }

    return children
  }
}

export default ErrorBoundary
