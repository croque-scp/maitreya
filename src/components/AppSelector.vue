<template>
  <ul class="apps">
    <AppSelectorButton></AppSelectorButton>
    <!--    Replace all of these with that component too-->
    <li
      id="terminal-app"
      class="selector"
      ng-click="aic.switchApp('terminal')"
      ng-class="[aic.selectedApp == 'terminal' ? 'selected' : null, aic.ready.terminal ? null : 'disabled', aic.vars.terminalEmphasis ? 'emphasis' : null]"
      ng-disabled=""
    >
      <a><i class="material-icons">dvr</i></a>
      <div class="notification" ng-show="aic.notifications.terminal > 0">
        <p>
          {{ aic.notifications.terminal }}
        </p>
      </div>
    </li>
    <li
      id="messages-app"
      class="selector"
      ng-click="aic.switchApp('messages')"
      ng-class="[aic.selectedApp == 'messages' ? 'selected' : null, aic.ready.messages ? null : 'disabled', aic.vars.messagesEmphasis ? 'emphasis' : null]"
      ng-disabled=""
    >
      <a><i class="material-icons">record_voice_over</i></a>
      <div
        class="notification"
        ng-show="(aic.notifications.breach + aic.notifications.alexandra) > 0"
      >
        <p>{{ aic.notifications.breach + aic.notifications.alexandra }}</p>
      </div>
    </li>
    <li
      id="database-app"
      class="selector"
      ng-click="aic.switchApp('database')"
      ng-class="[aic.selectedApp == 'database' ? 'selected' : null, aic.ready.database ? null : 'disabled', aic.vars.databaseEmphasis ? 'emphasis' : null]"
      ng-disabled=""
    >
      <a><i class="material-icons">library_books</i></a>
      <div class="notification" ng-show="aic.notifications.database > 0">
        <p>
          {{ aic.notifications.database }}
        </p>
      </div>
    </li>
    <li
      id="run-app"
      class="selector"
      ng-click="aic.switchApp('run')"
      ng-class="[aic.selectedApp == 'run' ? 'selected' : null, aic.ready.run ? null : 'disabled']"
      ng-disabled=""
    >
      <a><i class="material-icons">directions_run</i></a>
      <div class="notification" ng-show="aic.notifications.run > 0">
        <p>
          {{ aic.notifications.run }}
        </p>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import AppSelectorButton from "./AppSelectorButton.vue"

export default defineComponent({
  name: "AppSelector",
  components: { AppSelectorButton },
})
</script>
