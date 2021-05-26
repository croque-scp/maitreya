<template>
  <main>
    <header>
      <h1>Event Editor</h1>
    </header>
    <p>Pick the event to edit:</p>
    <EditEventSelect
      :events="events"
      :selected-event-id="selectedEventId"
      @event-select="changeSelectedEvent"
    ></EditEventSelect>
    <EditEvent
      v-if="selectedEventId !== null && activeEvent !== null"
      :event="activeEvent"
      :event-id="selectedEventId"
      @update-value="update"
    ></EditEvent>
  </main>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue"
import EditEventSelect from "./EditEventSelect.vue"
import EditEvent from "./EditEvent.vue"
import { Event, EventsList } from "../types"
import { getEvent } from "../lib/identifier"
import { createEventsDirProxy } from "../lib/eventsFilesystemProxy"

export default defineComponent({
  name: "Editor",
  components: {
    EditEvent,
    EditEventSelect,
  },
  setup() {
    console.log("Initialising events")
    const events: EventsList = reactive({})
    createEventsDirProxy(events)
    return { events }
  },
  data() {
    return {
      selectedEventId: <string | null>null,
    }
  },
  computed: {
    activeEvent(): Event | null {
      // If the current ID is null, just don't do anything for now
      if (this.selectedEventId === null) return null
      return getEvent(this.events, this.selectedEventId)
    },
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
    update(newEvent: Event) {
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
})
</script>

<style lang="scss"></style>
