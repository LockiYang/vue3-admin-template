<template>
    <div class="default-main ba-table-box">
        <el-alert class="ba-table-alert" v-if="baTable.table.remark" :title="baTable.table.remark" type="info" show-icon />

        <!-- 表格顶部菜单 -->
        <TableHeader
            :buttons="['refresh', 'add', 'edit', 'delete', 'comSearch', 'quickSearch', 'columnDisplay']"
            :quick-search-placeholder="t('quick Search Placeholder', { fields: t('category.quick Search Fields') })"
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
    new baTableApi('/admin/Category/'),
    {
        pk: 'id',
        column: [
            { type: 'selection', align: 'center', operator: false },
            { label: t('category.id'), prop: 'id', align: 'center', width: 70, operator: 'RANGE', sortable: 'custom' },
            { label: t('category.type'), prop: 'type', align: 'center', render: 'tag', operator: '=', sortable: false, replaceValue: { 1: t('category.type 1'), 2: t('category.type 2') } },
            { label: t('category.name'), prop: 'name', align: 'center', operatorPlaceholder: t('Fuzzy query'), operator: 'LIKE', sortable: false },
            { label: t('category.image'), prop: 'image', align: 'center', render: 'image', operator: false },
            { label: t('category.description'), prop: 'description', align: 'center', operatorPlaceholder: t('Fuzzy query'), operator: 'LIKE', sortable: false },
            { label: t('category.weigh'), prop: 'weigh', align: 'center', operator: 'RANGE', sortable: 'custom' },
            { label: t('category.status'), prop: 'status', align: 'center', render: 'switch', operator: '=', sortable: false, replaceValue: { 0: t('category.status 0'), 1: t('category.status 1') } },
            { label: t('category.create_time'), prop: 'create_time', align: 'center', render: 'datetime', operator: 'RANGE', sortable: 'custom', width: 160, timeFormat: 'yyyy-mm-dd hh:MM:ss' },
            { label: t('category.update_time'), prop: 'update_time', align: 'center', render: 'datetime', operator: 'RANGE', sortable: 'custom', width: 160, timeFormat: 'yyyy-mm-dd hh:MM:ss' },
            { label: t('operate'), align: 'center', width: 140, render: 'buttons', buttons: optButtons, operator: false },
        ],
        dblClickNotEditColumn: [undefined],
        defaultOrder: { prop: 'weigh', order: 'desc' },
    },
    {
        defaultItems: { type: '1', name: null, image: null, description: null, weigh: 0, status: '1' },
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
    name: 'category',
})
</script>

<style scoped lang="scss"></style>
