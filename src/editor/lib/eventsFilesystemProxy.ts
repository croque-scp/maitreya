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
 * @param mutationCallback - A callback to fire to asynchronously update the
 * data store.
 */
export function createEventsDirProxy(
  dirPath: string,
  dirName: string,
  parentEvent: Event,
  mutationCallback?: () => void
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
    const event = new Proxy<Event>(
      {
        id: dirName,
        summary: `Events from ${dirPath}/${dirName}`,
        interactions: [],
      },
      {}
    )
    // Construct and bind this event's children
    files.forEach(([file, fileIsDirectory]) => {
      if (fileIsDirectory) {
        return createEventsDirProxy(
          `${dirPath}/${dirName}`, // This should probably be path.join
          file.name,
          event,
          mutationCallback
        )
      }
      return createEventFileProxy(
        `${dirPath}/${dirName}`,
        file.name,
        event,
        mutationCallback
      )
    })
    // Push this new event to the parent event
    createEventAt(parentEvent, [], event)
  })
  console.log("Requesting dir read")
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
 * @param mutationCallback - A callback to fire to asynchronously update the
 * data store.
 */
function createEventFileProxy(
  filePath: string,
  fileName: string,
  parentEvent: Event,
  mutationCallback?: () => void
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
    createEventAt(parentEvent, [], event, mutationCallback)
  })
  console.log("Requesting file read")
  window.fileReadWrite.readEventsFile.send(filePath, fileName)
}
