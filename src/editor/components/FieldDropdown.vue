<template>
  <label>
    {{ label }}
    <select :value="value" @change="$emit('updateValue', $event.target.value)">
      <option v-for="speaker in speakers" :key="speaker">
        {{ speaker }}
      </option>
    </select>
  </label>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { speakers } from "../lib/speakers"

export default defineComponent({
  name: "FieldDropdown",
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  emits: ["updateValue"],
  data() {
    return {
      speakers,
    }
  },
})
</script>

<style lang="scss"></style>
