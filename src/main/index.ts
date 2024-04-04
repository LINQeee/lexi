import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import { BrowserWindow, app, ipcMain, shell } from 'electron'
import { join } from 'path'
import { exit } from 'process'
import icon from '../../resources/icon.png?asset'
import { readJSON } from './lib/fileUtils'

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 760,
    show: true,
    autoHideMenuBar: true,
    center: true,
    title: 'Lexi',
    backgroundMaterial: 'acrylic',
    titleBarStyle: 'hidden',
    visualEffectState: 'active',
    vibrancy: 'under-window',
    frame: true,
    maximizable: false,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: true,
      contextIsolation: true
    }
  })

  //mainWindow.setOpacity(0.98)

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  ipcMain.handle('closeWindow', () => exit(0))

  ipcMain.handle('minimizeWindow', () =>
    BrowserWindow.getAllWindows().forEach((window) => {
      window.minimize()
    })
  )

  ipcMain.handle('getDictionary', () => readJSON('./src/main/resources/dictionary.json'))

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
