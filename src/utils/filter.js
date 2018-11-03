const messageRegex = /.+?@From <(.+)>\s+(.+):\s+(.*)/

const messageFilter = message => {
  const matches = messageRegex.exec(message)

  if (matches) {
    const [, guild, user, message] = matches

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
