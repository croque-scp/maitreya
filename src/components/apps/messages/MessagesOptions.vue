<template>
  <div class="options-box" ng-class="[aic.chatLog[aic.selectedSpeaker].options.length > 0 ? 'options-ready' : null, aic.vars.chatEmphasis ? 'emphasis' : null]">
    <div class="logo-spinner" ng-style="{'background-image': 'url(' + aic.lang.images.aiadFadedLogo + ')'}"></div>
    <!--<div class="disconnected-alert">DISCONNECTED</div> TODO -->
    <div class="hint-arrow" ng-repeat="direction in ['left','right','top','bottom']" ng-class="[direction, aic.vars.noob ? 'noob-emphasis' : null]" ng-style="{'background-image': 'url(' + aic.lang.images.highlightArrow[direction] + ')'}"></div>
    <div class="options" ng-class="[5,6].includes(aic.chatLog[aic.selectedSpeaker].options.length) ? 'balance' : null">
      <div class="option-wrapper" ng-repeat="option in aic.chatLog[aic.selectedSpeaker].options" ng-animate-children="true">
        <button class="option" ng-class="option.optionType" ng-attr-data-action="{{aic.lang[option.optionType + 'Option']}}" ng-click="aic.maitreyaLoop(aic.selectedSpeaker,option,this)">{{option.text}}</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "MessagesOptions"
})
</script>

<style lang="scss">
.options-box {
  grid-area: options;
}
</style>
