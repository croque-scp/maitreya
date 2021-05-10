import {
  Event,
  eventOrInteractionIsEvent,
  Identifier,
  Interaction,
} from "../types"

export function getInteractionWithIdentifier(
  eventOrInteraction: Event | Interaction,
  identifier: Identifier
): Interaction | null {
  return getEventOrInteractionWithIdentifier(
    eventOrInteraction,
    identifier,
    "interaction"
  )
}

export function getEventWithIdentifier(
  event: Event,
  identifier: Identifier
): Event | null {
  console.log(
    "getting event with id",
    JSON.stringify(identifier),
    "in",
    event.id
  )
  const foundEvent = getEventOrInteractionWithIdentifier(
    event,
    identifier,
    "event"
  )
  console.log("result:", foundEvent?.id)
  return foundEvent
}

/**
 * From a registry of events, returns the either an event or interaction that
 * matches the given identifier. Returns null if no such event or interaction
 * exists. Throws an error if the identifier does not point to the specified
 * type.
 *
 * Returns the first result that matches. It is possible for there to
 * be multiple matches, but other validation steps should prevent this.
 *
 * @param eventOrInteraction - The registry of events or the event that contains
 * all events to be searched.
 * @param identifier - The identifier for the event as an array of strings,
 * relative to the provided event.
 * @param searchType - The type of search to perform.
 */
export function getEventOrInteractionWithIdentifier(
  eventOrInteraction: Event | Interaction,
  identifier: Identifier,
  searchType: "event"
): Event | null
export function getEventOrInteractionWithIdentifier(
  eventOrInteraction: Event | Interaction,
  identifier: Identifier,
  searchType: "interaction"
): Interaction | null
export function getEventOrInteractionWithIdentifier(
  eventOrInteraction: Event | Interaction,
  identifier: Identifier,
  searchType: "event" | "interaction"
): Event | Interaction | null {
  // If there are no search terms in the identifier, the search is finished
  if (identifier.length === 0) {
    if (
      eventOrInteractionIsEvent(eventOrInteraction) &&
      searchType !== "event"
    ) {
      throw new Error("The identifier matches an event")
    }
    if (
      !eventOrInteractionIsEvent(eventOrInteraction) &&
      searchType === "event"
    ) {
      throw new Error("The identifier does not match an event")
    }
    return eventOrInteraction
  }
  if (
    identifier.length === 1 &&
    eventOrInteraction.id === identifier[0] &&
    eventOrInteractionIsEvent(eventOrInteraction) &&
    searchType === "event"
  ) {
    // Special case for matching the top-level event
    // Special cases are probably bad ideas generally but w/e
    return eventOrInteraction
  }
  // If the result is an interaction, any deeper searching would match
  // interaction internals
  if (!eventOrInteractionIsEvent(eventOrInteraction)) {
    throw new Error("The identifier is too deep to match an interaction")
  }
  // Check each of this event's interactions and sub-events for matches
  const match = eventOrInteraction.interactions.find(
    (event) => event.id === identifier[0]
  )
  // If there is no match for the current search term, the interaction does
  // not exist
  if (!match) {
    return null
  }
  // TypeScript will not infer the return type of the recursive call if the
  // searchType is passed to it as a union type, so it has been manually
  // split into its primitives
  if (searchType === "event") {
    return getEventOrInteractionWithIdentifier(
      match,
      identifier.slice(1),
      searchType
    )
  }
  if (searchType === "interaction") {
    return getEventOrInteractionWithIdentifier(
      match,
      identifier.slice(1),
      searchType
    )
  }
  return null
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
      mutationCallback(rootEvent)
    }
  }
}
