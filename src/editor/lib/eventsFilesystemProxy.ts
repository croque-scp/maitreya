import { Event } from "../types"
import { createEventAt } from "./identifier"

/**
 * Creates a proxy for a given events directory, and binds it to the given
 * events object at the given identifier.
 *
 * The proxy here constructs a fake interactions tree and populates it with
 * the files it contains, and intercepts save requests and transmits them to the
 * file proxies.
 *
 * @param dirPath - The path of the directory that contains the target
 * directory.
 * @param dirName - The name of the target directory.
 * @param parentEvent - The event that will contain this event.
 * @param parentDoAfterCallback - A callback to fire to asynchronously update
 * the data store.
 */
export function createEventsDirProxy(
  dirPath: string,
  dirName: string,
  parentEvent: Event,
  parentDoAfterCallback: () => void
): void {
  console.log(
    "Creating events dir proxy for",
    `${dirPath}/${dirName}`,
    "in",
    parentEvent.id
  )
  window.fileReadWrite.readEventsDir.singleResponse((files) => {
    console.log(
      "Received dir read for",
      `${dirPath}/${dirName}`,
      "with",
      files.length,
      "files"
    )
    // Create the new event
    let event: Event = {
      id: dirName,
      summary: `Events from ${dirPath}/${dirName}`,
      interactions: [],
    }
    // Define a callback to be executed after the children are sorted
    function doAfterCallback() {
      // Put the event into a proxy
      event = new Proxy(event, {})
      console.log(
        "About to push a dir event with id",
        JSON.stringify(event.id),
        "into a parent event with id",
        JSON.stringify(parentEvent.id)
      )
      // Push this new event to the parent event
      createEventAt(parentEvent, [], event)
      // Execute the parent's callback
      parentDoAfterCallback()
    }
    // Construct and bind this event's children
    files.forEach(([file, fileIsDirectory]) => {
      if (fileIsDirectory) {
        console.log(
          "File with name",
          file.name,
          "is a directory, so creating a dir proxy in event with id",
          JSON.stringify(event.id)
        )
        return createEventsDirProxy(
          `${dirPath}/${dirName}`, // This should probably be path.join
          file.name,
          event,
          doAfterCallback
        )
      }
      console.log(
        "File with name",
        file.name,
        "is not a directory, so creating a file proxy in event with id",
        JSON.stringify(event.id)
      )
      return createEventFileProxy(
        `${dirPath}/${dirName}`,
        file.name,
        event,
        doAfterCallback
      )
    })
  })
  console.log(
    "Requesting dir read for path",
    JSON.stringify(dirPath),
    "and name",
    JSON.stringify(dirName)
  )
  window.fileReadWrite.readEventsDir.send(dirPath, dirName)
}

/**
 * Creates a proxy for a given events file and binds it to the given parent
 * event.
 *
 * The proxy here intercepts save requests and transmits them to the file.
 *
 * @param filePath - The path to the directory containing the events file.
 * @param fileName - The name of the events file.
 * @param parentEvent - The event that will contain this event.
 * @param parentDoAfterCallback - A callback to fire to asynchronously
 * update the
 * data store.
 */
function createEventFileProxy(
  filePath: string,
  fileName: string,
  parentEvent: Event,
  parentDoAfterCallback: () => void
): void {
  console.log(
    "Creating events file proxy for",
    `${filePath}/${fileName}`,
    "in",
    parentEvent.id
  )
  window.fileReadWrite.readEventsFile.singleResponse((eventFile) => {
    console.log("Received file read for", `${filePath}/${fileName}`)
    const event = new Proxy(<Event>JSON.parse(eventFile), {})
    // TODO Intercept save requests
    createEventAt(parentEvent, [], event)
    parentDoAfterCallback()
  })
  console.log(
    "Requesting file read for path",
    JSON.stringify(filePath),
    "and name",
    JSON.stringify(fileName)
  )
  window.fileReadWrite.readEventsFile.send(filePath, fileName)
}
