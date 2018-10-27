import { keys } from './keys'

const googleTranslate = require('google-translate')(keys.TRANSLATE_KEY)

const testTranslate = async callback => {
  await googleTranslate.translate('ich gehe brötchen holen', 'ar', callback)
}

export default testTranslate
