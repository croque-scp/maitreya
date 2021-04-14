<template>
  <div class="section-divider">
    <div class="top"></div>
    <div class="middle"></div>
    <div class="bottom"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "AppSectionDivider"
})
</script>

<style lang="scss">
.section-divider {
  grid-area: divider;
}

#messages-app .section-divider {
  background: linear-gradient(to right, var(--light-theme), var(--dark-theme));
  width: 100%;
  height: 1.875rem;
}

#messages-app .section-divider .top {
  width: 100%;
  height: 0.3125rem;
}

#messages-app .section-divider .middle {
  background: white;
  width: 100%;
  height: 0.9375rem;
  transform: skew(-45deg, 0) translate(3.125rem, 0);
}

#messages-app .section-divider .bottom {
  background: white;
  width: 100%;
  height: 0.625rem;
}
</style>
