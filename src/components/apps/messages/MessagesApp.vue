<template>
  <App name="messages">
    <MessagesSelector></MessagesSelector>
    <MessagesConversation></MessagesConversation>
    <AppSectionDivider></AppSectionDivider>
    <MessagesOptions></MessagesOptions>
  </App>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import MessagesSelector from "./MessagesSelector.vue"
import MessagesConversation from "./MessagesConversation.vue"
import AppSectionDivider from "../AppSectionDivider.vue"
import MessagesOptions from "./MessagesOptions.vue"

export default defineComponent({
  name: "MessagesApp",
  components: {
    MessagesOptions,
    AppSectionDivider,
    MessagesConversation,
    MessagesSelector
  }
})
</script>

<style lang="scss">

</style>
