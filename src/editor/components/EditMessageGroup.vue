<template>
  <FieldGroup name="MessageGroup">
    <EditMessageSettings purpose="messages group"></EditMessageSettings>
    <component
      :is="makeComponent(index).is"
      v-for="(_message, index) in messageGroup.messages"
      :key="index"
      v-bind="makeComponent(index).attrs"
    ></component>
    <button>Add new message</button>
  </FieldGroup>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"
import FieldGroup from "./FieldGroup.vue"
import FieldText, { FieldTextAttrs } from "./FieldText.vue"
import EditSingleMessage, {
  EditSingleMessageAttrs,
} from "./EditSingleMessage.vue"
import EditConditional, { EditConditionalAttrs } from "./EditConditional.vue"
import EditMessageSettings from "./EditMessageSettings.vue"
import { Conditional, isConditional, MessageGroup } from "../types"
import { DynamicComponent } from "./dynamicComponents"

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
  emits: ["update:messageGroup"],
  methods: {
    isConditional,
    /**
     * Updates the message group.
     */
    update(change: (messageGroup: MessageGroup) => void) {
      change(this.messageGroup)
      this.$emit("update:messageGroup", this.messageGroup)
    },
    /**
     * For each message in the group, generate the component that represents
     * it.
     */
    makeComponent: function (
      index: number
    ):
      | DynamicComponent<typeof FieldText, FieldTextAttrs>
      | DynamicComponent<
          typeof EditConditional,
          EditConditionalAttrs<typeof FieldText, FieldTextAttrs>
        >
      | DynamicComponent<
          typeof EditConditional,
          EditConditionalAttrs<typeof EditSingleMessage, EditSingleMessageAttrs>
        >
      | DynamicComponent<typeof EditSingleMessage, EditSingleMessageAttrs> {
      const message = this.messageGroup.messages[index]
      if (typeof message === "string") {
        return {
          is: FieldText,
          attrs: {
            label: "Edit message",
            value: message,
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
              childComponent: FieldText,
              childAttrs: {
                ifAttrs: () => ({
                  label: "Edit message",
                  value: msg.if.result,
                }),
                elifAttrs: (index: number) => ({
                  label: "Edit message",
                  value: msg.elif[index].result,
                }),
                elseAttrs: () => ({
                  label: "Edit message",
                  value: msg.else,
                }),
              },
            },
          }
        }
        return {
          is: EditConditional,
          attrs: {
            conditional: message,
            childComponent: EditSingleMessage,
            childAttrs: {
              ifAttrs: () => ({}),
              elifAttrs: (_index) => ({}),
              elseAttrs: () => ({}),
            },
          },
        }
      }
      return {
        is: EditSingleMessage,
        attrs: {},
      }
    },
  },
})
</script>

<style lang="scss"></style>
