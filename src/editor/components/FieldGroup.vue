<template>
  <fieldset>
    <legend>{{ name }}</legend>
    <slot></slot>
  </fieldset>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "FieldGroup",
  props: {
    name: {
      type: String,
      required: true,
    },
  },
})
</script>

<style scoped lang="scss">
fieldset {
  margin: 1em 0;
}
</style>
