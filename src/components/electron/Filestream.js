import React from 'react'
import tail from '../../utils/tail'
import { POLLING_INTERVAL } from '../../utils/constants'

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
          this.props.onLogUpdate(data)
          this.setState({ original: data })
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
        <h4>Last message (untranslated):</h4>
        <p>{this.state.original}</p>
      </div>
    )
  }
}

export default Filestream
