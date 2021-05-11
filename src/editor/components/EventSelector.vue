<template>
  <ul>
    <li>
      <button
        :disabled="JSON.stringify(selectedEventId) === JSON.stringify(eventId)"
        @click="$emit('event-select', eventId)"
      >
        {{ eventId.slice(-1)[0] || "&lt;unnamed&gt;" }}
      </button>
      {{ interactions.length ? `${interactions.length} interactions` : "" }}
    </li>
    <li v-for="subEvent in subEvents" :key="subEvent.id">
      <EventSelector
        :event-id="[...eventId, subEvent.id]"
        :root-event="rootEvent"
        :selected-event-id="selectedEventId"
        @event-select="(eventId) => $emit('event-select', eventId)"
      ></EventSelector>
      <!-- TODO Create new sub-event -->
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"
import {
  Event,
  eventOrInteractionIsEvent,
  Identifier,
  Interaction,
} from "../types"
import { getEventWithIdentifier } from "../lib/identifier"

export default defineComponent({
  name: "EventSelector",
  emits: ["event-select"],
  props: {
    eventId: {
      type: Object as PropType<Identifier>,
      required: true,
    },
    rootEvent: {
      type: Object as PropType<Event>,
      required: true,
    },
    selectedEventId: {
      type: Object as PropType<Identifier>,
      required: true,
    },
  },
  computed: {
    /**
     * This component's event
     */
    thisEvent(): Event {
      return getEventWithIdentifier(this.rootEvent, this.eventId)
    },
    /**
     * Interactions contained within this component's event
     */
    interactions(): Interaction[] {
      return this.thisEvent.interactions.filter(
        (eOI) => !eventOrInteractionIsEvent(eOI)
      )
    },
    /**
     * Events that are direct children of this component's event
     */
    subEvents(): Event[] {
      return this.thisEvent.interactions.filter(eventOrInteractionIsEvent)
    },
  },
})
</script>

<style lang="scss"></style>
