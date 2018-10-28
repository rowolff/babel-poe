import { keys } from './keys'
// import { lastChatMessage } from './filestream'

const googleTranslate = require('google-translate')(keys.TRANSLATE_KEY)

const testTranslate = async callback => {
  // let lastMsg = lastChatMessage(msg => msg)
  await googleTranslate.translate('hello world', 'ar', callback)
}

export default testTranslate
