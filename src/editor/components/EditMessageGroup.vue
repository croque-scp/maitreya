<template>
  <FieldGroup name="MessageGroup">
    <EditMessageSettings purpose="messages group"></EditMessageSettings>
    <component
      :is="makeComponent(index).is"
      v-for="(_message, index) in messageGroup.messages"
      :key="index"
      v-bind="makeComponent(index).attrs"
      @update-value="makeComponent(index).update($event)"
    ></component>
    <button>Add new message</button>
  </FieldGroup>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"
import FieldGroup from "./FieldGroup.vue"
import FieldText, { DynamicFieldText } from "./FieldText.vue"
import EditSingleMessage, {
  DynamicSingleMessage,
} from "./EditSingleMessage.vue"
import EditConditional, { DynamicConditional } from "./EditConditional.vue"
import EditMessageSettings from "./EditMessageSettings.vue"
import {
  Conditional,
  isConditional,
  MessageGroup,
  SingleMessage,
} from "../types"
import { DynamicComponent } from "./dynamicComponents"

export type DynamicMessageGroup = DynamicComponent<
  EditMessageGroupAttributes,
  MessageGroup
>

export type EditMessageGroupAttributes = {
  messageGroup: MessageGroup
}

export default defineComponent({
  name: "EditMessageGroup",
  components: {
    EditMessageSettings,
    EditConditional,
    EditSingleMessage,
    FieldText,
    FieldGroup,
  },
  props: {
    messageGroup: {
      type: Object as PropType<MessageGroup>,
      required: true,
    },
  },
  emits: ["updateValue"],
  methods: {
    isConditional,
    /**
     * Updates the message group.
     */
    update(change: (messageGroup: MessageGroup) => void) {
      change(this.messageGroup)
      this.$emit("updateValue", this.messageGroup)
    },
    /**
     * For each message in the group, generate the component that represents
     * it.
     */
    makeComponent: function (
      index: number
    ):
      | DynamicFieldText
      | DynamicConditional<string, DynamicFieldText>
      | DynamicConditional<SingleMessage, DynamicSingleMessage>
      | DynamicSingleMessage {
      const message = this.messageGroup.messages[index]
      if (typeof message === "string") {
        return {
          is: FieldText,
          attrs: {
            label: "Edit message",
            value: message,
          },
          update: () => console.log("oh no! (EMG)"),
        }
      }
      if (isConditional(message)) {
        if (typeof message.if.result === "string") {
          // Force a type assertion
          const msg = <Conditional<string>>message
          return {
            is: EditConditional,
            attrs: {
              conditional: msg,
              ifComponent: () => ({
                is: FieldText,
                attrs: {
                  label: "Edit message",
                  value: msg.if.result,
                },
                update: () => console.log("test (FT)"),
              }),
              elifComponent: (index: number) => ({
                is: FieldText,
                attrs: {
                  label: "Edit message",
                  value: msg.elif[index].result,
                },
                update: () => console.log("test (FT)"),
              }),
              elseComponent: () => ({
                is: FieldText,
                attrs: {
                  label: "Edit message",
                  value: msg.else,
                },
                update: () => console.log("test (FT)"),
              }),
            },
            update: () => console.log("oh no! (EMG)"),
          }
        }
        return {
          is: EditConditional,
          attrs: {
            conditional: message,
            ifComponent: () => ({
              is: EditSingleMessage,
              attrs: {},
              update: () => console.log("test (ESM)"),
            }),
            elifComponent: (_index: number) => ({
              is: EditSingleMessage,
              attrs: {},
              update: () => console.log("test (ESM)"),
            }),
            elseComponent: () => ({
              is: EditSingleMessage,
              attrs: {},
              update: () => console.log("test (ESM)"),
            }),
          },
          update: () => console.log("oh no! (EMG)"),
        }
      }
      return {
        is: EditSingleMessage,
        attrs: {},
        update: () => console.log("oh no! (EMG)"),
      }
    },
  },
})
</script>

<style lang="scss"></style>
