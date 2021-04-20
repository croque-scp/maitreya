<template>
  <div class="title">
    <div
      class="title-image"
      ng-style="{'background-image': 'url(' + aic.lang.images.preloadTitle + ')'}"
    ></div>
    <div class="title-info">
      <p>{{ ::aic.lang.version }}</p>
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
  name: "MainTitle",
})
</script>

<style lang="scss">
.title {
  display: block;
  height: var(--app-selector-height);
  margin: 0 5%;
  position: relative;
  transition: all 2s cubic-bezier(0.19, 1, 0.22, 1) 0s;
  top: 0;
  transform: translate(0, 0);

  .title-image {
    height: 100%;
    transition: all 1s cubic-bezier(0.19, 1, 0.22, 1) 1.2s;
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    transform: translate(0, 0);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center left;
  }
}
</style>
