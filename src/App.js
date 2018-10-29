import React, { Component } from 'react'
import './App.css'

import Filestream from './components/electron/Filestream'
import Picker from './components/electron/Picker'
import TranslateQueue from './components/electron/TranslateQueue'

import {
  SAVE_FILEPATH_TO_STORAGE,
  HANDLE_SAVE_FILEPATH_TO_STORAGE,
  FETCH_FILEPATH_FROM_STORAGE,
  HANDLE_FETCH_FILEPATH_FROM_STORAGE
} from './utils/constants'

const { ipcRenderer } = window.require('electron')

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      file: null,
      original: '',
      fileSaveSuccess: false,
      fileSaveMessage: '',
      fileSavePath: ''
    }

    this.handleFileChange = this.handleFileChange.bind(this)
    this.handleLogUpdate = this.handleLogUpdate.bind(this)
    this.handleFilepathSaved = this.handleFilepathSaved.bind(this)
    this.handleFilepathFetch = this.handleFilepathFetch.bind(this)
  }

  componentDidMount() {
    ipcRenderer.on(HANDLE_SAVE_FILEPATH_TO_STORAGE, this.handleFilepathSaved)
    ipcRenderer.on(HANDLE_FETCH_FILEPATH_FROM_STORAGE, this.handleFilepathFetch)
  }

  componentWillUnmount() {
    ipcRenderer.removeListener(
      HANDLE_SAVE_FILEPATH_TO_STORAGE,
      this.handleFilepathSaved
    )
    ipcRenderer.removeListener(
      HANDLE_FETCH_FILEPATH_FROM_STORAGE,
      this.handleFilepathFetch
    )
  }

  loadApplicationJson() {
    ipcRenderer.send(FETCH_FILEPATH_FROM_STORAGE, 'ping')
  }

  handleFilepathFetch(event, data) {
    const { path } = data
    console.log(path)
    this.setState({ fileSavePath: path })
  }

  handleFilepathSaved(event, data) {
    const { path, message } = data
    this.setState({ fileSaveMessage: message, fileSavePath: path })
  }

  handleFileChange(file) {
    this.setState({ file: file })
    ipcRenderer.send(SAVE_FILEPATH_TO_STORAGE, file)
  }

  handleLogUpdate(line) {
    this.setState({ original: line })
  }

  render() {
    const { fileSaveMessage, fileSavePath } = this.state
    return (
      <div className="App">
        <header className="App-header">
          <Picker onFileChange={this.handleFileChange} />
          <p>
            {fileSaveMessage}: {fileSavePath}
          </p>
          <button onClick={this.loadApplicationJson}>
            Try to load me from application.json
          </button>
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
