import React from 'react'
import tail from '../../utils/tail'
import { POLLING_INTERVAL } from '../../utils/constants'
import messageFilter from '../../utils/filter'

class Filestream extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      original: '',
      intervalId: null
    }
  }

  componentWillUpdate(nextProps) {
    if (nextProps.file !== this.props.file) {
      tail(nextProps.file[0]).start(
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
        <p>{this.state.original.message}</p>
      </div>
    )
  }
}

export default Filestream
