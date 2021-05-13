import { contextBridge, ipcRenderer } from "electron"

// The types in this API object should be the same as those in
// ipc/fileReadWriteChannel.ts - they are not automatically checked by
// TypeScript
export const fileReadWriteApi = {
  readEventsDir: {
    /**
     * Reads the list of files in the events directory.
     */
    send: (): void => {
      ipcRenderer.send("read-events-dir", {})
    },
    /**
     * Subscribes to the next events directory read response.
     */
    singleResponse: (callback: (filePaths: string[]) => void): void => {
      ipcRenderer.once("read-events-dir_response", (event, filePaths) => {
        callback(filePaths)
      })
    },
  },
  readEventsFile: {
    /**
     * Reads an individual events file.
     *
     * @param filePath - The path to the file, including the filename,
     * relative to the events directory.
     */
    send: (filePath: string): void => {
      ipcRenderer.send("read-events-file", {
        params: filePath,
        responseChannel: `read-events-file-${filePath}`,
      })
    },
    /**
     * Subscribes to the next events file read response.
     */
    singleResponse: (
      filePath: string,
      callback: (eventFile: string) => void
    ): void => {
      ipcRenderer.once(`read-events-file-${filePath}`, (event, eventFile) => {
        callback(eventFile)
      })
    },
  },
}

contextBridge.exposeInMainWorld("fileReadWrite", fileReadWriteApi)
