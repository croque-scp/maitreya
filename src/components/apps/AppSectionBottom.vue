<template>
  <div class="section-bottom">
    <div class="top"></div>
    <div class="middle"></div>
    <div class="bottom"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "AppSectionBottom",
})
</script>

<style lang="scss">
.section-bottom {
  grid-area: bottom;
}

#messages-app .section-bottom {
  background: linear-gradient(to right, var(--light-theme), var(--dark-theme));
  width: 100%;
  height: 1.5625rem;
  position: relative;
  z-index: 10;

  @media (min-aspect-ratio: 4/3) {
    box-shadow: 0 -0.125rem 0.125rem 0 rgba(0,0,0,0.07),
    0 -0.0625rem 0.3125rem 0 rgba(0,0,0,0.2);
  }

#messages-app .section-bottom .top {
  background: white;
  width: 100%;
  height: 1.25rem;
}

#messages-app .section-bottom .bottom {
  width: 100%;
  height: 0.3125rem;
}
</style>
