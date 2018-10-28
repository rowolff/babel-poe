import React from 'react'

const { dialog } = window.require('electron').remote

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
        properties: ['openFile']
      },
      file => {
        if (file !== undefined) {
          this.props.onFileChange(file)
          this.setState({ selectedFile: file })
        }
      }
    )
  }

  render() {
    return (
      <div>
        <p>File: {this.state.selectedFile}</p>
        <button onClick={this.handleClick}>Select text file</button>
      </div>
    )
  }
}

export default Picker
