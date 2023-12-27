import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { loadLang } from '/@/lang/index'
import { registerIcons } from '/@/utils/common'
import ElementPlus from 'element-plus'
import mitt from 'mitt'
import pinia from '/@/stores/index'
import { directives } from '/@/utils/directives'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/display.css'
import '/@/styles/index.scss'
// modules import mark, Please do not remove.

async function start() {
    const app = createApp(App)
    app.use(pinia)

    // 全局语言包加载
    await loadLang(app)

    app.use(router)
    app.use(ElementPlus)

    // 全局注册
    directives(app) // 指令
    registerIcons(app) // icons

    app.mount('#app')

    // modules start mark, Please do not remove.
    // mitt 是一个简单的事件管理器库，用于在应用程序中进行事件的发布和订阅。
    // 通过 app.config.globalProperties 可以将其挂载到全局
    // 发布事件 emit('event-name', eventData)
    // 订阅事件 on('event-name', callback)
    // 取消订阅 off('event-name', callback)
    app.config.globalProperties.eventBus = mitt()
}
start()
