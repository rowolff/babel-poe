const {
  SAVE_FILEPATH_TO_STORAGE,
  HANDLE_SAVE_FILEPATH_TO_STORAGE
} = require('../src/utils/constants')

const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const url = require('url')

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

ipcMain.on(SAVE_FILEPATH_TO_STORAGE, () => {
  win.send(HANDLE_SAVE_FILEPATH_TO_STORAGE, {
    success: true,
    message: 'saved path is'
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
