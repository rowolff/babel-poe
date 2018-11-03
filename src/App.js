import React, { Component } from 'react'
import './App.css'

import Whisper from './components/Whisper'
import FilePicker from './components/FilePicker'
import LanguagePicker from './components/LanguagePicker'
import TranslateQueue from './components/TranslateQueue'

import { detectLanguage } from './utils/translate'

import {
  SAVE_KEY_TO_STORAGE,
  HANDLE_SAVE_KEY_TO_STORAGE,
  FETCH_KEY_FROM_STORAGE,
  HANDLE_FETCH_KEY_FROM_STORAGE,
  DEFAULT_PICK_FILE_MESSAGE
} from './utils/constants'
import DetectedLanguage from './components/DetectedLanguage'

const { ipcRenderer } = window.require('electron')

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      file: null,
      original: {},
      fileSaveSuccess: false,
      fileSaveMessage: '',
      targetLanguage: 'en',
      detectedLanguage: null
    }

    this.handleFileChange = this.handleFileChange.bind(this)
    this.handleLogUpdate = this.handleLogUpdate.bind(this)
    this.handleKeySaved = this.handleKeySaved.bind(this)
    this.handleKeyFetch = this.handleKeyFetch.bind(this)
    this.handleLanguageChange = this.handleLanguageChange.bind(this)
  }

  componentDidMount() {
    ipcRenderer.on(HANDLE_SAVE_KEY_TO_STORAGE, this.handleKeySaved)
    ipcRenderer.on(HANDLE_FETCH_KEY_FROM_STORAGE, this.handleKeyFetch)
    this.loadApplicationJson()
  }

  componentWillUnmount() {
    ipcRenderer.removeListener(HANDLE_SAVE_KEY_TO_STORAGE, this.handleKeySaved)
    ipcRenderer.removeListener(
      HANDLE_FETCH_KEY_FROM_STORAGE,
      this.handleKeyFetch
    )
  }

  loadApplicationJson() {
    ipcRenderer.send(FETCH_KEY_FROM_STORAGE, 'path')
    ipcRenderer.send(FETCH_KEY_FROM_STORAGE, 'lang')
  }

  handleKeyFetch(event, data) {
    const { success, message, path, lang } = data
    if (success) {
      if (path) {
        this.setState({ fileSaveMessage: message, file: path })
      }
      if (lang) {
        this.setState({ targetLanguage: lang })
      }
    } else {
      this.setState({
        fileSaveMessage: message + DEFAULT_PICK_FILE_MESSAGE
      })
    }
  }

  handleKeySaved(event, data) {
    const { path, message } = data
    if (path) {
      this.setState({ fileSaveMessage: message, file: path })
    }
  }

  handleFileChange(file) {
    this.setState({ file: file })
    ipcRenderer.send(SAVE_KEY_TO_STORAGE, { path: file })
  }

  handleLanguageChange(e) {
    ipcRenderer.send(SAVE_KEY_TO_STORAGE, { lang: e.target.value })
    this.setState({ targetLanguage: e.target.value })
  }

  handleLogUpdate(obj) {
    if (obj.whisper) {
      detectLanguage(obj.message, (err, detection) => {
        if (err) {
          console.error(err)
        } else {
          this.setState({ detectedLanguage: detection.language, original: obj })
        }
      })
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
          <Whisper file={file} onLogUpdate={this.handleLogUpdate}>
            <DetectedLanguage language={this.state.detectedLanguage} />
          </Whisper>
          <LanguagePicker
            onLanguageChange={this.handleLanguageChange}
            targetLanguage={this.state.targetLanguage}
          />
          <TranslateQueue
            original={original}
            targetLanguage={this.state.targetLanguage}
            detectedLanguage={this.state.detectedLanguage}
          />
        </header>
      </div>
    )
  }
}

export default App
