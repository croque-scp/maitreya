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
  return getEventOrInteractionWithIdentifier(event, identifier, "event")
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
  // Execution should never reach here, but it is included for type safety
  return null
}
