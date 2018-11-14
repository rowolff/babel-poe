/* eslint-disable standard/no-callback-literal */
const { GTAG } = require('./constants')

const ua = require('universal-analytics')
const uuid = require('uuid/v4')
const storage = require('electron-json-storage')

let userId = ''

async function setupUserOnAppStart(callback) {
  // Retrieve the userid value, if it's not there, we create a new uuid and save it.
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
        callback('Application', 'App started')
      })
    } else {
      userId = uuid()
      storage.set('user', { userid: userId }, err => {
        if (err) {
          console.error('cannot save user id')
        }
      })
      callback('Application', 'App started')
    }
  })
}

function trackEvent(category, action, label, value) {
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
