import React from 'react'

import MessageLine from './MessageLine'

import tail from '../../utils/tail'
import messageFilter from '../../utils/filter'

import { POLLING_INTERVAL } from '../../utils/constants'

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
      intervalId: null
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.file !== this.props.file) {
      tail(this.props.file[0]).start(
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

  componentWillUnmount(props) {
    tail(props.file[0].stop())
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
