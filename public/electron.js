const {
  SAVE_KEY_TO_STORAGE,
  HANDLE_SAVE_KEY_TO_STORAGE,
  FETCH_KEY_FROM_STORAGE,
  HANDLE_FETCH_KEY_FROM_STORAGE
} = require('./constants')

const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const url = require('url')
const storage = require('electron-json-storage')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600
  })

  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, '/../build/index.html'),
      protocol: 'file:',
      slashes: true
    })
  win.loadURL(startUrl)

  // Emitted when the window is closed.
  win.on('closed', () => {
    win = null
  })
}

ipcMain.on(FETCH_KEY_FROM_STORAGE, () => {
  storage.has('application', (err, hasKey) => {
    if (err) {
      win.send(HANDLE_FETCH_KEY_FROM_STORAGE, {
        success: false,
        message: 'an error occured with storage library'
      })
    }
    if (hasKey) {
      storage.get('application', (err, data) => {
        if (err) {
          win.send(HANDLE_FETCH_KEY_FROM_STORAGE, {
            success: false,
            message: 'could not fetch local file containing path'
          })
        }
        if (data.path) {
          // todo: fix this!!!!
          const returnObj = {}
          const keyVal = data[path.toString()]
          returnObj[path] = keyVal
          returnObj.success = true
          returnObj.message = 'reading from settings: '
          win.send(HANDLE_FETCH_KEY_FROM_STORAGE, {
            success: true,
            message: 'returning key...',
            path: data.path
          })
        }
      })
    } else {
      win.send(HANDLE_FETCH_KEY_FROM_STORAGE, {
        success: false,
        message: 'Please select a log file.'
      })
    }
  })
})

ipcMain.on(SAVE_KEY_TO_STORAGE, (event, pair) => {
  const returnObj = Object.assign({}, pair)
  storage.set('application', pair, err => {
    if (err) {
      returnObj.success = false
      returnObj.message = 'could not save key: '
      win.send(HANDLE_SAVE_KEY_TO_STORAGE, returnObj)
    }
    returnObj.success = true
    returnObj.message = 'saved to settings: '
    win.send(HANDLE_SAVE_KEY_TO_STORAGE, returnObj)
  })
})

app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
