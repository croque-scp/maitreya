<template>
  <div class="section menu-section"
       ng-class="aic.selectedArticle === 'menu' ? 'selected' : null"
       ng-attr-dest-section="{{aic.selectedArticle}}">
    <div class="menu-container">
      <p class="heading">Database Search</p>

      <p class="heading">SCPs</p>
      <DatabaseSelectorList category="scp"></DatabaseSelectorList>

      <p class="heading">Personnel</p>
      <DatabaseSelectorList category="person"></DatabaseSelectorList>

      <p class="heading">Utilities</p>
      <DatabaseSelectorList category="utility"></DatabaseSelectorList>

      <p class="heading">Other</p>
      <DatabaseSelectorList category="TODO"></DatabaseSelectorList>

      <p>No articles found. <a
          ng-href="http://www.scp-wiki.net/search:site/q/{{aic.searchInput | encode}}"
          target="_blank">Search wider database?</a></p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import DatabaseSelectorList from "./DatabaseSelectorList.vue"

export default defineComponent({
  name: "DatabaseSelectorSection",
  components: {
    DatabaseSelectorList
  }
})
</script>

<style lang="scss">
.menu-container {
  overflow-x: visible;
  width: 85%;
  margin: 0 auto;
  color: #222;

  .heading {
    font-family: Nunito, Arial, Helvetica, sans-serif;
    border-bottom: 0.0625rem solid #555;
    font-size: 1.8em;
    padding: 0.05em 0;
    margin: 0.7em 0.3em 0.3em 0.3em;
  }
}
</style>
