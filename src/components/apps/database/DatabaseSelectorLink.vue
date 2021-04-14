<template>
  <div class="selector"
       ng-if="article.available && article.category === '{{category}}'"
       ng-click="aic.switchArticle(id)"
       ng-attr-data-article="{{id}}"
       ng-class="!!article.hovered ? 'HOVERED' : 'not-hovered'">
    <div class="title-wrapper">
      <div class="icon"><i
          class="material-icons">input</i></div>
      <div class="title">
        <p>{{ ::article.title }}</p>
      </div>
    </div>
    <div class="article-image-wrapper">
      <div class="article-image"
           style="background-image: url({{::article.image || aic.lang.images.defaultImage}});"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "DatabaseSelectorLink",
  props: ["category"]
})
</script>

<style lang="scss">
.selector {
  font-family: Nunito, Arial, Helvetica, sans-serif;
  padding: 0;
  margin: 0.4em;
  color: var(--middle-theme);
  box-shadow: 0 0.125rem 0.125rem 0 rgba(0, 0, 0, 0.28),
  0 0.1875rem 0.0625rem -0.125rem rgba(0, 0, 0, 0.24),
  0 0.0625rem 0.3125rem 0 rgba(0, 0, 0, 0.2);
  height: 8.5rem;
  width: 8.5rem;
  display: flex;
  flex-direction: column-reverse;
  transition: all 0.5s ease-out;
  border-radius: 0.3125rem;
  z-index: 0;
  position: relative;

  .title-wrapper {
    height: 1.875rem;
    z-index: 1;
    position: relative;

    .title {
      height: 1.875rem;
      background-color: white;
      color: var(--middle-theme);
      position: relative;
      text-align: center;
      border-radius: 0 0 0.3125rem 0.3125rem;
      z-index: 1;

      p {
        margin: 0;
        line-height: 1.875rem;
        transform: translate(0, 0);
        transition: all 0.25s var(--ease-in-out);
      }
    }

    .icon {
      position: absolute;
      transform: translate(0, 100%);
      transition: all 0.25s var(--ease-in-out);
      height: 1.875rem;
      width: 1.875rem;
      border-radius: 1.875rem;
      color: lightgrey;
      text-align: center;
      background-color: white;
      bottom: 100%;
      right: 0.3125rem;
      transform-origin: 50% 100%;

      i {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%);
      }
    }

    &::before {
      content: "";
      position: absolute;
      transform: scaleY(0);
      transition: all 0.25s var(--ease-in-out);
      height: 0;
      width: 0;
      border-bottom: 1.875rem solid white;
      border-left: 8.5rem solid transparent;
      bottom: 100%;
      transform-origin: 50% 100%;
    }
  }

  &.HOVERED .title-wrapper {
    .icon {
      transform: translate(0, 20%);
      opacity: 1;
      animation: icon-activate 675ms linear 0s 1 none;
      transition: all 0.15s ease-out;
    }

    &::before {
      transform: scaleY(0.5);
      animation: icon-background-emphasis 675ms linear 0s 1 none;
    }

    .title p {
      transform: translate(0, -0.1875rem);
      animation: title-activate 675ms linear 0s 1 none;
    }
  }

  .article-image-wrapper {
    flex: 1;
    border-radius: 0.3125rem 0.3125rem 0 0;
    overflow: hidden;
  }

  .article-image {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: 50% 25%;
    transform: scale(1);
    position: relative;
    z-index: 0;
    transition: all 0.4s var(--ease-in-out);
  }

  &:hover .article-image {
    transform: scale(1.02);
  }
}

@keyframes title-activate {
  0% {
    transform: translate(0, 0rem);
  }
  6.89% {
    transform: translate(0, -0.0625rem);
  }
  13.8% {
    transform: translate(0, -0.125rem);
  }
  20.69% {
    transform: translate(0, -0.1875rem);
  }
  27.58% {
    transform: translate(0, -0.1875rem);
  }
  44.71% {
    transform: translate(0, -0.1875rem);
  }
  61.62% {
    transform: translate(0, -0.125rem);
  }
  95.87% {
    transform: translate(0, -0.1875rem);
  }
  100% {
    transform: translate(0, -0.1875rem);
  }
}

@keyframes icon-background-emphasis {
  0% {
    transform: scaleY(0);
  }
  9.33% {
    transform: scaleY(0.275);
  }
  18.47% {
    transform: scaleY(0.442);
  }
  27.8% {
    transform: scaleY(0.516);
  }
  36.93% {
    transform: scaleY(0.532);
  }
  61.62% {
    transform: scaleY(0.506);
  }
  86.31% {
    transform: scaleY(0.499);
  }
  100% {
    transform: scaleY(0.5);
  }
}

@keyframes icon-activate {
  0% {
    transform: translate(0, 100%);
  }
  6.89% {
    transform: translate(0, 61.135%);
  }
  13.8% {
    transform: translate(0, 29.733%);
  }
  20.69% {
    transform: translate(0, 13.262%);
  }
  27.58% {
    transform: translate(0, 9.109%);
  }
  44.71% {
    transform: translate(0, 17.534%);
  }
  61.62% {
    transform: translate(0, 21.174%);
  }
  95.87% {
    transform: translate(0, 19.873%);
  }
  100% {
    transform: translate(0, 20%);
  }
}
</style>
