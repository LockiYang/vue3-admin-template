import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
// 让状态持久化到浏览器的本地存储中，以确保用户刷新或重新加载页面后仍能保留状态信息。
pinia.use(piniaPluginPersistedstate)

export default pinia
