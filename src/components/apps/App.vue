<template>
  <div class="app-body">
    <div class="container"
         ng-class="aic.selectedApp == '{{name}}' ? 'selected' : null">
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
  props: ['name'],
  components: {
    AppSectionTop,
    AppSectionBottom
  }
})
</script>

<style lang="scss">
#messages-app .app-main {
  height: calc(100% - var(--app-title-height));
}

#database-app .app-main {
  background: linear-gradient(to bottom,#fff,#eee);
  position: relative;
  /*overflow-y: scroll;*/
}
</style>
