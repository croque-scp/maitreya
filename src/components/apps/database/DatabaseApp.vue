<template>
  <App name="database">
    <DatabaseBackButton></DatabaseBackButton>
    <DatabaseSelectorSection></DatabaseSelectorSection>
    <DatabaseArticleSection></DatabaseArticleSection>
  </App>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import DatabaseBackButton from "./DatabaseBackButton.vue"
import DatabaseSelectorSection from "./DatabaseSelectorSection.vue"
import DatabaseArticleSection from "./DatabaseArticleSection.vue"

export default defineComponent({
  name: "DatabaseApp",
  components: {
    DatabaseArticleSection,
    DatabaseSelectorSection,
    DatabaseBackButton
  }
})
</script>

<style lang="scss">
.section {
  transition: transform 0.4s ease-in-out,
  transform 0.4s var(--ease-in-out),
  height 0s ease-in-out 0s,
  overflow 0s ease-in-out 0s,
  opacity 0s ease-in-out 0s,
  visibility 0s ease-in-out 0s;
  transform: translate(0, 0);
  position: absolute;
  height: 100%;
  width: 100%;
  overflow-y: scroll;

  &:not(.selected) {
    transition: transform 0.4s ease-in-out,
    transform 0.4s var(--ease-in-out),
    height 0s ease-in-out 0.4s,
    overflow 0s ease-in-out 0.4s,
    opacity 0s ease-in-out 0.4s,
    visibility 0s ease-in-out 0.4s;;
    height: 0;
    opacity: 0;
    /*overflow: hidden;
  visibility: hidden;*/
  }

  // Transitions between sections (note that the selector is a section)
  &:not(.menu-section):not(.selected) {
    transform: translate(100%, 0);
  }

  &:not(.menu-section).selected {
    transform: translate(0, 0);
  }

  &:not([dest-section=menu]):not(.selected) {
    transform: translate(-100%, 0);
  }

  &[dest-section=menu] {
    transform: translate(0, 0);
  }

  &[dest-section=menu]:not(.selected) {
    transform: translate(100%, 0);
  }

  &.menu-section:not(.selected) {
    transform: translate(-100%, 0);
  }

  &.menu-section.selected {
    transform: translate(0, 0);
  }
}
</style>
