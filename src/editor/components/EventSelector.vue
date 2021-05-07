<template>
  <ul>
    <li v-for="event in events" :key="event.id">
      <button
        v-if="!('interactions' in event)"
        @click="$emit('event-select', event.id)"
      >
        {{ event.id }}
      </button>
      <EventSelector v-else :event-id="[...eventId, event.id]"></EventSelector>
      <!-- TODO Create new sub-event -->
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"
import { Identifier } from "../types"
import { useStore } from "../store"
import { getEventWithIdentifier } from "../lib/identifier"

export default defineComponent({
  name: "EventSelector",
  emits: ["event-select"],
  props: {
    eventId: Object as PropType<Identifier>,
  },
  setup(props) {
    const store = useStore()

    const events =
      getEventWithIdentifier(store.state.events, props.eventId)?.interactions ??
      []

    return { events }
  },
})
</script>

<style lang="scss"></style>
