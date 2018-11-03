import React from 'react'
import ReplyTranslation from './ReplyTranslation'
import { translate } from '../utils/translate'

const { clipboard } = window.require('electron')

class ReplyBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      replyText: ''
    }

    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleReply = this.handleReply.bind(this)
  }

  handleTextChange(e) {
    this.setState({ replyText: e.target.value })
  }

  handleReply(e) {
    if (this.props.replyToLanguage) {
      translate(
        this.state.replyText,
        this.props.replyToLanguage,
        (err, translation) => {
          if (err) {
            console.error('cannot translate')
          }
          this.setState({
            translatedReply: translation.translatedText
          })
          clipboard.writeText(
            '@' + this.props.recipient + ' ' + translation.translatedText
          )
          document.getElementById('replyBox').value = ''
        }
      )
    }
  }

  render() {
    const { translatedReply } = this.state
    return (
      <div>
        <input
          id="replyBox"
          placeholder="reply here"
          onChange={this.handleTextChange}
        />
        <button onClick={this.handleReply}>Copy reply to clipboard</button>
        {translatedReply ? <ReplyTranslation reply={translatedReply} /> : ''}
      </div>
    )
  }
}

export default ReplyBox
