const { statSync, openSync, readSync, closeSync } = window.require('fs')

const readChunk = (filePath, position, length) => {
  let buffer = Buffer.alloc(length)

  const fileDescriptor = openSync(filePath, 'r')
  const bytesRead = readSync(fileDescriptor, buffer, 0, length, position)
  closeSync(fileDescriptor)

  return buffer.slice(0, bytesRead).toString('utf8')
}

const tail = filePath => {
  let previousSize = 0
  let fileChangeCheck = null

  return {
    start: (
      onData,
      { checkInterval = 5000, startFromBeginning = true } = {}
    ) => {
      if (typeof onData !== 'function') {
        throw new Error({ error: 'Must provide the onData callback' })
      }

      fileChangeCheck = setInterval(() => {
        const { size } = statSync(filePath)

        if (previousSize < size) {
          if ((previousSize === 0 && startFromBeginning) || previousSize > 0) {
            const chunk = readChunk(filePath, previousSize, size - previousSize)

            onData(chunk.trim())
          }

          previousSize = size
        }
      }, checkInterval)
    },
    stop: () => {
      previousSize = 0
      clearInterval(fileChangeCheck)
      fileChangeCheck = null
    }
  }
}

module.exports = tail
