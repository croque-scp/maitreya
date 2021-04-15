<template>
  <div class="back" ng-class="aic.selectedArticle === 'menu' ? 'hidden' : null">
    <div class="parallelogram" ng-click="aic.switchArticle('menu')">
      <p><i class="material-icons">arrow_back</i> Back to database</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "DatabaseBackButton",
})
</script>

<style lang="scss"></style>
