<template>
  <FieldGroup name="MessageGroup">
    <EditMessageSettings purpose="messages group"></EditMessageSettings>
    <template v-for="(_message, index) in messageGroup.messages" :key="index">
      <template
        v-for="(dynamicComponent, index_) in [makeComponent(index)]"
        :key="index_"
      >
        <component
          :is="dynamicComponent.is"
          v-bind="dynamicComponent.attrs"
          @update-value="
            'update' in dynamicComponent && dynamicComponent.update($event)
          "
        ></component>
      </template>
    </template>
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
  emits: {
    updateValue(_payload: MessageGroup) {
      return true
    },
  },
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
      | DynamicConditional<DynamicFieldText>
      | DynamicConditional<DynamicSingleMessage>
      | DynamicSingleMessage {
      const message = this.messageGroup.messages[index]
      if (typeof message === "string") {
        return {
          is: FieldText,
          attrs: {
            label: "Edit message",
            value: message,
          },
          update: (value: string) => {
            this.update(
              (messageGroup) => (messageGroup.messages[index] = value)
            )
          },
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
                update: (value: string) => {
                  msg.if.result = value
                  this.update(
                    (messageGroup) => (messageGroup.messages[index] = msg)
                  )
                },
              }),
              elifComponent: (elifIndex: number) => ({
                is: FieldText,
                attrs: {
                  label: "Edit message",
                  value: msg.elif[elifIndex].result,
                },
                update: (value: string) => {
                  msg.elif[index].result = value
                  this.update(
                    (messageGroup) => (messageGroup.messages[index] = msg)
                  )
                },
              }),
              elseComponent: () => ({
                is: FieldText,
                attrs: {
                  label: "Edit message",
                  value: msg.else,
                },
                update: (value: string) => {
                  msg.else = value
                  this.update(
                    (messageGroup) => (messageGroup.messages[index] = msg)
                  )
                },
              }),
            },
          }
        }
        return {
          is: EditConditional,
          attrs: {
            conditional: message,
            ifComponent: () => ({
              is: EditSingleMessage,
              attrs: {},
              update: (value: SingleMessage) => {
                message.if.result = value
                this.update(
                  (messageGroup) => (messageGroup.messages[index] = message)
                )
              },
            }),
            elifComponent: (elifIndex: number) => ({
              is: EditSingleMessage,
              attrs: {},
              update: (value: SingleMessage) => {
                message.elif[elifIndex].result = value
                this.update(
                  (messageGroup) => (messageGroup.messages[index] = message)
                )
              },
            }),
            elseComponent: () => ({
              is: EditSingleMessage,
              attrs: {},
              update: (value: SingleMessage) => {
                message.else = value
                this.update(
                  (messageGroup) => (messageGroup.messages[index] = message)
                )
              },
            }),
          },
        }
      }
      return {
        is: EditSingleMessage,
        attrs: {},
        update: (value: SingleMessage) => {
          this.update((messageGroup) => (messageGroup.messages[index] = value))
        },
      }
    },
  },
})
</script>

<style lang="scss"></style>
