import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

import testTranslate from './utils/translate'

import Picker from './components/electron/Picker'

class App extends Component {
  constructor(props) {
    super()
    this.state = {
      translatedText: 'translating...'
    }
  }
  componentDidMount() {
    testTranslate((err, translation) => {
      if (err) {
        throw new Error(err)
      } else {
        this.setState({ translatedText: translation.translatedText })
      }
    })
  }

  render() {
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
          <h2>{this.state.translatedText}</h2>
        </header>
      </div>
    )
  }
}

export default App
