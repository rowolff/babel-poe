const { GTAG } = require('./constants')

const ua = require('universal-analytics')
const uuid = require('uuid/v4')
const storage = require('electron-json-storage')

async function getUserId() {
  // Retrieve the userid value, if it's not there, we use the new uuid.
  let userId = uuid()
  await storage.has('user', (err, hasKey) => {
    if (err) {
      console.error(err)
    }
    if (hasKey) {
      storage.get('user', (err, data) => {
        if (err) {
          console.error(err)
        }
        userId = data.userid
      })
    } else {
      storage.set('user', { userid: userId }, err => {
        if (err) {
          console.error('cannot save user id')
        }
      })
    }
  })
  return userId
}

async function trackEvent(category, action, label, value) {
  const usr = ua(GTAG, { uid: await getUserId(), anonymizeIp: true })
  usr
    .event({
      ec: category,
      ea: action,
      el: label,
      ev: value
    })
    .send()
}

async function reportError(description) {
  const usr = ua(GTAG, { uid: await getUserId(), anonymizeIp: true })
  usr.exception(description).send()
}

module.exports = { trackEvent, reportError }
