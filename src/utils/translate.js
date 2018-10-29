import TRANSLATE_KEY from './keys'

const googleTranslate = require('google-translate')(TRANSLATE_KEY)

const translate = async (input, callback) => {
  await googleTranslate.translate(input, 'en', callback)
}

export default translate
