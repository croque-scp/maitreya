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
    <EventEditor
      :event="activeEvent"
      @update:event="updateEvent"
      :event-id="selectedEventId"
    ></EventEditor>
  </main>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue"
import EventSelector from "./EventSelector.vue"
import EventEditor from "./EventEditor.vue"
import { Identifier, Event } from "../types"
import { createEventAt, getEventWithIdentifier } from "../lib/identifier"
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
    /**
     * Changes the displayed event of the event editor component.
     *
     * @param eventId - The identifier of the new event to be selected.
     */
    changeSelectedEvent(eventId: Identifier) {
      console.log("Changing selected event to", JSON.stringify(eventId))
      this.selectedEventId = eventId
    },
    /**
     * Updates the currently-displayed event.
     *
     * @param newEvent - The new event object to replace the existing one.
     */
    updateEvent(newEvent: Event) {
      console.log(
        "Updating event in",
        JSON.stringify(this.events.id),
        "at",
        JSON.stringify(this.selectedEventId),
        "with",
        JSON.stringify(newEvent.id)
      )
      createEventAt(this.events, this.selectedEventId, newEvent, "replace")
    },
  },
  computed: {
    activeEvent(): Event {
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
    createEventsDirProxy("", "", events, () => null)
    return {
      events,
      getEventWithIdentifier,
    }
  },
})
</script>

<style lang="scss"></style>
