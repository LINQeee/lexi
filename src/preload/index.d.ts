import { ElectronAPI } from '@electron-toolkit/preload'
import { GetDictionary } from '@shared/types'

declare global {
  interface Window {
    electron: ElectronAPI
    context: {
      closeWindow: () => void
      minimizeWindow: () => void
      getDictionary: () => GetDictionary
    }
  }
}
