import { InjectionKey } from "vue"
import { createStore, Store, useStore as baseUseStore } from "vuex"

import events from "../events/test/sample_event.json"
import { Event } from "./types"

interface State {
  events: Event
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    events,
  },
})

export function useStore(): Store<State> {
  return baseUseStore(key)
}
