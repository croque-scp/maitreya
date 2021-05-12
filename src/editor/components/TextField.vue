<template>
  <label>
    {{ label }}
    <input
      type="text"
      :value="value"
      @input="$emit('update:value', $event.target.value)"
    />
  </label>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "TextField",
  props: {
    label: String,
    value: {
      type: String,
      required: true,
    },
  },
})
</script>

<style lang="scss"></style>
