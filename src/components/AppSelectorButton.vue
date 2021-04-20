<template>
  <li
    id="ending-app"
    :class="aic.selectedApp === appName ? 'selected' : null"
    @click="aic.switchApp('ending')"
  >
    <button :disabled="!aic.ready.ending">
      <i class="material-icons">clear</i>
    </button>
    <div class="notification" v-if="TODO > 0">
      <p>
        {{ aic.notifications.ending }}
      </p>
    </div>
  </li>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "AppSelectorButton",
  props: {
    appName: String,
  },
})
</script>

<style lang="scss">
li {
  position: relative;
  list-style: none;
  height: 100%;
  width: 3.75rem;
  margin: 0 0.3125rem;

  button {
    height: 2.5rem;
    width: 2.5rem;
    border-radius: 50%;
    background-color: white;
    display: inline-block;
    position: absolute;
    color: var(--middle-theme);
    border: 0.0625rem white solid;
    transition: box-shadow 0.2s var(--ease-in-out) 0s,
      border-radius 0.2s var(--ease-in-out) 0s,
      height 0.2s var(--ease-in-out) 0s, width 0.1s var(--ease-in-out) 0s,
      border-width 0s;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0.125rem 0.125rem 0 rgba(0, 0, 0, 0.14),
      0 0.1875rem 0.0625rem -0.125rem rgba(0, 0, 0, 0.12),
      0 0.0625rem 0.3125rem 0 rgba(0, 0, 0, 0.2);

    &::before,
    &::after {
      box-shadow: none;
      content: " ";
      height: 100%;
      width: 0.625rem;
      position: absolute;
    }

    &::before {
      top: 0;
      left: -0.625rem;
    }

    &::after {
      right: -0.625rem;
    }

    i {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-right: -50%;
      transform: translate(-50%, -50%);
    }
  }

  &.selected {
    transition: background-color 0.2s var(--ease-in-out);

    button {
      box-shadow: none;
      border-radius: 0;
      height: 100%;
      width: 100%;
      border-width: 0;
      transition: box-shadow 0.1s var(--ease-in-out) 0s,
        border-radius 0.1s var(--ease-in-out) 0s,
        height 0.1s var(--ease-in-out) 0s, width 0.2s ease-in 0.2s,
        border-width 0s;
      animation: none;
    }

    button::before {
      box-shadow: inset -0.1875rem 0 0.125rem -0.125rem rgba(0, 0, 0, 0.28),
        inset -0.25rem 0 0.0625rem -0.125rem rgba(0, 0, 0, 0.14),
        inset -0.125rem 0 0.3125rem -0.3125rem rgba(0, 0, 0, 0.2);
    }

    &:not(:last-of-type) button::after {
      box-shadow: inset 0.1875rem 0 0.125rem -0.125rem rgba(0, 0, 0, 0.28),
        inset 0.25rem 0 0.0625rem -0.125rem rgba(0, 0, 0, 0.14),
        inset 0.125rem 0 0.3125rem -0.3125rem rgba(0, 0, 0, 0.2);
    }
  }

  &:not(.selected):hover button {
    animation: bounce-with-x-translate 1s linear 1 both;
  }

  button[disabled] {
    border: 0.0625rem var(--middle-theme) solid;
    background-color: transparent;
    color: transparent;
    box-shadow: none;
    animation: none;
  }

  .notification {
    position: absolute;
    top: 50%;
    left: 75%;
    margin-right: -50%;
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
</style>
