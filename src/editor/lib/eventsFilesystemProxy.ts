import { Event, EventsList } from "../types"

/**
 * Asynchronously creates a proxy for the events directory.
 *
 * The proxy here constructs a fake interactions tree and populates it with
 * the files it contains, and intercepts save requests and transmits them to the
 * file proxies.
 *
 * @param events - The events list to store the events in.
 */
export function createEventsDirProxy(events: EventsList): EventsList {
  console.log("Creating events dir proxy")
  window.fileReadWrite.readEventsDir.singleResponse((filePaths) => {
    // Construct and bind this event's children
    filePaths.forEach((filePath) => {
      createEventFileProxy(filePath, events)
    })
    // TODO The dir proxy probably will need to be responsible for correctly
    //  handling outright event replacement events
    //  e.g events[<string>] = <Event>
  })
  window.fileReadWrite.readEventsDir.send()
  return new Proxy(events, {
    set(events, eventId: string, event: Event) {
      console.log("Applying update to event", JSON.stringify(eventId))
      window.fileReadWrite.writeEventsFile.singleResponse(() => {
        console.log("Backup successful for", JSON.stringify(eventId))
      })
      // Make a backup of the old file
      window.fileReadWrite.writeEventsFile.send(
        eventId,
        JSON.stringify(event, null, 2)
      )
      // Make the actual changes to the object
      return Reflect.set(events, eventId, event)
    },
  })
}

/**
 * Asynchronously creates a proxy for a given events file.
 *
 * The proxy here intercepts save requests and transmits them to the file.
 *
 * @param filePath - The path to the events file, including the file name,
 * relative to the events directory.
 * @param events - The list of events to append this event to.
 */
function createEventFileProxy(filePath: string, events: EventsList): void {
  console.log("Creating events file proxy for", JSON.stringify(filePath))
  window.fileReadWrite.readEventsFile.singleResponse(filePath, (eventFile) => {
    events[filePath] = new Proxy(<Event>JSON.parse(eventFile), {})
    // TODO Intercept save requests
  })
  console.log("Requesting file read for path", JSON.stringify(filePath))
  window.fileReadWrite.readEventsFile.send(filePath)
}
