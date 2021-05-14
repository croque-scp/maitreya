<template>
  <FieldGroup :name="`Interaction: ${interaction.id}`">
    <FieldText
      :value="interaction.id"
      label="ID"
      @update:value="(value) => updateInteraction((i) => (i.id = value))"
    ></FieldText>
    <FieldDropdown
      label="Speaker"
      :value="interaction.speaker"
      category="speakers"
      @update:value="(value) => updateInteraction((i) => (i.speaker = value))"
    ></FieldDropdown>
  </FieldGroup>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"
import FieldGroup from "./FieldGroup.vue"
import FieldText from "./FieldText.vue"
import { Interaction } from "../types"
import FieldDropdown from "./FieldDropdown.vue"

export default defineComponent({
  name: "EditInteraction",
  components: {
    FieldDropdown,
    FieldGroup,
    FieldText,
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
