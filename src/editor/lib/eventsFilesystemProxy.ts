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
 */
export function createEventsDirProxy(
  dirPath: string,
  dirName: string,
  parentEvent: Event
): void {
  window.fileReadWrite.readEventsDir.singleResponse((files) => {
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
    files.forEach((file) => {
      // TODO Are class methods (isDirectory()) able to pass through the context
      //  bridge? If not, will need to move that check to the main process and
      //  expose the result as a boolean
      if (file.isDirectory()) {
        return createEventsDirProxy(
          `${dirPath}/${dirName}`, // This should probably be path.join
          file.name,
          event
        )
      }
      return createEventFileProxy(`${dirPath}/${dirName}`, file.name, event)
    })
    // Push this new event to the parent event
    createEventAt(parentEvent, [], event)
  })
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
 */
function createEventFileProxy(
  filePath: string,
  fileName: string,
  parentEvent: Event
): void {
  window.fileReadWrite.readEventsFile.singleResponse((eventFile) => {
    const event = new Proxy(<Event>JSON.parse(eventFile), {})
    // TODO Intercept save requests
    createEventAt(parentEvent, [], event)
  })
  window.fileReadWrite.readEventsFile.send(filePath, fileName)
}
