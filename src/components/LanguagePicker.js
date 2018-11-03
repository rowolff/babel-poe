import React from 'react'

import { LANGUAGES } from '../utils/constants'

class LanguagePicker extends React.Component {
  render() {
    return (
      <div>
        Your Language:
        <select onChange={this.props.onLanguageChange}>
          {LANGUAGES.map(language => (
            <option value={Object.keys(language)}>
              {Object.values(language)[0]}
            </option>
          ))}
        </select>
      </div>
    )
  }
}

export default LanguagePicker
