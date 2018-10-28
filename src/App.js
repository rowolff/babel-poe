import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

import Filestream from './components/electron/Filestream'
import Picker from './components/electron/Picker'
import Translated from './components/electron/Translated'

class App extends Component {
  constructor(props) {
    super()
    this.state = {
      file: null,
      original: 'no input',
      translated: 'no input'
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
          <img src={logo} className="App-logo" alt="logo" />
          <Picker onFileChange={this.handleFileChange} />
          <Filestream
            file={this.state.file}
            onLogUpdate={this.handleLogUpdate}
          />
          <Translated
            original={this.state.original}
            translated={this.state.translated}
          />
        </header>
      </div>
    )
  }
}

export default App
