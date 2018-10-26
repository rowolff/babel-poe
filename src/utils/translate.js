// Imports the Google Cloud client library
const { Translate } = require('@google-cloud/translate')

// Your Google Cloud Platform project ID
const projectId = 'subscr-191817'

// Instantiates a client
const translate = new Translate({
  projectId: projectId
})

// The text to translate
const text = 'Hello, world!'
// The target language
const target = 'ru'

// Translates some text into Russian
function testTranslate() {
  console.log("this is a thing we're trying here")
  translate
    .translate(text, target)
    .then(results => {
      const translation = results[0]

      console.log(`Text: ${text}`)
      console.log(`Translation: ${translation}`)
    })
    .catch(err => {
      console.error('ERROR:', err)
    })
}

export default testTranslate
