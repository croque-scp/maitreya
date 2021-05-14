<template>
  <FieldGroup :name="`Event: ${eventId}`">
    <FieldText
      :value="event.id"
      label="ID"
      @update:value="(value) => updateEvent((e) => (e.id = value))"
    ></FieldText>
    <FieldText
      :value="event.summary"
      label="Summary"
      @update:value="(value) => updateEvent((e) => (e.summary = value))"
    ></FieldText>
    <EditInteraction
      v-for="(interaction, index) in event.interactions"
      :key="interaction.id"
      :interaction="interaction"
      @update:interaction="
        (i) => updateEvent((e) => (e.interactions[index] = i))
      "
    ></EditInteraction>
    <!-- TODO Button for add new interaction -->
  </FieldGroup>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"
import FieldGroup from "./FieldGroup.vue"
import { Event } from "../types"
import EditInteraction from "./EditInteraction.vue"
import FieldText from "./FieldText.vue"

export default defineComponent({
  name: "EditEvent",
  components: {
    FieldText,
    EditInteraction,
    FieldGroup,
  },
  props: {
    eventId: {
      type: String,
      required: true,
    },
    event: {
      type: Object as PropType<Event>,
      required: true,
    },
  },
  emits: ["update:event"],
  methods: {
    /**
     * Updates the currently-displayed event.
     *
     * @param change - The change to make to the event.
     */
    updateEvent(change: (event: Event) => void) {
      change(this.event)
      this.$emit("update:event", this.event)
    },
  },
})
</script>

<style lang="scss"></style>
