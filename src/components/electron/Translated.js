import React from 'react'
import translate from '../../utils/translate'

class Translated extends React.Component {
  constructor(props) {
    super()
    this.state = {
      translatedText: 'no file'
    }
  }

  componentWillReceiveProps(nextProps) {
    translate(nextProps.original, (err, translation) => {
      if (err) {
        this.setState({ translatedText: err })
      } else {
        this.setState({ translatedText: translation.translatedText })
      }
    })
  }

  render() {
    return <h3>Translated: {this.state.translatedText}</h3>
  }
}

export default Translated
