const fs = window.require('fs')
const path = window.require('path')
const readline = window.require('readline')
const Stream = window.require('stream')

let lastMsg = ''

export const lastChatMessage = callback => {
  callback(lastMsg)
}

const chatFile = path.join(__dirname, '../../testlog.txt')

const getLastLine = (fileName, minLength) => {
  let inStream = fs.createReadStream(fileName)
  let outStream = new Stream()
  return new Promise((resolve, reject) => {
    let rl = readline.createInterface(inStream, outStream)

    let lastLine = ''
    rl.on('line', function(line) {
      if (line.length >= minLength) {
        lastLine = line
      }
    })

    rl.on('error', reject)

    rl.on('close', function() {
      resolve(lastLine)
    })
  })
}

fs.watch(chatFile, (event, filename) => {
  if (filename) {
    getLastLine(chatFile, 1)
      .then(lastLine => {
        lastMsg = lastLine
        console.log(lastLine)
      })
      .catch(err => {
        console.error(err)
      })
  } else {
    throw new Error('no file provided')
  }
})
