<template>
  <div
    class="wrapper"
    ng-class="[line.speaker, aic.chatLog[speaker].log[$index-1].speaker === line.speaker ? 'collapsed' : null]"
  >
    <img
      ng-show="speaker === 'alexandra' && aic.chatLog.alexandra.log[$index-1].speaker !== line.speaker"
      ng-src="{{line.speaker == 'alexandra' ? aic.lang.images.alexandraLogo[line.emote] : (line.speaker == 'maitreya' ? aic.lang.images.maitreyaLogo : null)}}"
      ng-class="line.speaker"
      class="logo"
    />
    <!-- logo for alexandra -->
    <img
      ng-show="speaker !== 'alexandra' && aic.chatLog.breach.log[$index-1].speaker !== line.speaker"
      ng-src="{{line.speaker === 'breach' ? aic.lang.images.breachLogo : (line.speaker === 'maitreya' ? aic.lang.images.maitreyaLogo : null)}}"
      ng-class="line.speaker"
      class="logo"
    />
    <!-- logo for everyone else -->
    <img
      ng-show="speaker === 'alexandra' && aic.chatLog.alexandra.log[$index-1].speaker !== line.speaker"
      ng-src="{{line.speaker === 'alexandra' ? aic.lang.images.alexandraTriangle : null}}"
      ng-class="line.speaker"
      class="triangle"
    />
    <!-- speech triangle for alexandra -->
    <div ng-class="[line.speaker, line.cssClass]" class="message">
      <div class="hex-left" ng-if="line.cssClass === 'typed'">
        <img
          src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        />
      </div>
      <p><span ng-bind-html="line.text"></span></p>
      <div class="hex-right" ng-if="line.cssClass === 'typed'">
        <img
          src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "MessagesMessage",
})
</script>

<style lang="scss">
.wrapper {
  margin: 0 8.125rem 0.75rem 8.125rem;
  position: relative;

  @media (min-aspect-ratio: 4/3) {
    // XXX This is duplicated in MessagesConversations
    margin-left: 11rem;
    margin-right: 11rem;
  }

  &.ng-enter {
    transform: translate(0, 6.25rem);
    max-height: 0;
    transition: all 0.5s ease-in-out;
    opacity: 0;
  }

  &.ng-enter-active {
    transform: translate(0, 0);
    max-height: 12.5rem;
    opacity: 1;
  }

  &.collapsed {
    margin-bottom: 0.1875rem;
  }

  &.maitreya {
    margin-left: 8.3125rem;

    &.ng-enter {
      opacity: 1;
    }
  }

  &.narrator {
    margin-left: 12.5rem;
    margin-right: 12.5rem;
  }

  .message {
    color: #222;
    background-color: #ddd;
    border-radius: 0.3125rem;
    clear: both;
    position: relative;

    p {
      display: inline-block;
      margin: 1em;
    }

    &.breach {
      border: 0.1875rem #ddd solid;
      background-color: white;
      float: left;

      p {
        color: #222;
        margin: calc(1em + 0.125rem);
      }
    }

    &.alexandra {
      float: left;
      background-image: linear-gradient(to bottom, #0cc, #009494);
      border-radius: 1.875rem / 4.375rem;
      padding: 0.125rem 1.25rem;
      max-width: 60%;

      p {
        color: white;
      }
    }

    &.maitreya {
      background-image: linear-gradient(
        to bottom,
        var(--light-theme),
        var(--lightish-theme)
      );
      float: right;

      p {
        color: white;
      }
    }

    &.narrator {
      background: #e9e9e9;
      border-radius: 0;
      border: 0.0625rem #999 dashed;
    }

    &.typed {
      margin-left: 1em;
      margin-right: 1em;
      border-left-width: 0;
      border-right-width: 0;
      border-radius: 0;
      position: relative;
      z-index: 0;

      p {
        margin-right: 0.5em;
        margin-left: 0.5em;
        z-index: 1;
        position: relative;
      }

      img {
        height: calc(100% + 0.25rem);
        width: auto;
        display: block;
        position: absolute;
        top: -0.125rem;
        background: inherit;
        border: 0.125rem #ddd solid;
        box-sizing: border-box;
      }

      .hex-left,
      .hex-right {
        background: inherit;
      }

      $hex-border-width: 0.375rem;

      .hex-left img {
        left: 0;
        transform: scale(0.707) scaleX(0.5774) rotate(-45deg);
        border-width: $hex-border-width 0 0 $hex-border-width;
        transform-origin: 0 100%;
      }

      .hex-right img {
        right: 0;
        transform: scale(0.707) scaleX(0.5774) rotate(45deg);
        border-width: $hex-border-width $hex-border-width 0 0;
        transform-origin: 100% 100%;
      }
    }
  }

  img.logo {
    width: 3.75rem;
    position: absolute;
    left: -2.8125rem;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: 1;
  }

  img.logo.ng-hide-add {
    transition: all 0.5s var(--ease-in-out);
  }

  img.logo.ng-hide {
    opacity: 0;
    transform: translate(-50%, -30%);
  }

  img.triangle {
    width: 1.25rem;
    position: absolute;
    left: -0.3125rem;
    top: 65%;
    transform: translate(-50%, -50%);
  }

  img.logo.breach {
    top: calc(50% + 0.3125rem);
  }

  img.logo.alexandra {
    width: 4.375rem;
    top: 60%;
    transform: translate(-55%, -60%);
  }

  img.logo.maitreya {
    width: 3.75rem;
    position: absolute;
    right: -2.8125rem;
    left: initial;
    top: calc(50%);
    transform: translate(50%, -50%);
  }
}
</style>
