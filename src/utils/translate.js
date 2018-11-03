const { TRANSLATE_KEY } = require('./keys')

const googleTranslate = require('google-translate')(TRANSLATE_KEY)

export const translate = async (input, targetLanguage, callback) => {
  await googleTranslate.translate(input, targetLanguage, callback)
}

export const detectLanguage = async (input, callback) => {
  await googleTranslate.detectLanguage(input, callback)
}
