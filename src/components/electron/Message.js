import React from 'react'

class Message extends React.Component {
  render() {
    return <li id={this.props.key}>{this.props.message}</li>
  }
}

export default Message
