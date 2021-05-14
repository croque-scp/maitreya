<template>
  <label>
    {{ label }}
    <select>
      <option
        v-for="speaker in speakers"
        :key="speaker"
        value="speaker"
        :selected="value === speaker"
        @change="$emit('update:value', $event.target.value)"
      >
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
  data() {
    return {
      speakers,
    }
  },
})
</script>

<style lang="scss"></style>
