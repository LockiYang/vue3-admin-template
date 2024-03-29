import { defineStore } from 'pinia'
import { SiteConfig, Menus } from '/@/stores/interface'

// 站点设置
export const useSiteConfig = defineStore('siteConfig', {
    state: (): SiteConfig => {
        return {
            siteName: '',
            recordNumber: '',
            version: '',
            cdnUrl: '',
            apiUrl: '',
            upload: {
                mode: 'local',
                maxsize: 0,
                mimetype: '',
                savename: '',
            },
            headNav: [],
        }
    },
    actions: {
        dataFill(state: SiteConfig) {
            this.$state = state
        },
        setHeadNav(headNav: Menus[]) {
            this.headNav = headNav
        },
    },
})
