import React from 'react'
import Message from './Message'
import translate from '../../utils/translate'

const queueSize = 5

const style = {
  display: 'block',
  textAlign: 'left',
  listStyleType: 'none',
  justifyContent: 'flex-start'
}

class TranslateQueue extends React.Component {
  constructor(props) {
    super()
    this.state = {
      messageList: []
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.original !== this.props.original) {
      translate(this.props.original, (err, translation) => {
        if (err) {
          console.error(err)
        } else {
          const text = translation.translatedText
          const list = this.state.messageList
          if (list.length === queueSize) {
            list.shift()
          }
          list.push(text)
          this.setState({ messageList: list })
        }
      })
    }
  }

  render() {
    return (
      <div>
        <h4>Last {queueSize} Messages (translated):</h4>
        <ul style={style}>
          {this.state.messageList.map((message, index) => (
            <Message message={message} key={index} />
          ))}
        </ul>
      </div>
    )
  }
}

export default TranslateQueue
