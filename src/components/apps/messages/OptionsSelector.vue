<template>
  <div
    class="options-box"
    ng-class="[aic.chatLog[aic.selectedSpeaker].options.length > 0 ? 'options-ready' : null, aic.vars.chatEmphasis ? 'emphasis' : null]"
  >
    <div
      class="logo-spinner"
      ng-style="{'background-image': 'url(' + aic.lang.images.aiadFadedLogo + ')'}"
    ></div>
    <SlideArrow
      v-for="direction in ['left', 'right', 'top', 'bottom']"
      :key="direction"
      :direction="direction"
      :active="TODO"
    ></SlideArrow>
    <div
      class="options"
      ng-class="[5,6].includes(aic.chatLog[aic.selectedSpeaker].options.length) ? 'balance' : null"
    >
      <MessagesOption
        ng-repeat="option in aic.chatLog[aic.selectedSpeaker].options"
      ></MessagesOption>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import MessagesOption from "./MessagesOption.vue"
import SlideArrow from "./SlideArrow.vue"

export default defineComponent({
  name: "OptionsSelector",
  components: { SlideArrow, MessagesOption },
})
</script>

<style lang="scss">
@media (min-aspect-ratio: 4/3) {
  .options-box {
    box-shadow: none;
  }

  .options-box .logo-spinner {
    --spinner-size: 40rem;
    right: -17rem;
    top: calc(50% - 20rem);
  }
}
.options-box {
  grid-area: options;
  position: relative;
  background-image: linear-gradient(to bottom, #f4f4f4, white);
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  transition: all 2s var(--ease-in-out);
  box-shadow: inset 0 -0.1875rem 0.0625rem -0.125rem rgba(0, 0, 0, 0.12),
    inset 0 -0.0625rem 0.3125rem 0 rgba(0, 0, 0, 0.2),
    inset 0 0.125rem 0.125rem 0 rgba(0, 0, 0, 0.14),
    inset 0 0.1875rem 0.0625rem -0.125rem rgba(0, 0, 0, 0.12),
    inset 0 0.0625rem 0.3125rem 0 rgba(0, 0, 0, 0.2);
  width: calc(100% + 1.25rem);
  transform: translate(-0.625rem, 0);
  overflow: hidden;

  @media (min-aspect-ratio: 4/3) {
    box-shadow: none;
  }

  .logo-spinner {
    --spinner-size: 18.75rem;
    position: absolute;
    pointer-events: none;
    width: var(--spinner-size);
    height: var(--spinner-size);
    background-size: contain;
    top: calc(-0.25 * var(--spinner-size));
    right: calc(10vw + 0.1 * var(--spinner-size));
    animation: ticktock 60s steps(60, end) 0s infinite;
    animation-play-state: paused;

    @media only screen and (max-width: 699px) {
      // Move the spinner a little off-centre
      right: calc(50vw - 0.5 * var(--spinner-size));
    }

    @media (min-aspect-ratio: 4/3) {
      --spinner-size: 40rem;
      right: -17rem;
      top: calc(50% - 20rem);
    }
  }
  &.options-ready .logo-spinner {
    animation-play-state: running;
  }

  .options {
    height: calc(100% - 0rem);
    max-width: 50%;
    margin: 0 auto;
    padding: 0 0;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    flex-wrap: wrap;
    align-content: space-around;
    transition-duration: 0s;

    &.balance {
      // Change the height so that the right column never has 1 lonely option
      height: calc(100% - 1.25rem);
      padding: 0.625rem 0;
      max-width: 60%;
    }
  }
}

@keyframes ticktock {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
