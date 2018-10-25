import React from 'react'

const { dialog } = window.require('electron').remote

const buttonStyle = {
  margin: '10px'
}

class Picker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedFile: 'no file selected'
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    dialog.showOpenDialog(
      {
        properties: ['openFile', 'multiSelections']
      },
      files => {
        if (files !== undefined) {
          this.setState({ selectedFile: files })
        }
      }
    )
  }

  render() {
    return (
      <div>
        <button style={buttonStyle} onClick={this.handleClick}>
          Some random file picker
        </button>
        <h2>{this.state.selectedFile}</h2>
      </div>
    )
  }
}

export default Picker
