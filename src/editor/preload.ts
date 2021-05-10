import type { Dirent } from "fs"
import { contextBridge, ipcRenderer } from "electron"

export const fileReadWriteApi = {
  readEventsDir: {
    send: (dirPath: string, dirName: string): void => {
      ipcRenderer.send("read-events-dir", {
        params: [dirPath, dirName],
      })
    },
    singleResponse: (callback: (files: [Dirent, boolean][]) => void): void => {
      ipcRenderer.once("read-events-dir_response", (event, files) => {
        // Deliberately strip event as it includes `sender`
        callback(files)
      })
    },
  },
  readEventsFile: {
    send: (filePath: string, fileName: string): void => {
      ipcRenderer.send("read-events-file", {
        params: [filePath, fileName],
      })
    },
    singleResponse: (callback: (eventFile: string) => void): void => {
      ipcRenderer.once("read-events-file_response", (event, eventFile) => {
        // Deliberately strip event as it includes `sender`
        callback(eventFile)
      })
    },
  },
}

contextBridge.exposeInMainWorld("fileReadWrite", fileReadWriteApi)
