import React, { Component } from 'react'
import './App.css'

import Filestream from './components/Filestream'
import FilePicker from './components/FilePicker'
import TranslateQueue from './components/TranslateQueue'

import {
  SAVE_FILEPATH_TO_STORAGE,
  HANDLE_SAVE_FILEPATH_TO_STORAGE,
  FETCH_FILEPATH_FROM_STORAGE,
  HANDLE_FETCH_FILEPATH_FROM_STORAGE,
  DEFAULT_PICK_FILE_MESSAGE
} from './utils/constants'

const { ipcRenderer } = window.require('electron')

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      file: null,
      original: {},
      fileSaveSuccess: false,
      fileSaveMessage: ''
    }

    this.handleFileChange = this.handleFileChange.bind(this)
    this.handleLogUpdate = this.handleLogUpdate.bind(this)
    this.handleFilepathSaved = this.handleFilepathSaved.bind(this)
    this.handleFilepathFetch = this.handleFilepathFetch.bind(this)
  }

  componentDidMount() {
    ipcRenderer.on(HANDLE_SAVE_FILEPATH_TO_STORAGE, this.handleFilepathSaved)
    ipcRenderer.on(HANDLE_FETCH_FILEPATH_FROM_STORAGE, this.handleFilepathFetch)
    this.loadApplicationJson()
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
    const { success, message, path } = data
    if (success) {
      this.setState({ fileSaveMessage: message, file: path })
    } else {
      this.setState({
        fileSaveMessage: message + DEFAULT_PICK_FILE_MESSAGE
      })
    }
  }

  handleFilepathSaved(event, data) {
    const { path, message } = data
    this.setState({ fileSaveMessage: message, file: path })
  }

  handleFileChange(file) {
    this.setState({ file: file })
    ipcRenderer.send(SAVE_FILEPATH_TO_STORAGE, file)
  }

  handleLogUpdate(obj) {
    // todo: filter messages of own language (#43)
    if (obj.whisper) {
      this.setState({ original: obj })
    }
  }

  render() {
    const { fileSaveMessage, file, original } = this.state
    return (
      <div className="App">
        <header className="App-header">
          <p>
            {fileSaveMessage} {file}
          </p>
          <FilePicker onFileChange={this.handleFileChange} />
          <Filestream file={file} onLogUpdate={this.handleLogUpdate} />
          <TranslateQueue original={original} />
        </header>
      </div>
    )
  }
}

export default App
