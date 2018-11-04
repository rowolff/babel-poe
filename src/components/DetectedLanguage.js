import React from 'react'
import { LANGUAGES } from '../utils/constants'

class DetectedLanguage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      detectedLanguage: 'no whispers yet'
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.language !== this.props.language) {
      const propLang = this.props.language
      const languageObject = LANGUAGES.filter(
        l => Object.keys(l)[0] === propLang
      )[0]
      if (languageObject) {
        const readableLang = languageObject[propLang]
        // because we use a conditon (props have changed) we can:
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({ detectedLanguage: readableLang })
      } else {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          detectedLanguage: 'cannot reliably detect input language'
        })
      }
    }
  }

  render() {
    return (
      <div>
        Detected Language:{' '}
        <span className="highlight">{this.state.detectedLanguage}</span>
      </div>
    )
  }
}

export default DetectedLanguage
