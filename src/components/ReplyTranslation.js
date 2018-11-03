import React from 'react'

class ReplyTranslation extends React.Component {
  render() {
    return (
      <div>
        <p className="tiny">
          Reply <span className="highlight">"{this.props.reply}"</span> has been
          copied to clipboard
        </p>
      </div>
    )
  }
}

export default ReplyTranslation
