<template>
  <div class="articles-list">
    <DatabaseSelectorLink
        :category="category"
        v-for="(id,article) in aic.lang.articles track by article.title">
    </DatabaseSelectorLink>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import DatabaseSelectorLink from "./DatabaseSelectorLink.vue"

export default defineComponent({
  name: "DatabaseSelectorList",
  components: { DatabaseSelectorLink },
  props: ["category"]
})
</script>

<style lang="scss">
.articles-list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}
</style>
