import React from 'react'
import { Editor } from 'slate-react'
import { Value } from 'slate'
import isKeyHotkey from 'is-hotkey'

import Toolbar, { ToolbarButton } from 'Styled/Papyrus/Toolbar'

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

const isBoldHotkey = isKeyHotkey('mod+b')
const isItalicHotkey = isKeyHotkey('mod+i')
const isUnderlinedHotkey = isKeyHotkey('mod+u')
const isCodeHotkey = isKeyHotkey('mod+`')

class TextEditor extends React.Component {
  state = {
    value: initialValue,
    hasFinishedWorking: false,
  }

  componentDidMount() {
    const { content } = this.props
    let init
    if (content !== undefined) {
      const existing = JSON.parse(content)
      init = Value.fromJSON(existing)
      this.setState({ value: init, hasFinishedWorking: true })
    } else {
      this.setState({ hasFinishedWorking: true })
    }
  }

  ref = (editor) => {
    this.editor = editor
  }

  onChange = ({ value }) => {
    const { get } = this.props
    if (get) {
      get(JSON.stringify(value.toJSON()))
    }
    this.setState({ value })
  }

  onKeyDown = (event, change, next) => {
    let mark

    if (isBoldHotkey(event)) {
      mark = 'bold'
    } else if (isItalicHotkey(event)) {
      mark = 'italic'
    } else if (isUnderlinedHotkey(event)) {
      mark = 'underlined'
    } else if (isCodeHotkey(event)) {
      mark = 'code'
    } else {
      return next()
    }

    event.preventDefault()
    change.toggleMark(mark)
  }

  onMarkClick = (event, type) => {
    event.preventDefault()

    this.editor.change((change) => {
      change.toggleMark(type)
    })
  }

  hasMark = (type) => {
    const { value } = this.state
    return value.activeMarks.some(mark => mark.type === type)
  }

  renderMarkButton = (type, icon) => {
    const isActive = this.hasMark(type)
    return (
      <ToolbarButton
        active={isActive}
        type="button"
        onPointerDown={e => this.onMarkClick(e, type)}>
        {icon}
      </ToolbarButton>
    )
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
    const { value, hasFinishedWorking } = this.state
    return (
      <>
        <Toolbar>
          {this.renderMarkButton('bold', 'B')}
          {this.renderMarkButton('italic', 'I')}
          {this.renderMarkButton('underlined', 'U')}
        </Toolbar>
        {hasFinishedWorking
          && (
            <Editor
              spellCheck
              value={value}
              ref={this.ref}
              className="editor"
              placeholder="Start writing your story..."
              onChange={this.onChange}
              onKeyDown={this.onKeyDown}
              renderMark={this.renderMark} />
          )
        }
      </>
    )
  }
}

export default TextEditor
