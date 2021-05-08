import { InjectionKey } from "vue"
import { createStore, Store, useStore as baseUseStore } from "vuex"

import { Event } from "./types"

import { rootEvent } from "./lib/eventsFromFile"

interface State {
  events: Event
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    events: rootEvent,
  },
})

export function useStore(): Store<State> {
  return baseUseStore(key)
}
