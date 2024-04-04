import { contextBridge, ipcRenderer } from 'electron'

if (!process.contextIsolated) {
  throw new Error('contextIsolation must be enabled in the BrowserWindow')
}

try {
  contextBridge.exposeInMainWorld('context', {
    closeWindow: () => ipcRenderer.invoke('closeWindow'),
    minimizeWindow: () => ipcRenderer.invoke('minimizeWindow'),
    getDictionary: () => ipcRenderer.invoke('getDictionary')
  })
} catch (error) {
  console.error(error)
}
