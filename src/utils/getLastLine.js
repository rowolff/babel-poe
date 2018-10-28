const fs = window.require('fs')
const readline = window.require('readline')
const Stream = window.require('stream')

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

export default getLastLine
