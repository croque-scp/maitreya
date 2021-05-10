import { IpcChannelInterface, IpcRequest } from "./ipcChannelInterface"
import { IpcMainEvent } from "electron"
import path from "path"
import fs from "fs"

const eventsPath = path.resolve("./src/events/")

/**
 * IPC channel responsible for reading events directories.
 *
 * Sends list of files in dir as Dirent[] to read-events-dir_response.
 */
export class ReadEventsDirChannel implements IpcChannelInterface {
  name = "read-events-dir"

  handle(event: IpcMainEvent, request: IpcRequest<[string, string]>): void {
    if (!request.responseChannel) {
      request.responseChannel = `${this.name}_response`
    }
    const [dirPath, dirName] = request.params
    const dir = path.join(eventsPath, dirPath, dirName)
    const files = fs
      .readdirSync(dir, { withFileTypes: true })
      .map((file) => [file, file.isDirectory()])
    event.sender.send(request.responseChannel, files)
  }
}

/**
 * IPC channel responsible for reading events files.
 *
 * Sends content of file as string to read-events-file_response.
 */
export class ReadEventsFileChannel implements IpcChannelInterface {
  name = "read-events-file"

  handle(event: IpcMainEvent, request: IpcRequest<[string, string]>): void {
    if (!request.responseChannel) {
      request.responseChannel = `${this.name}_response`
    }
    const [filePath, fileName] = request.params
    const file = path.join(eventsPath, filePath, fileName)
    const eventFile = fs.readFileSync(file, "utf-8")
    // TODO How will the proxy know where to request to write changes to?
    event.sender.send(request.responseChannel, eventFile)
  }
}
