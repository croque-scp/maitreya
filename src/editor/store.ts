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
  mutations: {
    setEvents(state, events: Event) {
      console.log(
        JSON.parse(JSON.stringify(state)),
        JSON.parse(JSON.stringify(events))
      )
      console.log("Mutating")
      state.events = events
      console.log(
        JSON.parse(JSON.stringify(state)),
        JSON.parse(JSON.stringify(events))
      )
    },
  },
  actions: {
    initEvents(context) {
      console.log("Initialising events")
      // Send the request for the events files
      createEventsDirProxy("", "", context.state.events, (event) =>
        context.commit("setEvents", event)
      )
    },
  },
})

export function useStore(): Store<State> {
  return baseUseStore(key)
}
