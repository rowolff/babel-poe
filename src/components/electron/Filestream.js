import React from 'react'
import getLastLine from '../../utils/getLastLine'

const fs = window.require('fs')

class Filestream extends React.Component {
  constructor(props) {
    super()
    this.state = {
      original: 'no input'
    }
  }

  componentWillReceiveProps(nextProps) {
    fs.watch(nextProps.file[0], (event, filename) => {
      if (filename) {
        getLastLine(nextProps.file[0], 1)
          .then(lastLine => {
            this.props.onLogUpdate(lastLine)
            this.setState({ original: lastLine })
          })
          .catch(err => {
            console.error(err)
          })
      } else {
      }
    })
  }

  render() {
    return (
      <div>
        <h3>Original: {this.state.original}</h3>
      </div>
    )
  }
}

export default Filestream
