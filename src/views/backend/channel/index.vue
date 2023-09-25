<template>
    <div class="default-main ba-table-box">
        <el-alert class="ba-table-alert" v-if="baTable.table.remark" :title="baTable.table.remark" type="info" show-icon />

        <!-- 表格顶部菜单 -->
        <TableHeader
            :buttons="['refresh', 'add', 'edit', 'delete', 'comSearch', 'quickSearch', 'columnDisplay']"
            :quick-search-placeholder="t('quick Search Placeholder', { fields: t('channel.quick Search Fields') })"
        />

        <!-- 表格 -->
        <!-- 要使用`el-table`组件原有的属性，直接加在Table标签上即可 -->
        <Table ref="tableRef" />

        <!-- 表单 -->
        <PopupForm />
    </div>
</template>

<script setup lang="ts">
import { ref, provide, onMounted } from 'vue'
import baTableClass from '/@/utils/baTable'
import { defaultOptButtons } from '/@/components/table'
import { baTableApi } from '/@/api/common'
import { useI18n } from 'vue-i18n'
import PopupForm from './popupForm.vue'
import Table from '/@/components/table/index.vue'
import TableHeader from '/@/components/table/header/index.vue'

const { t } = useI18n()
const tableRef = ref()
const optButtons = defaultOptButtons(['weigh-sort', 'edit', 'delete'])
const baTable = new baTableClass(
    new baTableApi('/admin/Channel/'),
    {
        pk: 'id',
        column: [
            { type: 'selection', align: 'center', operator: false },
            { label: t('channel.id'), prop: 'id', align: 'center', width: 70, operator: 'RANGE', sortable: 'custom' },
            { label: t('channel.uuid'), prop: 'uuid', align: 'center', operatorPlaceholder: t('Fuzzy query'), operator: 'LIKE', sortable: false },
            { label: t('channel.name'), prop: 'name', align: 'center', operatorPlaceholder: t('Fuzzy query'), operator: 'LIKE', sortable: false },
            { label: t('channel.version_code'), prop: 'version_code', align: 'center', operatorPlaceholder: t('Fuzzy query'), operator: 'LIKE', sortable: false },
            { label: t('channel.version_name'), prop: 'version_name', align: 'center', operatorPlaceholder: t('Fuzzy query'), operator: 'LIKE', sortable: false },
            { label: t('channel.platform_type'), prop: 'platform_type', align: 'center', render: 'tag', operator: '=', sortable: false, replaceValue: { 1: t('channel.platform_type 1'), 2: t('channel.platform_type 2') } },
            { label: t('channel.update_switch'), prop: 'update_switch', align: 'center', render: 'switch', operator: '=', sortable: false, replaceValue: { 0: t('channel.update_switch 0'), 1: t('channel.update_switch 1') } },
            { label: t('channel.download_url'), prop: 'download_url', align: 'center', operatorPlaceholder: t('Fuzzy query'), operator: 'LIKE', sortable: false },
            { label: t('channel.update_log'), prop: 'update_log', align: 'center', operatorPlaceholder: t('Fuzzy query'), operator: 'LIKE', sortable: false },
            { label: t('channel.status'), prop: 'status', align: 'center', render: 'tag', operator: '=', sortable: false, replaceValue: { 0: t('channel.status 0'), 1: t('channel.status 1') } },
            { label: t('channel.weigh'), prop: 'weigh', align: 'center', operator: 'RANGE', sortable: 'custom' },
            { label: t('channel.create_time'), prop: 'create_time', align: 'center', render: 'datetime', operator: 'RANGE', sortable: 'custom', width: 160, timeFormat: 'yyyy-mm-dd hh:MM:ss' },
            { label: t('channel.update_time'), prop: 'update_time', align: 'center', render: 'datetime', operator: 'RANGE', sortable: 'custom', width: 160, timeFormat: 'yyyy-mm-dd hh:MM:ss' },
            { label: t('operate'), align: 'center', width: 140, render: 'buttons', buttons: optButtons, operator: false },
        ],
        dblClickNotEditColumn: [undefined, 'update_switch'],
        defaultOrder: { prop: 'weigh', order: 'desc' },
    },
    {
        defaultItems: { platform_type: '2', update_switch: '1', status: '0', weigh: 0 },
    }
)

provide('baTable', baTable)

onMounted(() => {
    baTable.table.ref = tableRef.value
    baTable.mount()
    baTable.getIndex()?.then(() => {
        baTable.initSort()
        baTable.dragSort()
    })
})
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'channel',
})
</script>

<style scoped lang="scss"></style>
