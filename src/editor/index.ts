import { createApp } from "vue"

import { key, store } from "./store"
import Editor from "./components/Editor.vue"

createApp(Editor).use(store, key).mount("body")
