<template>
  <FieldGroup :name="`Settings for ${purpose}`"></FieldGroup>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import FieldGroup from "./FieldGroup.vue"

export default defineComponent({
  name: "EditMessageSettings",
  components: {
    FieldGroup,
  },
  props: {
    purpose: {
      type: String,
      required: true,
    },
  },
})
</script>

<style lang="scss"></style>
