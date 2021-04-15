<template>
  <div class="option-wrapper">
    <button
      class="option"
      ng-class="option.optionType"
      ng-attr-data-action="{{aic.lang[option.optionType + 'Option']}}"
      ng-click="aic.maitreyaLoop(aic.selectedSpeaker,option,this)"
    >
      {{ option.text }}
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "MessagesOption",
})
</script>

<style lang="scss">
.option {
  -webkit-appearance: none;
  -moz-appearance: none;
  display: block;
  margin: 0.25em 0;
  box-sizing: border-box;
  font-family: Verdana, Arial, Helvetica, sans-serif;
  font-size: inherit;
  position: relative;
  background: rgba(255, 255, 255, 0.7);
  text-align: left;

  &:focus {
    outline: none;
  }

  &.action {
    color: #b01;
    text-decoration: none;
    transition: all 0.2s;
    padding: 0.3125rem 0.75rem 0.3125rem 0.9375rem;
    border: none;
    margin-left: 0.1875rem;
    position: relative;
    z-index: 2;

    &::before {
      background-color: transparent;
      border: 0.0625rem solid #b01;
      transition-duration: 0.2s;
      transform: skewX(-20deg);
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      width: 100%;
      height: calc(100% - 0.125rem);
      content: "";
      padding-bottom: -0.0625rem;
    }

    &:hover {
      color: white;
      transition-duration: 0.2s;
      background: transparent;

      &::before {
        background-color: #b01;
        transition-duration: 0.2s;
      }
    }
  }

  &.speech {
    color: var(--middle-theme);
    border: 0.0625rem solid var(--middle-theme);
    text-decoration: none;
    border-radius: 1.25rem;
    transition: all 0.2s;
    padding: 0.25rem 0.9375rem;

    &:hover {
      color: white;
      background-color: var(--middle-theme);
      transition-duration: 0.2s;
    }
  }

  &::after {
    content: attr(data-action);
    position: absolute;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.5);
    left: 0;
    top: 50%;
    transform: translate(0, -50%);
    transition-duration: 0.2s;
    z-index: 0;
    opacity: 0;
  }

  &:hover::after {
    transform: translate(calc(-100% - 0.3125rem), -50%);
    opacity: 1;
  }
}

.option-wrapper {
  display: inline-block;

  // It seems that this class is only used for animations.
  // TODO Investigate removing and replacing with Vue stuff

  &.ng-enter {
    transition: opacity 0.4s ease-out 0.1s, transform 0.4s ease-out 0.1s;
  }

  &.ng-enter-stagger {
    transition-delay: 0.2s;
    transition-duration: 0s;
  }

  &.ng-enter-active {
  }

  &.ng-enter button {
    transition: inherit;
    opacity: 0;
    transform: translate(-1.875rem, 0);
  }

  &.ng-enter-active button {
    opacity: 1;
    transform: translate(0, 0);
  }

  &.ng-leave {
    transition: opacity 0.4s ease-out 0s, transform 0.4s ease-out 0s;
  }

  &.ng-leave-active {
  }

  &.ng-leave button {
    transition: inherit;
    opacity: 1;
    transform: translate(0, 0);
  }

  &.ng-leave-active button {
    opacity: 0;
    transform: translate(0, 1.875rem);
  }

  &.ng-leave button:active,
  &.ng-leave button:focus {
    transition: transform 0.5s linear 0s, opacity 0.5s linear 0s;
    opacity: 1;
    transform: translate(0, 0);
  }

  &.ng-leave-active button:active,
  &.ng-leave-active button:focus {
    opacity: 0;
    transform: translate(0, -0rem);
  }
}
</style>
