// core
import { createApp } from "vue"
import App from "@/App.vue"
import store from "@/store"
import router from "@/router"
import "@/router/permission"
// load
import { loadSvg } from "@/icons"
import { loadPlugins } from "@/plugins"
import { loadDirectives } from "@/directives"
// css
import "uno.css"
import "normalize.css"
import "element-plus/dist/index.css"
import "element-plus/theme-chalk/dark/css-vars.css"
import "vxe-table/lib/style.css"
import "vxe-table-plugin-element/dist/style.css"
import "@/styles/index.scss"
const app = createApp(App)

/** 플러그인 로드 */
loadPlugins(app)
/** 전역 SVG 로드 */
loadSvg(app)
/** 사용자 정의 지시문 로드 */
loadDirectives(app)

import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
app.use(store).use(router)
router.isReady().then(() => {
  app.mount("#app")
})
