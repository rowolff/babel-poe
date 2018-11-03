import React from 'react'
import { LANGUAGES } from '../utils/constants'

class DetectedLanguage extends React.Component {
  render() {
    const detectedLanguage = this.props.language
      ? Object.values(
          LANGUAGES.filter(
            language => Object.keys(language)[0] === this.props.language
          )[0]
        )[0]
      : 'no whispers yet'
    return <div>Detected Language: {detectedLanguage}</div>
  }
}

export default DetectedLanguage
