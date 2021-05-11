<template>
  <main>
    <header>
      <h1>Event Editor</h1>
    </header>
    <p>Pick the event to edit:</p>
    <EventSelector
      :event-id="['rootEvent']"
      :root-event="events"
      @event-select="changeSelectedEvent"
    ></EventSelector>
    <EventEditor
      :event-id="selectedEventId"
      :event="getEventWithIdentifier(events, selectedEventId)"
    ></EventEditor>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, watch } from "vue"
import EventSelector from "./EventSelector.vue"
import EventEditor from "./EventEditor.vue"
import { Identifier } from "../types"
import { getEventWithIdentifier } from "../lib/identifier"
import { createEventsDirProxy } from "../lib/eventsFilesystemProxy"

export default defineComponent({
  name: "Editor",
  components: { EventEditor, EventSelector },
  methods: {
    changeSelectedEvent(eventId: Identifier) {
      this.selectedEventId = eventId
    },
  },
  setup() {
    console.log("Initialising events")
    const events = reactive({
      id: "rootEvent",
      summary: "Root event",
      interactions: [],
    })
    console.log("rootEvent", events)
    createEventsDirProxy("", "", events)
    const selectedEventId = ref<Identifier>(["rootEvent"])
    return { selectedEventId, events, getEventWithIdentifier }
  },
})
</script>

<style lang="scss"></style>
