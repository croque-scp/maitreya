<template>
  <!-- one set of messages (not options) per character -->
  <div class="speaking-markers">
    <!-- "...is speaking", etc - pseudo-1st message -->
    <div ng-class="aic.isSpeaking[speaker] ? null : 'notSpeaking'"
         class="speaking">
      <p>
        <img ng-src="{{aic.lang.images.typingGif}}">
        {{ aic.lang.breachEntryMode[aic.vars.breachEntryMode] }}
      </p> <!-- XXX -->
    </div>
    <div ng-class="aic.isProcessing[speaker] ? null : 'notProcessing'"
         class="processing">
      <img ng-src="{{aic.lang.images.loadingGif}}">
    </div>
  </div>
  <MessagesMessage
      v-for="line in aic.chatLog[speaker].log">
  </MessagesMessage>
  <p class="title">{{ aic.lang.header[speaker] }}</p>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import MessagesMessage from "./MessagesMessage.vue"

export default defineComponent({
  name: "MessagesConversation",
  components: { MessagesMessage }
})
</script>

<style lang="scss">
.speaking-markers {
  margin: -0.7em 8.125rem 0.3em 8.125rem;
  position: relative;
  opacity: 1;
  height: 1.125rem;
  min-height: 1.125rem;
  transition: opacity 0.1s var(--ease-in-out);

  @media (min-aspect-ratio: 4/3) {
    margin-left: 11rem;
    margin-right: 11rem;
  }
}

.speaking {
  position: absolute;
  opacity: 1;
  transition: opacity 0.1s var(--ease-in-out);

  &.notSpeaking {
    opacity: 0;
  }

  p {
    color: var(--lightish-theme);
    margin: 0 2.5rem;
    font-size: 1em;
    display: inline-block;
    font-family: Nunito, Arial, Helvetica, sans-serif;
  }

  img {
    position: absolute;
    height: 1.875rem;
    width: 1.875rem;
    left: 0.3125rem;
    top: -0.375rem;
  }
}

.processing {
  position: absolute;
  opacity: 1;
  height: 1.25rem;
  width: 1.25rem;
  transition: transform 0.1s var(--ease-in-out);
  background: var(--light-theme);
  border-radius: 1.5625rem;
  top: -0.0625rem;
  right: 0rem;
  transform: translate(0, 0);

  &.notProcessing {
    transform: translate(0, 1.875rem);
  }

  img {
    position: absolute;
    height: 0.75rem;
    width: 0.75rem;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}

.conversation {
  height: 100%;
  margin: 0;
  display: flex;
  flex-direction: column-reverse;
  overflow: auto;

  &::before {
    content: "";
    width: 90%; // To avoid overlapping with the scrollbar
    height: 0.9375rem;
    position: absolute;
    background: linear-gradient(to bottom, white 0.1875rem, transparent);
    top: 0;
    left: 5%;
    z-index: 20;

    @media (min-aspect-ratio: 4/3) {
      display: none;
    }
  }
}

.title {
  background-color: transparent;
  font-size: 1.2em;
  font-family: Nunito, Arial, Helvetica, sans-serif;
  display: block;
  margin: 0 auto;
  padding: 1em;
  color: black;
}

p.ng-enter {
  max-height: 0;
  transition: all 0.5s var(--ease-in-out);
}

p.ng-enter-active {
  max-height: 18.75rem;
}
</style>
