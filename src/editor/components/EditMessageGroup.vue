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

<!--
What I Was About To Do

I just made the isConditional method, and I just sort of came up with a way
to pass attributes to a dynamic component in EditConditional. I also added a
Conditional<string> to a MessageGroup in the second test event.

My next priority is to find out whether my EditConditional component would
work or not. To do that, I need to instantiate it here for the second test
event. That means setting up this component and this component's parents as
much as is necessary to get a simple test to work.

I will pass TextField and any needed arguments to the EditConditional -
somehow. The critical bit is seeing whether I can correctly pass edit events
back up the chain. I don't actually know what happens when the events
/don't/ propagate - I assume just no changes happen - but I should avoid
implementing the events initially just to see what happens. It may be the
case that the edits go through anyway, in which case there's currently no
way to tell if anything is working at all.

The critical part will be testing if elif works and propagates the events
correctly, because that will depend on the index. Then, I can see about
trying to reduce duplication, but I shouldn't care about that until I need to.
-->

<script lang="ts">
import { defineComponent, PropType } from "vue"
import FieldGroup from "./FieldGroup.vue"
import FieldText from "./FieldText.vue"
import EditSingleMessage from "./EditSingleMessage.vue"
import EditConditional from "./EditConditional.vue"
import EditMessageSettings from "./EditMessageSettings.vue"
import { isConditional, MessageGroup } from "../types"

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
    makeComponent(index: number) {
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
        return {
          is: EditConditional,
          attrs: {
            conditional: message,
          },
        }
      }
      return {
        is: EditSingleMessage,
      }
    },
  },
})
</script>

<style lang="scss"></style>
