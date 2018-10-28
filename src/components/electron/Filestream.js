import React from 'react'
import getLastLine from '../../utils/getLastLine'
import { keys } from '../../utils/keys'

class Filestream extends React.Component {
  constructor(props) {
    super()
    this.state = {
      original: ''
    }
  }

  intervalFunc(file) {
    getLastLine(file, 1)
      .then(lastLine => {
        this.props.onLogUpdate(lastLine)
        this.setState({ original: lastLine })
      })
      .catch(err => {
        console.error(err)
      })
  }
  componentWillReceiveProps(nextProps) {
    clearInterval(this.intervalFunc)

    setInterval(this.intervalFunc(nextProps.file[0]), keys.POLLING_INTERVAL)
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
