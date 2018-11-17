const messageRegex = /..+?(?:@From)\s+(?:<(.+)>\s+)?(.+)(?=.*?:.*?:):\s(.*)|.+?(?:@From)\s+(?:<(.+)>\s+)?(.+):\s(.*)/i
// this shit thing accounts for whispers which have two ":" in it,
// which is the case for poe.trade auto generated messages :/
// it breaks as soon as thre's a third ":" in the message
// Vlad, please please how the f*** can I do this better??

const messageFilter = message => {
  const matches = messageRegex.exec(message)

  if (matches) {
    let [, guild, user, message] = matches
    const [, , , , autoGuild, autoUser, autoMessage] = matches

    if (autoGuild) {
      guild = autoGuild
      user = autoUser
      message = autoMessage
    }

    return {
      whisper: true,
      guild,
      user,
      message
    }
  } else {
    return {
      whisper: false
    }
  }
}

export default messageFilter
