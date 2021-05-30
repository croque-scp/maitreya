import { IpcChannelInterface, IpcRequest } from "./ipcChannelInterface"
import { IpcMainEvent } from "electron"
import path from "path"
import fs from "fs"
import { execSync } from "child_process"
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

/**
 * Writes a string to an events file, replacing its existing contents, and
 * backing up the previous contents to another file.
 *
 * Parameters for the IpcRequest:
 * @param 0 - Path from the root events dir to the wanted events file.
 * @param 1 - Textual content of the new file.
 */
export class WriteEventsFileChannel implements IpcChannelInterface {
  name = "write-events-file"

  handle(event: IpcMainEvent, request: IpcRequest<[string, string]>): void {
    if (!request.responseChannel) {
      request.responseChannel = `${this.name}_response`
    }
    const [filePath, textContent] = request.params
    const file = path.join(eventsPath, filePath)
    // Create a specific backup. The file name is hashed against the
    // current date, time, and most recent commit.
    const commitHash = execSync("git rev-parse HEAD", {
      encoding: "utf-8",
    }).substring(0, 8)
    // The time is rounded to the previous half hour so there's not an
    // overwhelming number of backups
    const halfAnHour = 1000 * 60 * 30
    const currentTime = new Date(
      Math.floor(new Date().getTime() / halfAnHour) * halfAnHour
    )
    const backupFile = path.join(
      eventsPath,
      filePath.replace(
        ".json",
        `.${currentTime.toISOString()}-${commitHash}.bak.json`
      )
    )
    // Back up the events file, failing if a file with the same name exists
    fs.copyFileSync(file, backupFile, fs.constants.COPYFILE_EXCL)
    // Write the new file
    fs.writeFileSync(file, textContent)
    // Inform the renderer process that the file has been saved
    event.sender.send(request.responseChannel)
  }
}
