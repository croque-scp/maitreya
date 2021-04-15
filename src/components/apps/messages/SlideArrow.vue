<template>
  <div
    class="slide-arrow"
    :class="[direction, active ? 'active' : null]"
    style="background-image: url({{aic.lang.images.highlightArrow[direction]}})"
  ></div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"

export default defineComponent({
  name: "SlideArrow",
  props: {
    direction: String as PropType<"top" | "right" | "bottom" | "left">,
    active: Boolean as PropType<boolean>,
  },
})
</script>

<style lang="scss">
.slide-arrow {
  --arrow-inactive: 15.625rem;
  --arrow-distance: 4.6875rem;

  --arrow-single-active: calc(var(--arrow-inactive) - var(--arrow-distance));
  --arrow-double-active: calc(
    var(--arrow-single-active) - var(--arrow-distance)
  );

  --arrow-active: var(--arrow-single-active);
  --arrow-state: var(--arrow-inactive);
  --arrow-direction: 1;

  background-size: 18.75rem 18.75rem;
  background-position: center;
  position: absolute;
  opacity: 1;
  transition: transform 2s var(--ease-in-out);

  &.left,
  &.top {
    --arrow-direction: -1;
  }

  &.left,
  &.right {
    height: 100%;
    width: 18.75rem;
    transform: translateX(
      calc(1 * var(--arrow-direction) * var(--arrow-state))
    );

    @media (min-width: 999px) {
      --arrow-active: var(--arrow-double-active);
    }

    @media (min-aspect-ratio: 4/3) {
      display: none;
    }
  }

  &.top,
  &.bottom {
    display: none;
    width: 100%;
    height: 18.75rem;
    transform: translateY(
      calc(1 * var(--arrow-direction) * var(--arrow-state))
    );

    @media (min-height: 800px) {
      --arrow-active: var(--arrow-double-active);
    }

    @media (min-aspect-ratio: 4/3) {
      display: block;
    }
  }

  &.left {
    left: 0;
  }

  &.right {
    right: 0;
  }

  &.top {
    top: 0;
  }

  &.bottom {
    bottom: 0;
  }

  &.active {
    transition: transform 2s ease-in-out;
    --arrow-state: var(--arrow-active);
  }
}
</style>
