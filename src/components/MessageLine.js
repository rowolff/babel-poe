import React from 'react'

class MessageLine extends React.Component {
  render() {
    const messageObj =
      Object.keys(this.props.message).length > 0
        ? this.props.message
        : undefined
    return (
      <li id={this.props.key}>
        {messageObj ? (
          <p>
            <span className="highlight">
              {messageObj.guild ? '<' : ''}
              {messageObj.guild}
              {messageObj.guild ? '> ' : ''}
              {messageObj.user}:
            </span>{' '}
            {messageObj.message}
          </p>
        ) : (
          ''
        )}
      </li>
    )
  }
}

export default MessageLine
