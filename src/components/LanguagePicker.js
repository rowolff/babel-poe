import React from 'react'

import { LANGUAGES } from '../utils/constants'

class LanguagePicker extends React.Component {
  render() {
    return (
      <div>
        Your Language:
        <select onChange={this.props.onLanguageChange}>
          {LANGUAGES.map(language => (
            <option
              value={Object.keys(language)}
              selected={this.props.targetLanguage === Object.keys(language)[0]}
            >
              {Object.values(language)[0]}
            </option>
          ))}
        </select>
      </div>
    )
  }
}

export default LanguagePicker
