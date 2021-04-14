<template>
  <div class="terminal-log">
    <p ng-repeat="line in aic.chatLog.terminal.log"
       ng-class="[line.speaker, line.cssClass]">
      <span ng-bind-html="line.text"></span>
    </p>
    <p class="title"><img ng-src="{{::aic.lang.images.terminalHeader}}">
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "TerminalLog"
})
</script>

<style lang="scss">
.terminal-log {
  height: 100%;
  margin: 0 6.25rem;
  box-shadow: 0.1875rem 0 0.0625rem -0.125rem rgba(0, 0, 0, 0.12),
  0.0625rem 0 0.3125rem 0 rgba(0, 0, 0, 0.2),
  -0.1875rem 0 0.0625rem -0.125rem rgba(0, 0, 0, 0.12),
  -0.0625rem 0 0.3125rem rgba(0, 0, 0, 0.2);
  overflow: auto;
  display: flex;
  flex-direction: column-reverse;
  background-color: #ddd;
  overflow-x: hidden;

  p {
    margin: 0.0625rem 0;
    padding: 0.1875rem 0.625rem 0.1875rem 1.5625rem;
    font-family: var(--monospace-font);
    color: #333;
    background-color: #eee;
    text-indent: -0.9375rem;

    &.info {
      margin: -0.0625rem 0;
      color: #6b4c25;
      background-color: #fffae8;
      border-top: 0.125rem #f7e5a3 solid;
      border-bottom: 0.125rem #f7e5a3 solid;
    }

    &.info::before {
      content: "Info";
      color: white;
      background-color: #6b4c25;
      font-weight: bold;
      padding: 0.125rem 0.25rem;
      margin-left: -0.4375rem;
      margin-right: 0.25rem;
    }

    &.error, &.warning {
      margin: -0.0625rem 0;
      color: red;
      background-color: #fff0f0;
      border-top: 0.125rem #ffd6d6 solid;
      border-bottom: 0.125rem #ffd6d6 solid;
    }

    &.error::before, &.warning::before, &.input::before {
      content: "ERROR";
      color: white;
      background-color: red;
      font-weight: bold;
      padding: 0.125rem 0.25rem;
      margin-left: -0.4375rem;
      margin-right: 0.125rem;
    }

    &.warning::before {
      content: "WARNING";
    }

    &.input::before {
      content: ">";
      font-family: Nunito, Arial, Helvetica, sans-serif;
      background: linear-gradient(
          to bottom,
          var(--light-theme),
          var(--middle-theme)
      );
    }

    &.title {
      background-color: transparent;

      img {
        height: 3.125rem;
        display: block;
        margin-left: auto;
        margin-right: auto;
      }
    }

    &.ng-enter {
      max-height: 0;
      transition: all 0.5s var(--ease-in-out);
    }

    &.ng-enter-active {
      max-height: 18.75rem;
    }
  }
}
</style>
