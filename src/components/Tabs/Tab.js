import React from 'react'

import TabButton from 'system/Tabs'

class Tab extends React.PureComponent {
  handleClick = () => {
    const { onClick, onSelect } = this.props
    if (typeof onClick === 'function') {
      onClick()
    }
    onSelect()
  }

  render() {
    const { children, isSelected } = this.props
    return (
      <TabButton
        onClick={this.handleClick}
        selected={isSelected}>
        {children}
      </TabButton>
    )
  }
}

export default Tab
