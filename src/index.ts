import { createApp } from "vue"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

import Interface from "./components/Interface.vue"

const app = createApp(Interface)
app.component("font-awesome-icon", FontAwesomeIcon)
app.mount("body")
