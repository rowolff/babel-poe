import React, { Component } from 'react'
import './App.css'

import Filestream from './components/electron/Filestream'
import Picker from './components/electron/Picker'
import TranslateQueue from './components/electron/TranslateQueue'

import {
  SAVE_FILEPATH_TO_STORAGE,
  HANDLE_SAVE_FILEPATH_TO_STORAGE
} from './utils/constants'

const { ipcRenderer } = window.require('electron')

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      file: null,
      original: '',
      fileSaveSuccess: false,
      fileSaveMessage: ''
    }

    this.handleFileChange = this.handleFileChange.bind(this)
    this.handleLogUpdate = this.handleLogUpdate.bind(this)
    this.handleFilepathSaved = this.handleFilepathSaved.bind(this)
  }

  componentDidMount() {
    ipcRenderer.on(HANDLE_SAVE_FILEPATH_TO_STORAGE, this.handleFilepathSaved)
  }

  componentWillUnmount() {
    ipcRenderer.removeListener(
      HANDLE_SAVE_FILEPATH_TO_STORAGE,
      this.handleFilepathSaved
    )
  }

  handleFilepathSaved(event, data) {
    const { success, message } = data
    this.setState({ fileSaveSuccess: success, fileSaveMessage: message })
  }

  handleFileChange(file) {
    this.setState({ file: file })
    ipcRenderer.send(SAVE_FILEPATH_TO_STORAGE, file)
  }

  handleLogUpdate(line) {
    this.setState({ original: line })
  }

  render() {
    const { fileSaveSuccess, fileSaveMessage } = this.state
    return (
      <div className="App">
        <header className="App-header">
          <Picker onFileChange={this.handleFileChange} />
          <p>
            {fileSaveMessage}: {fileSaveSuccess}
          </p>
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
