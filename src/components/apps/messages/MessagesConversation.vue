<template>
  <div class="conversation-box"> <!-- holds the conversation -->
    <div class="conversation" ng-repeat="speaker in aic.speakerList" ng-show="speaker === aic.selectedSpeaker" ng-class="speaker + '-conversation'"> <!-- one set of messages (not options) per character -->
      <div class="speaking-markers"> <!-- "...is speaking", etc - pseudo-1st message -->
        <div ng-class="aic.isSpeaking[speaker] ? null : 'notSpeaking'" class="speaking">
          <p><img
              ng-src="{{aic.lang.images.typingGif}}">{{aic.lang.breachEntryMode[aic.vars.breachEntryMode]}}</p> <!-- XXX -->
        </div>
        <div ng-class="aic.isProcessing[speaker] ? null : 'notProcessing'" class="processing">
          <img ng-src="{{aic.lang.images.loadingGif}}">
        </div>
      </div>
      <div class="wrapper" ng-repeat="line in aic.chatLog[speaker].log" ng-class="[line.speaker, aic.chatLog[speaker].log[$index-1].speaker === line.speaker ? 'collapsed' : null]">
        <img ng-show="speaker === 'alexandra' && aic.chatLog.alexandra.log[$index-1].speaker !== line.speaker" ng-src="{{line.speaker == 'alexandra' ? aic.lang.images.alexandraLogo[line.emote] : (line.speaker == 'maitreya' ? aic.lang.images.maitreyaLogo : null)}}" ng-class="line.speaker" class="logo"> <!-- logo for alexandra -->
        <img ng-show="speaker !== 'alexandra' && aic.chatLog.breach.log[$index-1].speaker !== line.speaker" ng-src="{{line.speaker === 'breach' ? aic.lang.images.breachLogo : (line.speaker === 'maitreya' ? aic.lang.images.maitreyaLogo : null)}}" ng-class="line.speaker" class="logo"> <!-- logo for everyone else -->
        <img ng-show="speaker === 'alexandra' && aic.chatLog.alexandra.log[$index-1].speaker !== line.speaker" ng-src="{{line.speaker === 'alexandra' ? aic.lang.images.alexandraTriangle : null}}" ng-class="line.speaker" class="triangle"> <!-- speech triangle for alexandra -->
        <div ng-class="[line.speaker, line.cssClass]">
          <div class="hex-left" ng-if="line.cssClass === 'typed'">
            <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7">
          </div>
          <p><span ng-bind-html="line.text"></span></p>
          <div class="hex-right" ng-if="line.cssClass === 'typed'">
            <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7">
          </div>
        </div>
      </div>
      <p class="title">{{aic.lang.header[speaker]}}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "MessagesConversation"
})
</script>

<style lang="scss">

</style>
