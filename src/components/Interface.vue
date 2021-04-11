<template>
  <div>
    <MainTitle></MainTitle>
    <AppSelector></AppSelector>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

import AppSelector from "./AppSelector.vue"

export default defineComponent({
  name: "Interface",
  components: { AppSelector }
})
</script>
