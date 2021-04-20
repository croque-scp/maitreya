<template>
  <div class="app-title">
    <p>{{ ::aic.lang.terminalAppName }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "AppSectionTop",
})
</script>

<style lang="scss">
.app-title {
  color: #000;
  background-color: white;
  position: relative;
  display: flex;
  justify-content: flex-end;
  height: 1.875rem;
  box-shadow: 0 0.125rem 0.125rem 0 rgba(0, 0, 0, 0.14),
    0 0.1875rem 0.0625rem -0.125rem rgba(0, 0, 0, 0.12),
    0 0.0625rem 0.3125rem 0 rgba(0, 0, 0, 0.2);
  z-index: 10;

  p {
    font-family: Nunito, Arial, Helvetica, sans-serif;
    margin: 0.125rem 5% 0;
    font-size: 1.25rem;
    display: inline-block;
    opacity: 1;
    transition: opacity 0.3s var(--ease-in-out) 1.2s;
  }
}
</style>
