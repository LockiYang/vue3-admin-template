import { ComponentInternalInstance, getCurrentInstance } from 'vue'

// 获取当前实例
export default function useCurrentInstance() {
    if (!getCurrentInstance()) {
        throw new Error('useCurrentInstance() can only be used inside setup() or functional components!')
    }
    const { appContext } = getCurrentInstance() as ComponentInternalInstance
    const proxy = appContext.config.globalProperties
    return {
        proxy,
    }
}
