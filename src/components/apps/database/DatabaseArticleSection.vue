<template>
  <div class="section article-section"
       ng-class="aic.selectedArticle !== 'menu' ? 'selected' : null"
       ng-attr-dest-section="{{aic.selectedArticle}}">
    <DatabaseArticle></DatabaseArticle>
    <!--TODO: replace unsafe with regular, because there are no local images in the final version-->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import DatabaseArticle from "./DatabaseArticle.vue"

export default defineComponent({
  name: "DatabaseArticleSection",
  components: { DatabaseArticle }
})
</script>

<style lang="scss">
.article-section {
  color: #222;
  background: linear-gradient(to bottom, #ddd, #ccc);
}
</style>
