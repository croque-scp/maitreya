<template>
  <FormFieldset :name="`Event: ${eventId}`">
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

export default defineComponent({
  name: "EventEditor",
  components: { InteractionEditor, FormFieldset },
  props: {
    eventId: Array as PropType<Identifier>,
    event: Object as PropType<Event>,
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
