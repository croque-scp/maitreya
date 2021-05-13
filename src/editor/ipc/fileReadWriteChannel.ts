import { IpcChannelInterface, IpcRequest } from "./ipcChannelInterface"
import { IpcMainEvent } from "electron"
import path from "path"
import fs from "fs"
import recursiveReadDir from "recursive-readdir"

const eventsPath = path.resolve("./src/events/")

// The types in this IPC channel should be the same as those in preload.ts -
// they are not automatically checked by TypeScript

/**
 * Reads the events dir and returns a list of files within it.
 */
export class ReadEventsDirChannel implements IpcChannelInterface {
  name = "read-events-dir"

  handle(event: IpcMainEvent, request: IpcRequest<never>): void {
    recursiveReadDir(eventsPath, (_, filePaths) => {
      filePaths = filePaths.map((filePath) =>
        // Strip the constant part of the path from the list to make a list
        // of paths relative to the events directory
        filePath.slice(eventsPath.length)
      )
      if (!request.responseChannel) {
        request.responseChannel = `${this.name}_response`
      }
      event.sender.send(request.responseChannel, filePaths)
    })
  }
}

/**
 * Reads an individual events file and returns its contents.
 */
export class ReadEventsFileChannel implements IpcChannelInterface {
  name = "read-events-file"

  handle(event: IpcMainEvent, request: IpcRequest<string>): void {
    if (!request.responseChannel) {
      request.responseChannel = `${this.name}_response`
    }
    const filePath = request.params
    const file = path.join(eventsPath, filePath)
    const eventFile = fs.readFileSync(file, "utf-8")
    event.sender.send(request.responseChannel, eventFile)
  }
}
