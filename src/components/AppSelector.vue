<template>
  <ul class="apps">
    <AppSelectorButton app-name="ending"></AppSelectorButton>
    <AppSelectorButton app-name="terminal"></AppSelectorButton>
    <AppSelectorButton app-name="messages"></AppSelectorButton>
    <AppSelectorButton app-name="database"></AppSelectorButton>
    <AppSelectorButton app-name="run"></AppSelectorButton>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import AppSelectorButton from "./AppSelectorButton.vue"

export default defineComponent({
  name: "AppSelector",
  components: { AppSelectorButton },
})
</script>

<style lang="scss">
ul {
  position: absolute;
  height: 100%;
  margin: 0 -0.3125rem 0 0;
  top: -50%;
  transform: translate(0, 50%);
  right: 0;
  padding: 0;
  transition: opacity 0.3s var(--ease-in-out) 1.2s;
  display: flex;
  align-items: center;
  justify-content: space-between;
  list-style: none;
  width: auto;
  opacity: 1;
}
</style>
