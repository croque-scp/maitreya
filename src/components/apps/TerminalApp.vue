<template>
  <App name="terminal">
    <div class="terminal-body"
         ng-style="{'background-image': 'url(' + aic.lang.images.greyStripe + ')'}">
      <div ng-show="aic.isSpeaking.terminal" class="working">
        <img ng-src="{{::aic.lang.images.loadingGif}}">
      </div>
      <div class="terminal-log">
        <p ng-repeat="line in aic.chatLog.terminal.log"
           ng-class="[line.speaker, line.cssClass]">
          <span ng-bind-html="line.text"></span>
        </p>
        <p class="title"><img ng-src="{{::aic.lang.images.terminalHeader}}">
        </p>
      </div>
    </div>
    <AppSectionDivider></AppSectionDivider>
    <div class="input-section"
         ng-class="aic.terminalInput.length > 0 ? 'loaded' : null"
         ng-style="{'background-image':'url(' + aic.lang.images.aiadFadedIcon + '), linear-gradient(to bottom, #f4f4f4, white)'}">
      <div class="hint-arrow left"
           ng-style="{'background-image': 'url(' + aic.lang.images.highlightArrow + ')'}"></div>
      <div class="hint-arrow right"
           ng-style="{'background-image': 'url(' + aic.lang.images.highlightArrow + ')'}"></div>
      <form ng-submit="aic.processTerminalInput()" class="section-divider">
        <input id="terminal-input" ng-model="aic.terminalInput"
               ng-keydown="aic.previousCommand($event)"
               placeholder="{{::aic.lang.commandInput}}">
        <button id="terminal-send" class="option action" type="submit">
          {{ ::aic.lang.terminalSend }}
        </button>
      </form>
    </div>
  </App>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import App from "./App.vue"
import AppSectionDivider from "./AppSectionDivider.vue"

export default defineComponent({
  name: "TerminalApp",
  components: {
    App,
    AppSectionDivider
  }
})
</script>

<style lang="scss">

</style>
