<template>
  <div
    id="interface"
    ng-class="[aic.preload ? 'preload' : null, aic.ready.ending ? 'ended' : null]"
    ng-cloak
  >
    <header>
      <MainTitle></MainTitle>
      <AppSelector></AppSelector>
    </header>
    <TerminalApp></TerminalApp>
    <DatabaseApp></DatabaseApp>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

import AppSelector from "./AppSelector.vue"
import TerminalApp from "./apps/TerminalApp.vue"
import DatabaseApp from "./apps/database/DatabaseApp.vue"

export default defineComponent({
  name: "Interface",
  components: {
    DatabaseApp,
    TerminalApp,
    AppSelector,
  },
})
</script>

<style lang="scss">
#interface {
  --light-theme: hsl(202, 82%, 44%);
  --lightish-theme: hsl(209, 77%, 44%);
  --middle-theme: hsl(217, 71%, 44%);
  --dark-theme: hsl(237, 61%, 43%);

  --plain-base: hsl(0, 0%, 100%);
  --light-contrast: hsl(0, 0%, 93%);
  --neutral-contrast: hsl(0, 0%, 87%);
  --heavy-contrast: hsl(0, 0%, 80%);

  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --monospace-font: "Fira Code", "Cousine", "Roboto Mono", monospace;
  --app-title-height: 1.875rem;
  --selector-shadow: 0 0.125rem 0.125rem 0 rgba(0, 0, 0, 0.14),
    0 0.1875rem 0.0625rem -0.125rem rgba(0, 0, 0, 0.12),
    0 0.0625rem 0.3125rem 0 rgba(0, 0, 0, 0.2);

  &.ended {
    --light-theme: hsl(0, 100%, 53%);
    --lightish-theme: hsl(0, 90%, 49%);
    --middle-theme: hsl(0, 92%, 45%);
    --dark-theme: hsl(0, 100%, 37%);
  }

  &.corrupted {
    --light-theme: hsl(0, 0%, 33%);
    --lightish-theme: hsl(0, 0%, 27%);
    --middle-theme: hsl(0, 0%, 20%);
    --dark-theme: hsl(0, 0%, 7%);
  }
}
/* The preload class is applied to the interface before the game starts, to
 * prompt the title into filling the screen and covering everything else.
 */
.preload header {
  height: 100%;
}
.preload header .title {
  top: 45%;
  transform: translate(0, -50%);
  height: 8.75rem;
}
header .title .title-info {
  display: none;
}
.preload header .title .title-info {
  display: block;
  position: absolute;
  top: 85%;
  width: 100%;
}
.preload header .title .title-info p {
  text-align: center;
}
.preload header .title .title-info button {
  margin: 0 auto;
}
.preload header .title .title-image {
  left: 50%;
  transform: translate(-50%, 0);
  background-position: center;
}
.preload header ul {
  opacity: 0;
  top: -999rem;
}
.preload .app-title p {
  opacity: 0;
}
.preload *:not(button) {
  transition: all 0s !important;
}

header {
  --app-selector-height: 4.375rem;
  height: var(--app-selector-height);
  background: linear-gradient(to right, var(--light-theme), var(--dark-theme));
  position: relative;
  transition: all 1s cubic-bezier(0.19, 1, 0.22, 1) 0s;
  box-shadow: inset 0 -3px 1px -2px rgba(0, 0, 0, 0.12),
    inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
}
</style>
