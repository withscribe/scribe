import React from 'react'
import { Editor } from 'slate-react'
import { Value } from 'slate'

const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: '',
              },
            ],
          },
        ],
      },
    ],
  },
})

class StoryViewer extends React.PureComponent {
  state = {
    value: initialValue,
  }

  renderMark = (props, next) => {
    const { children, mark, attributes } = props

    switch (mark.type) {
    case 'bold':
      return <strong {...attributes}>{children}</strong>
    case 'code':
      return <code {...attributes}>{children}</code>
    case 'italic':
      return <em {...attributes}>{children}</em>
    case 'underlined':
      return <u {...attributes}>{children}</u>
    default:
      return next()
    }
  }

  render() {
    const { value } = this.state
    const { content } = this.props
    let init
    if (content !== undefined) {
      const existing = JSON.parse(content)
      init = Value.fromJSON(existing)
    }
    return (
      <Editor
        spellCheck
        value={init !== undefined ? init : value}
        readOnly
        className="editor"
        placeholder="Oops! This shouldn't be empty. Try reloading the page!"
        renderMark={this.renderMark} />
    )
  }
}

export default StoryViewer
