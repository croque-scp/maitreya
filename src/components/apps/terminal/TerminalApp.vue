<template>
  <App name="terminal">
    <div class="terminal-body"
         ng-style="{'background-image': 'url(' + aic.lang.images.greyStripe + ')'}">
      <div ng-show="aic.isSpeaking.terminal" class="working">
        <img ng-src="{{::aic.lang.images.loadingGif}}">
      </div>
      <TerminalLog></TerminalLog>
    </div>
  </App>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import App from "../App.vue"
import TerminalLog from "./TerminalLog.vue"

export default defineComponent({
  name: "TerminalApp",
  components: {
    TerminalLog,
    App
  }
})
</script>

<style lang="scss">
.terminal-body {
  height: calc(100vh - 15.625rem);
  /*background-image: url(grey_stripe.png);*/
  position: relative;
}

.working {
  position: absolute;
  width: 0.9375rem;
  height: 0.9375rem;
  left: 6.25rem;
  bottom: 0;
  transform: translate(-1.25rem, -0.3125rem);
}
</style>
