<template>
  <div class="title">
    <div class="title-image"
         ng-style="{'background-image': 'url(' + aic.lang.images.preloadTitle + ')'}"></div>
    <div class="title-info">
      <p>{{ ::aic.lang.version }}</p>
      <p ng-hide="true">This text should not be visible (unless you have
        javascript disabled) - if you can see this text, please contact the
        author.</p>
      <p ng-show="aic.onMobile">{{ ::aic.lang.mobileWarning }}</p>
      <button id="boot-up" class="option speech" ng-click="aic.bootUp()">
        {{ ::aic.lang.bootUp }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "MainTitle"
})
</script>

<style lang="scss">

</style>
