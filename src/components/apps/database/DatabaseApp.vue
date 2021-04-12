<template>
  <App name="database">
    <DatabaseBackButton></DatabaseBackButton>
    <div class="section menu-section"
         ng-class="aic.selectedArticle === 'menu' ? 'selected' : null"
         ng-attr-new-section="{{aic.selectedArticle}}">
      <div class="menu-container">
        <p class="heading">Database Search</p>

        <p class="heading">SCPs</p>
        <div class="articles-list">

          <div class="article-selector"
               ng-repeat="(id,article) in aic.lang.articles track by article.title"
               ng-if="article.available && article.category === 'scp'"
               ng-click="aic.switchArticle(id)" ng-attr-data-article="{{id}}"
               ng-class="!!article.hovered ? 'HOVERED' : 'not-hovered'">
            <div class="article-title">
              <div class="article-title-icon-container"></div>
              <div class="article-title-icon"><i
                  class="material-icons">input</i></div>
              <div class="article-title-title">
                <p>{{ ::article.title }}</p>
              </div>
            </div>
            <div class="article-image-wrapper">
              <div class="article-image"
                   style="background-image: url({{::article.image || aic.lang.images.defaultImage}});"></div>
            </div>
          </div>

        </div>

        <p class="heading">Personnel</p>
        <div class="articles-list">

          <div class="article-selector"
               ng-repeat="(id,article) in aic.lang.articles track by article.title"
               ng-if="article.available && article.category === 'person'"
               ng-click="aic.switchArticle(id)" ng-attr-data-article="{{id}}"
               ng-class="!!article.hovered ? 'HOVERED' : 'not-hovered'">
            <div class="article-title">
              <div class="article-title-icon-container"></div>
              <div class="article-title-icon"><i
                  class="material-icons">input</i></div>
              <div class="article-title-title">
                <p>{{ ::article.title }}</p>
              </div>
            </div>
            <div class="article-image-wrapper">
              <div class="article-image"
                   style="background-image: url({{::article.image || aic.lang.images.defaultImage}});"></div>
            </div>
          </div>

        </div>

        <p class="heading">Utilities</p>
        <div class="articles-list">

          <div class="article-selector"
               ng-repeat="(id,article) in aic.lang.articles track by article.title"
               ng-if="article.available && article.category === 'utility'"
               ng-click="aic.switchArticle(id)" ng-attr-data-article="{{id}}"
               ng-class="!!article.hovered ? 'HOVERED' : 'not-hovered'">
            <div class="article-title">
              <div class="article-title-icon-container"></div>
              <div class="article-title-icon"><i
                  class="material-icons">input</i></div>
              <div class="article-title-title">
                <p>{{ ::article.title }}</p>
              </div>
            </div>
            <div class="article-image-wrapper">
              <div class="article-image"
                   style="background-image: url({{::article.image || aic.lang.images.defaultImage}});"></div>
            </div>
          </div>

        </div>

        <p class="heading">Other</p>
        <div class="articles-list">

          <div class="article-selector"
               ng-repeat="(id,article) in aic.lang.articles track by article.title"
               ng-if="article.available && article.category !== 'scp' && article.category !== 'person' && article.category !== 'utility'"
               ng-click="aic.switchArticle(id)" ng-attr-data-article="{{id}}"
               ng-class="!!article.hovered ? 'HOVERED' : 'not-hovered'">
            <div class="article-title">
              <div class="article-title-icon-container"></div>
              <div class="article-title-icon"><i
                  class="material-icons">input</i></div>
              <div class="article-title-title">
                <p>{{ ::article.title }}</p>
              </div>
            </div>
            <div class="article-image-wrapper">
              <div class="article-image"
                   style="background-image: url({{::article.image || aic.lang.images.defaultImage}});"></div>
            </div>
          </div>

        </div>

        <p>No articles found. <a
            ng-href="http://www.scp-wiki.net/search:site/q/{{aic.searchInput | encode}}"
            target="_blank">Search wider database?</a></p>
      </div>
    </div>
    <div class="section article-section"
         ng-class="aic.selectedArticle !== 'menu' ? 'selected' : null"
         ng-attr-new-section="{{aic.selectedArticle}}">
      <div class="article-content"
           ng-class="aic.selectedArticleData.content.length > 0 ? 'active' : 'inactive'">
        <p ng-repeat="line in aic.selectedArticleData.content track by $index"
           ng-bind-html="trustAsHtml(line)"></p>
      </div>
      <!--TODO: replace unsafe with regular, because there are no local images in the final version-->
    </div>
  </App>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import DatabaseBackButton from "./DatabaseBackButton.vue"

export default defineComponent({
  name: "DatabaseApp",
  components: { DatabaseBackButton }
})
</script>

<style lang="scss">

</style>
