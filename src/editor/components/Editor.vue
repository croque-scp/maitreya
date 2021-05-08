<template>
  <main>
    <header>
      <h1>Event Editor</h1>
    </header>
    <p>Pick the event to edit:</p>
    <EventSelector
      :event-id="[]"
      @event-select="changeSelectedEvent"
    ></EventSelector>
    <EventEditor
      :event-id="selectedEventId"
      :event="getEventWithIdentifier(events, selectedEventId)"
    ></EventEditor>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import EventSelector from "./EventSelector.vue"
import EventEditor from "./EventEditor.vue"
import { useStore } from "../store"
import { Identifier } from "../types"
import { getEventWithIdentifier } from "../lib/identifier"

export default defineComponent({
  name: "Editor",
  components: { EventEditor, EventSelector },
  methods: {
    changeSelectedEvent(eventId: Identifier) {
      this.selectedEventId = eventId
    },
  },
  setup() {
    const store = useStore()
    const events = store.state.events
    const selectedEventId = ref<Identifier>([events[Object.keys(events)[0]]])
    return { selectedEventId, events, getEventWithIdentifier }
  },
})
</script>

<style lang="scss"></style>
