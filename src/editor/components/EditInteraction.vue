<template>
  <FieldGroup :name="`Interaction: ${interaction.id}`">
    <FieldText
      :value="interaction.id"
      label="ID"
      @update-value="(value) => update((i) => (i.id = value))"
    ></FieldText>
    <FieldDropdown
      label="Speaker"
      :value="interaction.speaker"
      category="speakers"
      @update-value="(value) => update((i) => (i.speaker = value))"
    ></FieldDropdown>
    <FieldGroup name="Messages">
      <component
        :is="makeComponent(index).is"
        v-for="(_messageGroup, index) in interaction.messages"
        :key="index"
        v-bind="makeComponent(index).attrs"
        @update-value="makeComponent(index).update($event)"
      ></component>
    </FieldGroup>
  </FieldGroup>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"
import FieldGroup from "./FieldGroup.vue"
import FieldText from "./FieldText.vue"
import { Interaction, isConditional, MessageGroup } from "../types"
import FieldDropdown from "./FieldDropdown.vue"
import EditMessageGroup, { DynamicMessageGroup } from "./EditMessageGroup.vue"
import EditConditional, { DynamicConditional } from "./EditConditional.vue"

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
  emits: ["updateValue"],
  methods: {
    isConditional,
    /**
     * Updates the interaction.
     *
     * @param change - The change to make to the interaction.
     */
    update(change: (interaction: Interaction) => void) {
      change(this.interaction)
      this.$emit("updateValue", this.interaction)
    },
    /**
     * For each immediate descendant of the interaction, generates the
     * component that represents it.
     *
     * @param index - The index of the descendant.
     */
    makeComponent(
      index: number
    ):
      | DynamicConditional<MessageGroup, DynamicMessageGroup>
      | DynamicMessageGroup {
      const messageGroup = this.interaction.messages[index]
      if (isConditional(messageGroup)) {
        return {
          is: EditConditional,
          attrs: {
            conditional: messageGroup,
            ifComponent: () => ({
              is: EditMessageGroup,
              attrs: {
                messageGroup: messageGroup.if.result,
              },
              update: () => console.log("oh no! (EMG)"),
            }),
            elifComponent: (index: number) => ({
              is: EditMessageGroup,
              attrs: {
                messageGroup: messageGroup.elif[index].result,
              },
              update: () => console.log("oh no! (EMG)"),
            }),
            elseComponent: () => ({
              is: EditMessageGroup,
              attrs: {
                messageGroup: messageGroup.else,
              },
              update: () => console.log("oh no! (EMG)"),
            }),
          },
          update: () => console.log("oh no! (EI)"),
        }
      }
      return {
        is: EditMessageGroup,
        attrs: {
          messageGroup,
        },
        update: () => console.log("oh no! (EI)"),
      }
    },
  },
})
</script>

<style lang="scss"></style>
