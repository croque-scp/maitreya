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
import { defineComponent, PropType, computed } from "vue"
import { Identifier, Event, eventOrInteractionIsEvent } from "../types"
import { getEventWithIdentifier } from "../lib/identifier"

export default defineComponent({
  name: "EventSelector",
  emits: ["event-select"],
  props: {
    eventId: { type: Object as PropType<Identifier>, required: true },
    rootEvent: { type: Object as PropType<Event>, required: true },
  },
  setup(props) {
    // Get the root event of this component
    const event = computed(() =>
      getEventWithIdentifier(props.rootEvent, props.eventId)
    )
    // Get the children of this event, to display
    const children = computed(() =>
      event.value.interactions.filter(Boolean /*eventOrInteractionIsEvent*/)
    )
    console.log("EventSelector", props, children)
    return { events: children }
  },
})
</script>

<style lang="scss"></style>
