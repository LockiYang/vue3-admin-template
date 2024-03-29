<template>
    <el-main class="layout-main">
        <el-scrollbar class="layout-main-scrollbar" :style="layoutMainScrollbarStyle()" ref="mainScrollbarRef">
            <!-- { Component } 是一个解构赋值，它允许你访问由 <router-view> 提供的 Component，即当前路由匹配的组件。 -->
            <router-view v-slot="{ Component }">
                <transition :name="config.layout.mainAnimation" mode="out-in">
                    <keep-alive :include="state.keepAliveComponentNameList">
                        <component :is="Component" :key="state.componentKey" />
                    </keep-alive>
                </transition>
            </router-view>
        </el-scrollbar>
    </el-main>
</template>

<script setup lang="ts">
import { reactive, onMounted, watch, onBeforeMount, onUnmounted, nextTick } from 'vue'
import { useRoute, RouteLocationNormalized } from 'vue-router'
import { mainHeight as layoutMainScrollbarStyle } from '/@/utils/layout'
import useCurrentInstance from '/@/utils/useCurrentInstance'
import { useConfig } from '/@/stores/config'
import { useNavTabs } from '/@/stores/navTabs'

const { proxy } = useCurrentInstance()

const route = useRoute()
const config = useConfig()
const navTabs = useNavTabs()

const state: {
    componentKey: string
    keepAliveComponentNameList: string[]
} = reactive({
    componentKey: route.path,
    keepAliveComponentNameList: [],
})

const addKeepAliveComponentName = function (keepAliveName: string | undefined) {
    if (keepAliveName) {
        let exist = state.keepAliveComponentNameList.find((name: string) => {
            return name === keepAliveName
        })
        if (exist) return
        state.keepAliveComponentNameList.push(keepAliveName)
    }
}

onBeforeMount(() => {
    proxy.eventBus.on('onTabViewRefresh', (menu: RouteLocationNormalized) => {
        state.keepAliveComponentNameList = state.keepAliveComponentNameList.filter((name: string) => menu.meta.keepalive !== name)
        state.componentKey = ''
        nextTick(() => {
            // 在下一个 DOM 更新周期执行的代码
            state.componentKey = menu.path
            addKeepAliveComponentName(menu.meta.keepalive as string)
        })
    })
    proxy.eventBus.on('onTabViewClose', (menu: RouteLocationNormalized) => {
        state.keepAliveComponentNameList = state.keepAliveComponentNameList.filter((name: string) => menu.meta.keepalive !== name)
    })
})

onUnmounted(() => {
    proxy.eventBus.off('onTabViewRefresh')
    proxy.eventBus.off('onTabViewClose')
})

onMounted(() => {
    // 确保刷新页面时也能正确取得当前路由 keepalive 参数
    if (typeof navTabs.state.activeRoute?.meta.keepalive == 'string') {
        addKeepAliveComponentName(navTabs.state.activeRoute?.meta.keepalive)
    }
})

watch(
    () => route.path,
    () => {
        state.componentKey = route.path
        if (typeof navTabs.state.activeRoute?.meta.keepalive == 'string') {
            addKeepAliveComponentName(navTabs.state.activeRoute?.meta.keepalive)
        }
    }
)
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'layout/main',
})
</script>

<style scoped lang="scss">
.layout-container .layout-main {
    padding: 0 !important;
    overflow: hidden;
    width: 100%;
    height: 100%;
}
.layout-main-scrollbar {
    width: 100%;
    position: relative;
    overflow: hidden;
}
</style>
