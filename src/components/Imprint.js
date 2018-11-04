import React from 'react'
import { imprint } from '../assets/imprint'

class Imprint extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      buttonLabel: 'Imprint, FAQ & Privacy Notice',
      style: 'disabled',
      expanded: false
    }

    this.toggleImprint = this.toggleImprint.bind(this)
  }

  toggleImprint() {
    this.state.expanded
      ? this.setState({
          style: 'disabled',
          buttonLabel: 'Imprint, FAQ & Privacy Notice',
          expanded: false
        })
      : this.setState({ style: '', buttonLabel: 'x', expanded: true })
  }

  render() {
    return (
      <div>
        <button onClick={this.toggleImprint}>{this.state.buttonLabel}</button>
        <div className={this.state.style + ' imprint'}>
          {imprint.map(paragraph => {
            return (
              <div className={this.state.style}>
                <h1>{paragraph.heading}</h1>
                <h4>{paragraph.subheading}</h4>
                <p>{paragraph.body}</p>
              </div>
            )
          })}
          <button onClick={this.toggleImprint}>Close</button>
          <div className={this.state.style + ' cover'} />
        </div>
      </div>
    )
  }
}

export default Imprint
