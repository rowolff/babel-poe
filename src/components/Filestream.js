import React from 'react'

import MessageLine from './MessageLine'

import Tail from '../utils/tail'
import messageFilter from '../utils/filter'

import { POLLING_INTERVAL } from '../utils/constants'

const style = {
  display: 'block',
  textAlign: 'left',
  listStyleType: 'none',
  justifyContent: 'flex-start'
}

class Filestream extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      original: {},
      currentFileInstance: null
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.file !== this.props.file) {
      const Filetail = Tail(this.props.file[0])
      if (prevProps.file) {
        this.state.currentFileInstance.stop()
      }
      // because we use a conditon (props have changed) we can:
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ currentFileInstance: Filetail })
      Filetail.start(
        data => {
          const messageObject = messageFilter(data)
          if (messageObject.whisper) {
            this.props.onLogUpdate(messageObject)
            this.setState({ original: messageObject })
          }
        },
        {
          checkInterval: POLLING_INTERVAL,
          startFromBeginning: false
        }
      )
    }
  }

  componentWillUnmount() {
    if (this.state.currentFileInstance) {
      this.state.currentFileInstance.stop()
    }
  }

  render() {
    return (
      <div>
        <h4>Last whisper (untranslated):</h4>
        <ul style={style}>
          <MessageLine message={this.state.original} key="original" />
        </ul>
      </div>
    )
  }
}

export default Filestream
