<template>
  <FormFieldset :name="`Event: ${eventId.join('.')}`">
    <TextField
      label="Summary"
      :value="event.summary"
      @update:value="(value) => updateEvent((e) => (e.summary = value))"
    ></TextField>
    <InteractionEditor
      v-for="interaction in interactions"
      :key="interaction.id"
    ></InteractionEditor>
    <!-- TODO Button for add new sub-event -->
    <!-- TODO Button for add new interaction -->
  </FormFieldset>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"
import FormFieldset from "./FormFieldset.vue"
import { Identifier, Event, eventOrInteractionIsEvent } from "../types"
import InteractionEditor from "./InteractionEditor.vue"
import TextField from "./TextField.vue"

export default defineComponent({
  name: "EventEditor",
  components: { TextField, InteractionEditor, FormFieldset },
  props: {
    eventId: {
      type: Array as PropType<Identifier>,
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
  setup(props) {
    const interactions = props.event.interactions.filter(
      (interaction) => !eventOrInteractionIsEvent(interaction)
    )
    return { interactions }
  },
})
</script>

<style lang="scss"></style>
