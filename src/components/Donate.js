import React from 'react'
const shell = window.require('electron').shell

class Donate extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    shell.openExternal('https://streamlabs.com/r4wb1rd')
  }

  render() {
    return (
      <div>
        <button className="donatebtn rightbtn" onClick={this.handleClick}>
          Donate!
        </button>
      </div>
    )
  }
}

export default Donate
