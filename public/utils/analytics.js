const { GTAG } = require('./constants')

const ua = require('universal-analytics')
const uuid = require('uuid/v4')
const storage = require('electron-json-storage')

let userId = uuid()

function setupUserId() {
  // Retrieve the userid value, if it's not there, we use the new uuid.
  storage.has('user', (err, hasKey) => {
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
}

function trackEvent(category, action, label, value) {
  const usr = ua(GTAG, userId)
  usr
    .event({
      ec: category,
      ea: action,
      el: label,
      ev: value
    })
    .send()
}

module.exports = { setupUserId, trackEvent }
