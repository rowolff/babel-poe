import React from 'react'
import getLastLine from '../../utils/getLastLine'
import POLLING_INTERVAL from '../../utils/constants'

class Filestream extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      original: '',
      intervalId: null
    }
  }

  readFile(file) {
    const intervalId = setInterval(() => {
      getLastLine(file, 1)
        .then(lastLine => {
          this.props.onLogUpdate(lastLine)
          this.setState({ original: lastLine })
        })
        .catch(err => {
          console.error(err)
        })
    }, POLLING_INTERVAL)
    this.setState({ intervalId: intervalId })
  }

  componentWillUpdate(nextProps) {
    if (nextProps.file !== this.props.file) {
      clearInterval(this.state.intervalId)
      this.readFile(nextProps.file[0])
    }
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
