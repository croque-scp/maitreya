<template>
  <div id="messages-selector">
    <ul>
      <li ng-repeat="speaker in aic.speakerList" ng-id="speaker + '-msg'" class="selector" ng-click="aic.switchSpeaker(speaker)" ng-class="[aic.selectedSpeaker == speaker ? 'selected' : null, aic.ready[speaker] ? null : 'disabled']">
        <div class="selector-wrapper">
          <img ng-src="{{speaker === 'alexandra' ? aic.lang.images.alexandraLogo[aic.vars.alexandraLastEmotion] : aic.lang.images.icon[speaker]}}" class="pfp">
          <div class="title">
            <a>{{::aic.lang.title[speaker]}}</a>
          </div>
          <div class="last-message">
            <p ng-bind-html="(aic.chatLog[speaker].log[0].speaker === 'maitreya' ? '<b>You: </b>' : '') + aic.chatLog[speaker].log[0].text"></p>
          </div>
          <div class="notification" ng-show="aic.notifications[speaker] > 0"><p>{{aic.notifications[speaker]}}</p></div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "MessagesSelector"
})
</script>

<style lang="scss">

</style>
