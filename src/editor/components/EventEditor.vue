<template>
  <FormFieldset :name="`Event: ${eventId}`">
    <TextField
      :value="event.summary"
      label="Summary"
      @update:value="(value) => updateEvent((e) => (e.summary = value))"
    ></TextField>
    <InteractionEditor
      v-for="interaction in event.interactions"
      :key="interaction.id"
    ></InteractionEditor>
    <!-- TODO Button for add new sub-event -->
    <!-- TODO Button for add new interaction -->
  </FormFieldset>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"
import FormFieldset from "./FormFieldset.vue"
import { Event } from "../types"
import InteractionEditor from "./InteractionEditor.vue"
import TextField from "./TextField.vue"

export default defineComponent({
  name: "EventEditor",
  components: {
    TextField,
    InteractionEditor,
    FormFieldset,
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
