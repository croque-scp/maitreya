<template>
  <div
    class="article-content"
    ng-class="aic.selectedArticleData.content.length > 0 ? 'active' : 'inactive'"
  >
    <p
      ng-repeat="line in aic.selectedArticleData.content track by $index"
      ng-bind-html="trustAsHtml(line)"
    ></p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "DatabaseArticle",
})
</script>

<style lang="scss">
.article-content {
  margin: 4.5em 4.5em 6em 4.5em;
  padding: 1em 1.5em 1.5em 1.5em;
  background: linear-gradient(to bottom, white, #f4f4f4);
  box-shadow: 0 0.625rem 1.25rem rgba(0, 0, 0, 0.19),
    0 0.375rem 0.375rem rgba(0, 0, 0, 0.23);

  &.inactive {
    padding: 0;
  }
}

.scp-image-block {
  &.block-right {
    margin-right: -3em;
    margin-left: 1em;
  }

  img {
    display: block;
  }
}

.fake-title {
  border-bottom: 0.0625rem solid #bbb;
  color: #901;
  padding: 0 0 0.25em;
  margin: 0 0 0.6em;
  font-size: 200%;
  line-height: 141%;
}

.article-link {
  background: linear-gradient(to bottom, white, white 50%, #cee7f7 50%);
}
</style>
