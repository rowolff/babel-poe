import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

import testTranslate from './utils/translate'

import Picker from './components/electron/Picker'

class App extends Component {
  render() {
    testTranslate()
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            This is some st0pid test if I can get react to work with electron...
          </p>
          <a
            className="App-link"
            href="http://rawbird.net"
            target="_blank"
            rel="noopener noreferrer"
          >
            It's me
          </a>
          <Picker />
        </header>
      </div>
    )
  }
}

export default App
