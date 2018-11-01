import React from 'react'

const { dialog } = window.require('electron').remote

class Picker extends React.Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    dialog.showOpenDialog(
      {
        properties: ['openFile']
      },
      file => {
        if (file !== undefined) {
          this.props.onFileChange(file)
        }
      }
    )
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Select Client.txt location</button>
      </div>
    )
  }
}

export default Picker
