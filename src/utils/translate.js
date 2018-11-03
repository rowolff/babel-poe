const { TRANSLATE_KEY } = require('./keys')

const googleTranslate = require('google-translate')(TRANSLATE_KEY)

export const translate = async (input, callback) => {
  await googleTranslate.translate(input, 'en', callback)
}

export const detectLanguage = async (input, callback) => {
  await googleTranslate.detectLanguage(input, callback)
}
