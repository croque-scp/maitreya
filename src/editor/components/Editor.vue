<template>
  <main>
    <header>
      <h1>Event Editor</h1>
    </header>
    <p>Pick the event to edit:</p>
    <EventSelector
      :event-id="['rootEvent']"
      :root-event="events"
      :selected-event-id="selectedEventId"
      @event-select="changeSelectedEvent"
    ></EventSelector>
    <EventEditor :event="activeEvent" :event-id="selectedEventId"></EventEditor>
  </main>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue"
import EventSelector from "./EventSelector.vue"
import EventEditor from "./EventEditor.vue"
import { Identifier } from "../types"
import { getEventWithIdentifier } from "../lib/identifier"
import { createEventsDirProxy } from "../lib/eventsFilesystemProxy"

export default defineComponent({
  name: "Editor",
  components: {
    EventEditor,
    EventSelector,
  },
  data() {
    return {
      selectedEventId: <Identifier>["rootEvent"],
    }
  },
  methods: {
    changeSelectedEvent(eventId: Identifier) {
      console.log("Changing selected event to", JSON.stringify(eventId))
      this.selectedEventId = eventId
    },
  },
  computed: {
    activeEvent() {
      return getEventWithIdentifier(this.events, this.selectedEventId)
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
    return {
      events,
      getEventWithIdentifier,
    }
  },
})
</script>

<style lang="scss"></style>
