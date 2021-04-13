<template>
  <App name="messages">
    <MessagesSelector></MessagesSelector>
    <div class="conversation-box">
      <MessagesConversation ng-repeat="speaker in aic.speakerList"
                            ng-show="speaker === aic.selectedSpeaker"
                            ng-class="speaker + '-conversation'">
      </MessagesConversation>
    </div>
    <AppSectionDivider></AppSectionDivider>
    <MessagesOptions></MessagesOptions>
  </App>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import MessagesSelector from "./MessagesSelector.vue"
import MessagesConversation from "./MessagesConversation.vue"
import AppSectionDivider from "../AppSectionDivider.vue"
import MessagesOptions from "./MessagesOptions.vue"

export default defineComponent({
  name: "MessagesApp",
  components: {
    MessagesOptions,
    AppSectionDivider,
    MessagesConversation,
    MessagesSelector
  }
})
</script>

<style lang="scss">
.conversation-box {
  /* height: calc(100vh - 22.1875rem); */
  position: relative;
  background: linear-gradient(to top, #eee, #fff);
  overflow: auto;
  z-index: 5;
  grid-area: conversation;

  @media (min-aspect-ratio: 4/3) {
    box-shadow: 0 -0.125rem 0.125rem 0 rgba(0, 0, 0, 0.14),
    0 -0.1875rem 0.0625rem -0.125rem rgba(0, 0, 0, 0.12),
    0 -0.0625rem 0.3125rem 0 rgba(0, 0, 0, 0.2);
  }
}

.app-body {
  grid-template-columns: 1fr;
  grid-template-rows: 3.4375rem 1fr 1.875rem 9.0625rem 1.5625rem;
  grid-template-areas:
  "selectors"
  "conversation"
  "divider"
  "options"
  "bottom";

  @media (min-aspect-ratio: 4/3) {
    grid-template-columns: 17% 1fr 23%;
    grid-template-rows: 1fr 1.5625rem;
    grid-template-areas:
    "selectors conversation options"
    "bottom bottom bottom";
  }
}
</style>
