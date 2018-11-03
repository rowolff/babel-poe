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
            &lt;
            {messageObj.guild}
            &gt; {messageObj.user}: {messageObj.message}
          </p>
        ) : (
          ''
        )}
      </li>
    )
  }
}

export default MessageLine
