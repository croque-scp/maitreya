<template>
  <li id="ending-app" class="selector" ng-click="aic.switchApp('ending')"
      ng-class="[aic.selectedApp == 'ending' ? 'selected' : null, aic.ready.ending ? null : 'disabled']"
      ng-disabled="">
    <a><i class="material-icons">clear</i></a>
    <div class="notification" ng-show="aic.notifications.ending > 0"><p>
      {{ aic.notifications.ending }}</p></div>
  </li>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "AppSelectorButton"
})
</script>

<style lang="scss">

</style>
