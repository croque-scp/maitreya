<template><FormFieldset :name="`Event: ${eventId}`"></FormFieldset></template>

<script lang="ts">
import { defineComponent, PropType } from "vue"
import FormFieldset from "./FormFieldset.vue"
import { useStore } from "../store"
import { Identifier } from "../types"

export default defineComponent({
  name: "EventEditor",
  components: { FormFieldset },
  props: {
    eventId: Array as PropType<Identifier>,
  },
  setup() {
    const store = useStore()
    const events
  },
})
</script>

<style lang="scss"></style>
