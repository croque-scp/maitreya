<template>$END$</template>

<script lang="ts">
import { SingleMessage } from "editor/types"
import { defineComponent } from "vue"
import { DynamicComponent } from "./dynamicComponents"

export type DynamicSingleMessage = DynamicComponent<
  EditSingleMessageAttributes,
  SingleMessage
>

type EditSingleMessageAttributes = Record<string, never>

export default defineComponent({
  name: "EditSingleMessage",
})
</script>

<style lang="scss"></style>
