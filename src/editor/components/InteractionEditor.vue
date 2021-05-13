<template>
  <FormFieldset :name="`Interaction: ${interaction.id}`">
    <TextField
      :value="interaction.id"
      label="ID"
      @update:value="(value) => updateInteraction((i) => (i.id = value))"
    ></TextField>
    <DropdownField
      label="Speaker"
      :value="interaction.speaker"
      category="speakers"
      @update:value="(value) => updateInteraction((i) => (i.speaker = value))"
    ></DropdownField>
  </FormFieldset>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"
import FormFieldset from "./fields/FormFieldset.vue"
import TextField from "./fields/TextField.vue"
import { Interaction } from "../types"
import DropdownField from "./fields/DropdownField.vue"

export default defineComponent({
  name: "InteractionEditor",
  components: {
    DropdownField,
    FormFieldset,
    TextField,
  },
  props: {
    interaction: {
      type: Object as PropType<Interaction>,
      required: true,
    },
  },
  methods: {
    /**
     * Updates the interaction.
     *
     * @param change - The change to make to the interaction.
     */
    updateInteraction(change: (interaction: Interaction) => void) {
      change(this.interaction)
      this.$emit("update:interaction", this.interaction)
    },
  },
})
</script>

<style lang="scss"></style>
