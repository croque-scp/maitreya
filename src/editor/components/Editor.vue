<template>
  <main>
    <header>
      <h1>Event Editor</h1>
    </header>
    <p>Pick the event to edit:</p>
    <EventSelector :event-id="[]"></EventSelector>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import EventSelector from "./EventSelector.vue"

export default defineComponent({
  name: "Editor",
  components: { EventSelector },
})
</script>

<style lang="scss"></style>
