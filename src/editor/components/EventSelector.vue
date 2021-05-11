<template>
  <ul>
    <li>EventSelector for {{ eventId }}</li>
    <li v-for="event in events" :key="event.id">
      <button
        v-if="!('interactions' in event)"
        @click="$emit('event-select', event.id)"
      >
        {{ event.id }}
      </button>
      <EventSelector
        v-else
        :event-id="[...eventId, event.id]"
        :root-event="rootEvent"
      ></EventSelector>
      <!-- TODO Create new sub-event -->
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"
import { Identifier, Event } from "../types"
import { getEventWithIdentifier } from "../lib/identifier"

export default defineComponent({
  name: "EventSelector",
  emits: ["event-select"],
  props: {
    eventId: Object as PropType<Identifier>,
    rootEvent: Object as PropType<Event>,
  },
  setup(props) {
    const events =
      getEventWithIdentifier(props.rootEvent, props.eventId)?.interactions ?? []
    return { events }
  },
})
</script>

<style lang="scss"></style>
