<template>
    <div class="default-main ba-table-box">
        <el-alert class="ba-table-alert" v-if="baTable.table.remark" :title="baTable.table.remark" type="info" show-icon />

        <!-- 表格顶部菜单 -->
        <TableHeader
            :buttons="['refresh', 'add', 'edit', 'delete', 'comSearch', 'quickSearch', 'columnDisplay']"
            :quick-search-placeholder="t('quick Search Placeholder', { fields: t('task.quick Search Fields') })"
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
    new baTableApi('/admin/Task/'),
    {
        pk: 'id',
        column: [
            { type: 'selection', align: 'center', operator: false },
            { label: t('task.id'), prop: 'id', align: 'center', width: 70, operator: 'RANGE', sortable: 'custom' },
            { label: t('task.category__name'), prop: 'category.name', align: 'center', operatorPlaceholder: t('Fuzzy query'), render: 'tags', operator: 'LIKE' },
            { label: t('task.title'), prop: 'title', align: 'center', operatorPlaceholder: t('Fuzzy query'), operator: 'LIKE', sortable: false },
            { label: t('task.price'), prop: 'price', align: 'center', operator: 'RANGE', sortable: false },
            { label: t('task.image'), prop: 'image', align: 'center', render: 'image', operator: false },
            { label: t('task.total_price'), prop: 'total_price', align: 'center', operator: 'RANGE', sortable: false },
            { label: t('task.max_num'), prop: 'max_num', align: 'center', operator: 'RANGE', sortable: false },
            { label: t('task.apply_num'), prop: 'apply_num', align: 'center', operator: 'RANGE', sortable: false },
            { label: t('task.top_switch'), prop: 'top_switch', align: 'center', render: 'switch', operator: '=', sortable: false, replaceValue: { 0: t('task.top_switch 0'), 1: t('task.top_switch 1') } },
            { label: t('task.recommend_switch'), prop: 'recommend_switch', align: 'center', render: 'switch', operator: '=', sortable: false, replaceValue: { 0: t('task.recommend_switch 0'), 1: t('task.recommend_switch 1') } },
            { label: t('task.endtime'), prop: 'endtime', align: 'center', render: 'datetime', operator: 'RANGE', sortable: 'custom', width: 160, timeFormat: 'yyyy-mm-dd hh:MM:ss' },
            { label: t('task.weigh'), prop: 'weigh', align: 'center', operator: 'RANGE', sortable: 'custom' },
            { label: t('task.status'), prop: 'status', align: 'center', render: 'switch', operator: '=', sortable: false, replaceValue: { 0: t('task.status 0'), 1: t('task.status 1') } },
            { label: t('task.create_time'), prop: 'create_time', align: 'center', render: 'datetime', operator: 'RANGE', sortable: 'custom', width: 160, timeFormat: 'yyyy-mm-dd hh:MM:ss' },
            { label: t('task.update_time'), prop: 'update_time', align: 'center', render: 'datetime', operator: 'RANGE', sortable: 'custom', width: 160, timeFormat: 'yyyy-mm-dd hh:MM:ss' },
            { label: t('operate'), align: 'center', width: 140, render: 'buttons', buttons: optButtons, operator: false },
        ],
        dblClickNotEditColumn: [undefined, 'top_switch', 'recommend_switch', 'status'],
        defaultOrder: { prop: 'weigh', order: 'desc' },
    },
    {
        defaultItems: { price: 0, content: null, total_price: 0, max_num: 0, apply_num: 0, top_switch: '1', recommend_switch: '1', endtime: null, weigh: 0, status: '1' },
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
    name: 'task',
})
</script>

<style scoped lang="scss"></style>
