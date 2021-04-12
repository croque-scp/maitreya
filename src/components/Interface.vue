<template>
  <div id="interface"
       ng-class="[aic.preload ? 'preload' : null, aic.ready.ending ? 'ended' : null]"
       ng-cloak>
    <div id="app-selector">
      <MainTitle></MainTitle>
      <AppSelector></AppSelector>
    </div>
    <TerminalApp></TerminalApp>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

import AppSelector from "./AppSelector.vue"
import TerminalApp from "./apps/TerminalApp.vue"

export default defineComponent({
  name: "Interface",
  components: {
    TerminalApp,
    AppSelector
  }
})
</script>
