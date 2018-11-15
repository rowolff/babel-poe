const { GTAG } = require('./constants')

const ua = require('universal-analytics')
const uuid = require('uuid/v4')
const storage = require('electron-json-storage')

let userId = 'no user id'

function setupUserOnAppStart() {
  // Retrieve the userid value, if it's not there, we create a new uuid and save it.
  storage.has('user', (err, hasKey) => {
    if (err) {
      reportError(err)
    }
    if (hasKey) {
      storage.get('user', (err, data) => {
        if (err) {
          reportError(err)
        }
        userId = data.userid
        trackEvent(err, ['Application', 'App started'])
      })
    } else {
      userId = uuid()
      storage.set('user', { userid: userId }, err => {
        if (err) {
          reportError(err)
        }
      })
      trackEvent(err, ['Application', 'App started'])
    }
  })
}

function trackEvent(err, trackingValues) {
  const [category, action, label, value] = trackingValues
  if (err) {
    reportError(err)
  }
  const usr = ua(GTAG, { uid: userId, anonymizeIp: true })
  usr
    .event({
      ec: category,
      ea: action,
      el: label,
      ev: value
    })
    .send()
}

function reportError(description) {
  const usr = ua(GTAG, { uid: userId, anonymizeIp: true })
  usr.exception(description).send()
}

module.exports = { setupUserOnAppStart, trackEvent, reportError }
