import { Event, EventsList } from "../types"

/**
 * From a list of events, returns the event with the given id. Throws an error
 * if no matching event is found.
 *
 * @param events - The list of events to be searched.
 * @param eventId - The id of the wanted event, equivalent to the path of
 * its file.
 */
export function getEvent(events: EventsList, eventId: string): Event {
  console.log("Getting event with id", JSON.stringify(eventId))
  const matchingEvent = events[eventId]
  if (!matchingEvent) {
    throw new Error(`No events match the id ${JSON.stringify(eventId)}`)
  }
  return matchingEvent
}
