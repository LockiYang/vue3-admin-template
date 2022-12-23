import { createApp, type Directive } from "vue";

// 整合Element-Plus
import ElementPlus from "element-plus";
import "element-plus/theme-chalk/index.css";

import App from "@/App.vue";
import router from "@/router";
import { setupStore } from "@/stores";

import Pagination from "@/components/Pagination/index.vue";
import "@/permission";

// 国际化
import i18n from "@/lang/index";

// 引入svg注册脚本
import "virtual:svg-icons-register";

// 自定义样式
import "@/styles/index.scss";

const app = createApp(App);

// 自定义指令
import * as directive from "@/directive";
Object.keys(directive).forEach(key => {
  app.directive(key, (directive as { [key: string]: Directive })[key]);
});

// 全局方法
import { getDictionaries } from "@/api/dict";
app.config.globalProperties.$getDictionaries = getDictionaries;

// 全局挂载
setupStore(app);
app.component("Pagination", Pagination);
app.use(ElementPlus);
// app.use(createPinia());
app.use(router);
app.use(i18n);
app.mount("#app");
