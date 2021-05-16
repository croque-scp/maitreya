<template>
  <FieldGroup :name="`Interaction: ${interaction.id}`">
    <FieldText
      :value="interaction.id"
      label="ID"
      @update:value="(value) => update((i) => (i.id = value))"
    ></FieldText>
    <FieldDropdown
      label="Speaker"
      :value="interaction.speaker"
      category="speakers"
      @update:value="(value) => update((i) => (i.speaker = value))"
    ></FieldDropdown>
    <FieldGroup name="Messages">
      <component
        :is="makeComponent(index).is"
        v-for="(_messageGroup, index) in interaction.messages"
        :key="index"
        v-bind="makeComponent(index).attrs"
      ></component>
    </FieldGroup>
  </FieldGroup>
</template>

<!--
EditConditional and EditMessageGroup accept entirely different arguments -
so I think I need to make a function that generates the right arguments for
each one. I think this same function might as well generate which component
to use, too, instead of declaring both in the template with v-if and v-else.
-->

<script lang="ts">
import { defineComponent, PropType } from "vue"
import FieldGroup from "./FieldGroup.vue"
import FieldText from "./FieldText.vue"
import { Interaction, isConditional } from "../types"
import FieldDropdown from "./FieldDropdown.vue"
import EditMessageGroup from "./EditMessageGroup.vue"
import EditConditional from "./EditConditional.vue"

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
  emits: ["update:interaction"],
  methods: {
    isConditional,
    /**
     * Updates the interaction.
     *
     * @param change - The change to make to the interaction.
     */
    update(change: (interaction: Interaction) => void) {
      change(this.interaction)
      this.$emit("update:interaction", this.interaction)
    },
    /**
     * For each immediate descendant of the interaction, generates the
     * component that represents it.
     *
     * @param index - The index of the descendant.
     */
    makeComponent(index: number) {
      const messageGroup = this.interaction.messages[index]
      if (isConditional(messageGroup)) {
        return {
          is: EditConditional,
          attrs: {
            conditional: messageGroup,
          },
        }
      }
      return {
        is: EditMessageGroup,
        attrs: {
          messageGroup,
        },
      }
    },
  },
})
</script>

<style lang="scss"></style>
