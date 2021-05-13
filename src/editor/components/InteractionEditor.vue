<template>
  <FormFieldset :name="`Interaction: ${interactionId}`">
    <!-- TODO -->
    {{ interactionId }}
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
  components: { FormFieldset },
  props: {
    interactionId: Array as PropType<Identifier>,
    interaction: Object as PropType<Interaction>,
  },
})
</script>

<style lang="scss"></style>
