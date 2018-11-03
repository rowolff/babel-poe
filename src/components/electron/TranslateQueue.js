import React from 'react'
import Message from './Message'
import translate from '../../utils/translate'
import { QUEUE_SIZE } from '../../utils/constants'

const style = {
  display: 'block',
  textAlign: 'left',
  listStyleType: 'none',
  justifyContent: 'flex-start'
}

class TranslateQueue extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      messageList: []
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.original !== this.props.original) {
      translate(this.props.original.message, (err, translation) => {
        if (err) {
          console.error(err)
        } else {
          const text = translation.translatedText
          const list = this.state.messageList
          if (list.length === QUEUE_SIZE) {
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
        <h4>Last {QUEUE_SIZE} whispers (translated):</h4>
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
