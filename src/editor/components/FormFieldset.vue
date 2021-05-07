<template>
  <fieldset>
    <legend>{{ name }}</legend>
    <slot></slot>
  </fieldset>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "FormFieldset",
  props: {
    name: String,
  },
})
</script>

<style lang="scss"></style>
