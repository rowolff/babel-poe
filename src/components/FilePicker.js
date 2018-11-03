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
        <button
          className={this.props.file ? 'fileready' : ''}
          onClick={this.handleClick}
        >
          {this.props.file ? 'Change file' : 'Select Client.txt location'}
        </button>
      </div>
    )
  }
}

export default Picker
