<template>
  <p>
    <label>
      {{ label }}
      <input v-model="textValue" type="text" />
    </label>
  </p>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { DynamicComponent } from "./dynamicComponents"

export type DynamicFieldText = DynamicComponent<FieldTextAttributes, string>

type FieldTextAttributes = {
  label: string
  value: string
}

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
  emits: ["updateValue"],
  computed: {
    textValue: {
      get(): string {
        return this.value
      },
      set(input: string) {
        this.$emit("updateValue", input)
      },
    },
  },
})
</script>

<style lang="scss"></style>
