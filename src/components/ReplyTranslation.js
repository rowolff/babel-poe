import React from 'react'

const replyColor = {
  color: '#CEC59F'
}

class ReplyTranslation extends React.Component {
  render() {
    return (
      <div>
        Reply <span style={replyColor}>"{this.props.reply}"</span> has been
        copied to clipboard
      </div>
    )
  }
}

export default ReplyTranslation
