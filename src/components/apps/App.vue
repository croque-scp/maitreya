<template>
  <div class="app-body">
    <div
      class="container"
      ng-class="aic.selectedApp == '{{name}}' ? 'selected' : null"
    >
      <AppSectionTop></AppSectionTop>
      <div class="app-main">
        <slot></slot>
        <AppSectionBottom></AppSectionBottom>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import AppSectionBottom from "./AppSectionBottom.vue"
import AppSectionTop from "./AppSectionTop.vue"

export default defineComponent({
  name: "App",
  props: ["name"],
  components: {
    AppSectionTop,
    AppSectionBottom,
  },
})
</script>

<style lang="scss">
//#messages-app .app-main {
//  height: calc(100% - var(--app-title-height));
//}
//
//#database-app .app-main {
//  background: linear-gradient(to bottom, #fff, #eee);
//  position: relative;
//}

#app-body {
  height: calc(100% - 4.375rem);
  position: relative;
  overflow: hidden;
  background-color: white;

  .container {
    position: absolute;
    height: 100%;
    width: 100%;
    opacity: 1;
    transition: visibility 0s linear 0s, height 0s linear 0s,
      opacity 0.2s var(--ease-in-out);

    &:not(.selected) {
      height: 0;
      overflow: hidden;
      visibility: hidden;
      opacity: 0;
      transition: visibility 0s linear 0.2s, height 0s linear 0.2s,
        opacity 0.2s var(--ease-in-out);
    }
  }
}
</style>
