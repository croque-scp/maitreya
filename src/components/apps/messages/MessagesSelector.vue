<template>
  <ul class="messages-selector">
    <li ng-repeat="speaker in aic.speakerList" ng-id="speaker + '-msg'"
        class="selector" ng-click="aic.switchSpeaker(speaker)"
        ng-class="[aic.selectedSpeaker == speaker ? 'selected' : null, aic.ready[speaker] ? null : 'disabled']">
      <div class="selector-wrapper">
        <img
            ng-src="{{speaker === 'alexandra' ? aic.lang.images.alexandraLogo[aic.vars.alexandraLastEmotion] : aic.lang.images.icon[speaker]}}"
            class="pfp">
        <div class="title">
          <a>{{ ::aic.lang.title[speaker] }}</a>
        </div>
        <div class="last-message">
          <p ng-bind-html="(aic.chatLog[speaker].log[0].speaker === 'maitreya' ? '<b>You: </b>' : '') + aic.chatLog[speaker].log[0].text"></p>
        </div>
        <div class="notification" ng-show="aic.notifications[speaker] > 0"><p>
          {{ aic.notifications[speaker] }}</p></div>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "MessagesSelector"
})
</script>

<style lang="scss">
.messages-selector {
  $message-selector-x-padding: 0.9375rem; /* large enough to hide edges */
  /* height: 3.4375rem; */
  font-family: Nunito, Arial, Helvetica, sans-serif;
  position: relative;
  height: 100%;
  margin: 0;
  padding: 0;
  transition: opacity 0.3s var(--ease-in-out) 1.2s;
  background-color: #ddd;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: flex-start;
  list-style: none;
  opacity: 1;
  z-index: 20 !important; /* TODO this doesn't actually work */
  box-shadow: inset 0 -0.1875rem 0.0625rem -0.125rem rgba(0, 0, 0, 0.12),
  inset 0 -0.0625rem 0.3125rem 0 rgba(0, 0, 0, 0.2);
  grid-area: selectors;

  @media (min-aspect-ratio: 4/3) {
    flex-direction: column;
    justify-content: center;
    background: linear-gradient(to bottom, #eee, #ccc);
    box-shadow: none;
  }

  li.selector {
    position: relative;
    list-style: none;
    margin: 0 0.5rem;
    display: inline-block;

    @media (min-aspect-ratio: 4/3) {
      margin: 0.5rem 0;
    }

    &.disabled {
      display: none;
    }

    .pfp {
      position: absolute;
      height: 100%;
      z-index: 30;
      justify-self: center;
      align-self: center;
      grid-area: pfp;

      @media (min-aspect-ratio: 4/3) {
        display: block;
      }
    }

    .selector-wrapper {
      border-radius: 10rem;
      background-color: white;
      display: inline-block;
      padding: 0.3125rem var(--message-selector-x-padding);
      transition-duration: 0.2s;
      box-shadow: var(--selector-shadow);
      position: relative;
      top: 50%;
      transform: translate(0, -50%);
      grid-template-columns: 1fr;
      grid-template-rows: 1fr;
      grid-template-areas: "title";

      @media (min-aspect-ratio: 4/3) {
        border-radius: 0;
        padding: 0.75rem 1.25rem;
        height: 4rem;
        top: auto;
        transform: none;
        background-color: transparent;
        box-shadow: none;
        grid-template-columns: 30% 0.75rem 1fr;
        grid-template-rows: 55% 45%;
        grid-template-areas:
        "pfp . title"
        "pfp . last-message";
      }

      a {
        transition-duration: 0.2s;
        color: var(--middle-theme);
        text-decoration: none;
        font-size: 1.4em;
      }

      .title {
        align-self: end;
        grid-area: title;
      }

      .last-message {
        align-self: start;
        grid-area: last-message;
        min-width: 0;
        color: rgba(0, 0, 0, 0.5);

        @media (min-aspect-ratio: 4/3) {
          display: block;
        }

        p {
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }

    &.selected {
      transition: background-color 0.2s var(--ease-in-out);

      .selector-wrapper {
        border-radius: 0;
        padding: 1.1rem $message-selector-x-padding;

        @media (min-aspect-ratio: 4/3) {
          padding: 0.75rem 1.25rem;
          width: calc(100% - 2 * 1.25rem);
          background-color: white;
          box-shadow: var(--selector-shadow);
        }

        a {
          height: 100%;
        }
      }

      &:hover a {
        cursor: default;
        color: var(--middle-theme);
      }
    }

    &:not(.selected) {
      :hover .selector-wrapper {
        animation: bounce-without-x-translate 1s linear 1 both;

        @media (min-aspect-ratio: 4/3) {
          animation: bounce-without-any-translate 1s linear 1 both;
        }
      }

      @media (min-aspect-ratio: 4/3) {
        a {
          color: rgba(0, 0, 0, 0.75);
        }
      }
    }

    .notification {
      z-index: 30;
      position: absolute;
      top: 40%;
      left: 97%;
      transform: translate(-50%, 50%);
      background: linear-gradient(to bottom, #e23, #d02);
      min-width: 1.41em;
      height: 1.41em;
      border-radius: 1.41em;
      box-shadow: 0 0.125rem 0.125rem 0 rgba(0, 0, 0, 0.14),
      0 0.1875rem 0.0625rem -0.125rem rgba(0, 0, 0, 0.12),
      0 0.0625rem 0.3125rem 0 rgba(0, 0, 0, 0.2);

      p {
        text-align: center;
        font-family: Nunito, Arial, Helvetica, sans-serif;
        font-size: 0.9em;
        position: absolute;
        top: 50%;
        left: 50%;
        margin: 0 -50% 0 0;
        transform: translate(-50%, -50%);
      }
    }
  }
}
</style>
