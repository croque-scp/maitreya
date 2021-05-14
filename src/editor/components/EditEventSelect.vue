<template>
  <ul>
    <li v-for="(event, eventId) in events" :key="eventId">
      <button
        :disabled="selectedEventId === eventId"
        @click="$emit('event-select', eventId)"
      >
        {{ eventId }}
      </button>
      {{ event.interactions.length }} interactions
      <!-- TODO Create new sub-event -->
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"
import { EventsList } from "../types"

export default defineComponent({
  name: "EditEventSelect",
  props: {
    events: {
      type: Object as PropType<EventsList>,
      required: true,
    },
    selectedEventId: {
      type: String as PropType<string | null>,
      required: true,
    },
  },
  emits: ["event-select"],
})
</script>

<style lang="scss"></style>
