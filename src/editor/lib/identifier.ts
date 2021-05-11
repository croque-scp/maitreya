import { Event, eventOrInteractionIsEvent, Identifier } from "../types"

/**
 * From a registry of events, returns the event that matches the given
 * identifier. Throws an error if no matching event is found.
 *
 * Returns the first result that matches. It is technically possible for
 * there to be multiple matches, but there really shouldn't be.
 *
 * @param event - The root event that contains all the events to be
 * searched. The first key of the identifier must match this event.
 * @param identifier - The identifier for the event as an array of strings.
 */
export function getEventWithIdentifier(
  event: Event,
  identifier: Identifier
): Event {
  console.log(
    "Getting event with id",
    JSON.stringify(identifier),
    "in event with id",
    JSON.stringify(event.id)
  )
  // Check that the first term of the identifier matches this event
  if (identifier[0] !== event.id) {
    throw new Error(
      `${identifier[0]} does not match ${JSON.stringify(event.id)}`
    )
  }
  // If that was the only (remaining) term in the identifier, the search is
  // finished
  if (identifier.length === 1) {
    // All searches should end here - the remainder is used for recursion
    console.log("Result:", JSON.stringify(event.id))
    return event
  }
  // Find which if any of this event's children match the next term of the
  // identifier
  const children = event.interactions.map((child) => {
    console.log("Event child:", JSON.stringify(child.id))
    // Ensure that the child is an event, not an interaction
    if (!eventOrInteractionIsEvent(child)) {
      return false
    }
    try {
      return getEventWithIdentifier(child, identifier.slice(1))
    } catch (error) {
      return false
    }
  })
  // Return a matching child
  const child = <Event>children.find(Boolean)
  if (child) {
    console.log("Found a child with id", JSON.stringify(identifier[1]))
    return child
  }
  console.log("Did not find a child with id", JSON.stringify(identifier[1]))
  throw new Error("No children match the rest of the identifier")
}

/**
 * Creates a new event in the given event at the given identifier.
 *
 * @param rootEvent - The event in which to create a new event.
 * @param identifier - The identifier pointing to the event in which to
 * create the new event.
 * @param event - The event to create.
 * @param mutationCallback - A callback to fire to asynchronously update the
 * data store.
 */
export function createEventAt(
  rootEvent: Event,
  identifier: Identifier,
  event: Event,
  mutationCallback?: () => void
): void {
  console.log(
    "Attempting to create event in root event",
    rootEvent.id,
    "at",
    JSON.stringify(identifier),
    "with id",
    event.id
  )
  if (identifier.length > 0) {
    const targetEventId = identifier[0]
    const targetEvent: Event = rootEvent.interactions.filter(
      (eventOrInteraction): eventOrInteraction is Event => {
        if (!eventOrInteractionIsEvent(eventOrInteraction)) {
          throw new Error("Attempting to create a new event in an interaction")
        }
        return eventOrInteraction.id === targetEventId
      }
    )[0]
    createEventAt(targetEvent, identifier.slice(1), event)
  } else {
    console.log("Creating event", event.id, "in", rootEvent.id)
    rootEvent.interactions.push(event)
    if (mutationCallback) {
      mutationCallback()
    }
  }
}
