<template>
  <App name="ending">
    <div class="ending-container">
      <div class="ending-title">
        <p class="ending-title glitch" data-text="CONNECTION&nbsp;LOST">
          CONNECTION&nbsp;LOST</p>
      </div>
      <p class="ending-desc"
         ng-repeat="line in aic.lang.endings[aic.currentEnding]">{{ line }}</p>
      <button class="option action" id="restart">RESTART</button>
      <p class="ending-number">{{ aic.vars.endingFractionText }}</p>
    </div>
  </App>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "EndingApp"
})
</script>

<style lang="scss">

</style>
