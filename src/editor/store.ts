import { InjectionKey } from "vue"
import { createStore, Store, useStore as baseUseStore } from "vuex"
import { createEventsDirProxy } from "./lib/eventsFilesystemProxy"

import { Event } from "./types"

interface State {
  events: Event
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    events: {
      id: "emptyEvent",
      summary: "This event contains no data.",
      interactions: [],
    },
  },
})

/**
 * Get the root event from the base of the events directory
 */
// Send the request for the events files
createEventsDirProxy("", "", store.state.events)

export function useStore(): Store<State> {
  return baseUseStore(key)
}
