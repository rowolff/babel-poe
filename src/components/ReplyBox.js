import React from 'react'
import { translate } from '../utils/translate'

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
          this.setState({ translatedReply: translation.translatedText })
        }
      )
    }
  }

  render() {
    return (
      <div>
        <input onChange={this.handleTextChange} />
        <button onClick={this.handleReply}>REPLY</button>
        <p>{this.state.translatedReply}</p>
      </div>
    )
  }
}

export default ReplyBox
