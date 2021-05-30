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
      ipcRenderer.once("read-events-dir_response", (ipcEvent, filePaths) => {
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
      ipcRenderer.once(
        `read-events-file-${filePath}`,
        (ipcEvent, eventFile) => {
          callback(eventFile)
        }
      )
    },
  },
  writeEventsFile: {
    /**
     * Writes to an individual events file, backing up the old one.
     *
     * @param filePath - The path to the file, including the filename,
     * relative to the events directory.
     * @param textContent - The contents of the new events file.
     */
    send: (filePath: string, textContent: string): void => {
      ipcRenderer.send("write-events-file", {
        params: [filePath, textContent],
        // No custom response channel is used because I don't expect to be
        // saving multiple events that frequently when autosaving - would
        // be worth implementing if there is a save button that saves
        // multiple events, though
      })
    },
    /**
     * Subscribes to the next events file write response.
     */
    singleResponse: (callback: () => void): void => {
      ipcRenderer.once("write-events-file_response", callback)
    },
  },
}

contextBridge.exposeInMainWorld("fileReadWrite", fileReadWriteApi)
