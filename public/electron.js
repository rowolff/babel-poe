const {
  SAVE_FILEPATH_TO_STORAGE,
  HANDLE_SAVE_FILEPATH_TO_STORAGE,
  FETCH_FILEPATH_FROM_STORAGE,
  HANDLE_FETCH_FILEPATH_FROM_STORAGE
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

ipcMain.on(FETCH_FILEPATH_FROM_STORAGE, () => {
  storage.get('application', (err, data) => {
    if (err) {
      win.send(HANDLE_FETCH_FILEPATH_FROM_STORAGE, {
        success: false,
        message: 'could not fetch local file containing path'
      })
    }
    win.send(HANDLE_FETCH_FILEPATH_FROM_STORAGE, {
      success: true,
      message: 'loaded path, it is: ',
      path: data.path
    })
  })
})

ipcMain.on(SAVE_FILEPATH_TO_STORAGE, (event, arg) => {
  storage.set('application', { path: arg }, err => {
    if (err) {
      win.send(HANDLE_SAVE_FILEPATH_TO_STORAGE, {
        success: false,
        message: 'could not save path: ',
        path: arg
      })
    }
    win.send(HANDLE_SAVE_FILEPATH_TO_STORAGE, {
      success: true,
      message: 'saved path is: ',
      path: arg
    })
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
