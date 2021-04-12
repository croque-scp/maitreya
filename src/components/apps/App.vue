<template>
  <div id="app-body">
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

</style>
