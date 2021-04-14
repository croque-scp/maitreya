<template>
<App name="run">
  <DatabaseBackButton></DatabaseBackButton>
  <div class="section menu-section" ng-class="aic.selectedOperation === 'menu' ? 'selected' : null" ng-attr-dest-section="{{aic.selectedOperation}}">
    <div class="menu-title">Isolated Site-12<br>Operations Control</div>
    <div class="operations">
      <ul>
        <li class="selector" ng-click="aic.switchOperation('d')"><a>D-Class Requisition</a></li>
        <li class="selector" ng-click="aic.switchOperation('drone')"><a>Drone Control</a></li>
        <li class="selector" ng-click="aic.switchOperation('map')"><a>Site Map & Individual Room Functions</a></li>
        <li class="selector" ng-click="aic.switchOperation('hack')"><a>Main Server Access</a></li>
      </ul>
    </div>
  </div>
</App>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import DatabaseBackButton from "./database/DatabaseBackButton.vue"

export default defineComponent({
  name: "RunApp",
  components: { DatabaseBackButton }
})
</script>

<style lang="scss">

</style>
