import React, { Component } from 'react'
import './App.css'

import Filestream from './components/electron/Filestream'
import Picker from './components/electron/Picker'
import TranslateQueue from './components/electron/TranslateQueue'

class App extends Component {
  constructor(props) {
    super()
    this.state = {
      file: null,
      original: ''
    }

    this.handleFileChange = this.handleFileChange.bind(this)
    this.handleLogUpdate = this.handleLogUpdate.bind(this)
  }

  handleFileChange(file) {
    this.setState({ file: file })
  }

  handleLogUpdate(line) {
    this.setState({ original: line })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Picker onFileChange={this.handleFileChange} />
          <Filestream
            file={this.state.file}
            onLogUpdate={this.handleLogUpdate}
          />
          <TranslateQueue original={this.state.original} />
        </header>
      </div>
    )
  }
}

export default App
