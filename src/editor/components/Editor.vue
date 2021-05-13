<template>
  <main>
    <header>
      <h1>Event Editor</h1>
    </header>
    <p>Pick the event to edit:</p>
    <EventSelector
      :events="events"
      :selected-event-id="selectedEventId"
      @event-select="changeSelectedEvent"
    ></EventSelector>
    <EventEditor
      v-if="selectedEventId !== null"
      :event="activeEvent"
      :event-id="selectedEventId"
      @update:event="updateEvent"
    ></EventEditor>
  </main>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue"
import EventSelector from "./EventSelector.vue"
import EventEditor from "./EventEditor.vue"
import { Event, EventsList } from "../types"
import { getEvent } from "../lib/identifier"
import { createEventsDirProxy } from "../lib/eventsFilesystemProxy"

export default defineComponent({
  name: "Editor",
  components: {
    EventEditor,
    EventSelector,
  },
  data() {
    return {
      selectedEventId: <string | null>null,
    }
  },
  methods: {
    /**
     * Changes the displayed event of the event editor component.
     *
     * @param eventId - The identifier of the new event to be selected.
     */
    changeSelectedEvent(eventId: string) {
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
        "Updating event with id",
        JSON.stringify(this.selectedEventId),
        "with",
        JSON.stringify(newEvent.id)
      )
      if (this.selectedEventId === null) return
      this.events[this.selectedEventId] = newEvent
    },
  },
  computed: {
    activeEvent(): Event | null {
      // If the current ID is null, just don't do anything for now
      if (this.selectedEventId === null) return null
      return getEvent(this.events, this.selectedEventId)
    },
  },
  setup() {
    console.log("Initialising events")
    const events: EventsList = reactive({})
    createEventsDirProxy(events)
    return { events }
  },
})
</script>

<style lang="scss"></style>
