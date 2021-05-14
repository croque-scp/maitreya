<template>
  <p>
    <label>
      {{ label }}
      <input
        :value="value"
        type="text"
        @input="$emit('update:value', $event.target.value)"
      />
    </label>
  </p>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "FieldText",
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
  },
  emits: ["update:value"],
})
</script>

<style lang="scss"></style>
