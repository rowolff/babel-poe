import React from 'react'
import MessageLine from './MessageLine'
import { translate } from '../utils/translate'
import { QUEUE_SIZE } from '../utils/constants'

const { getGlobal } = window.require('electron').remote
const trackEvent = getGlobal('trackEvent')
const reportError = getGlobal('reportError')

class TranslateQueue extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      messageList: []
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.original !== this.props.original &&
      this.props.detectedLanguage !== this.props.targetLanguage
    ) {
      translate(
        this.props.original.message,
        this.props.targetLanguage,
        (err, translation) => {
          if (err) {
            reportError(err)
          } else {
            trackEvent('User event', 'Whisper translated')
            const text = translation.translatedText
            const list = this.state.messageList
            if (list.length === QUEUE_SIZE) {
              list.shift()
            }
            list.push({
              guild: this.props.original.guild,
              user: this.props.original.user,
              message: text
            })
            this.setState({ messageList: list })
          }
        }
      )
    }
  }

  render() {
    return (
      <div>
        <h4>Last {QUEUE_SIZE} translated whispers:</h4>
        <ul>
          {this.state.messageList.map((messageObj, index) => (
            <MessageLine message={messageObj} key={index} />
          ))}
        </ul>
      </div>
    )
  }
}

export default TranslateQueue
