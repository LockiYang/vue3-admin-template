<template>
    <!-- 对话框表单 -->
    <el-dialog
        class="ba-operate-dialog"
        :close-on-click-modal="false"
        :model-value="['add', 'edit'].includes(baTable.form.operate!)"
        @close="baTable.toggleForm"
        width="50%"
    >
        <template #header>
            <div class="title" v-drag="['.ba-operate-dialog', '.el-dialog__header']" v-zoom="'.ba-operate-dialog'">
                {{ baTable.form.operate ? t(baTable.form.operate) : '' }}
            </div>
        </template>
        <el-scrollbar v-loading="baTable.form.loading" class="ba-table-form-scrollbar">
            <div
                class="ba-operate-form"
                :class="'ba-' + baTable.form.operate + '-form'"
                :style="'width: calc(100% - ' + baTable.form.labelWidth! / 2 + 'px)'"
            >
                <el-form
                    v-if="!baTable.form.loading"
                    ref="formRef"
                    @submit.prevent=""
                    @keyup.enter="baTable.onSubmit(formRef)"
                    :model="baTable.form.items"
                    label-position="right"
                    :label-width="baTable.form.labelWidth + 'px'"
                    :rules="rules"
                >
                    <FormItem :label="t('task.category_id')" type="remoteSelect" v-model="baTable.form.items!.category_id" prop="category_id" :input-attr="{ pk: 'category.id', field: 'name', 'remote-url': '/admin/Category/index' }" :placeholder="t('Please select field', { field: t('task.category_id') })" />
                    <FormItem :label="t('task.title')" type="string" v-model="baTable.form.items!.title" prop="title" :placeholder="t('Please input field', { field: t('task.title') })" />
                    <FormItem :label="t('task.price')" type="number" prop="price" :input-attr="{ step: 1 }" v-model.number="baTable.form.items!.price" :placeholder="t('Please input field', { field: t('task.price') })" />
                    <FormItem :label="t('task.image')" type="image" v-model="baTable.form.items!.image" prop="image" />
                    <FormItem :label="t('task.info')" type="textarea" v-model="baTable.form.items!.info" prop="info" :input-attr="{ rows: 3 }" @keyup.enter.stop="" @keyup.ctrl.enter="baTable.onSubmit(formRef)" :placeholder="t('Please input field', { field: t('task.info') })" />
                    <FormItem :label="t('task.content')" type="editor" v-model="baTable.form.items!.content" prop="content" @keyup.enter.stop="" @keyup.ctrl.enter="baTable.onSubmit(formRef)" :placeholder="t('Please input field', { field: t('task.content') })" />
                    <FormItem :label="t('task.total_price')" type="number" prop="total_price" :input-attr="{ step: 1 }" v-model.number="baTable.form.items!.total_price" :placeholder="t('Please input field', { field: t('task.total_price') })" />
                    <FormItem :label="t('task.max_num')" type="number" prop="max_num" :input-attr="{ step: 1 }" v-model.number="baTable.form.items!.max_num" :placeholder="t('Please input field', { field: t('task.max_num') })" />
                    <FormItem :label="t('task.apply_num')" type="number" prop="apply_num" :input-attr="{ step: 1 }" v-model.number="baTable.form.items!.apply_num" :placeholder="t('Please input field', { field: t('task.apply_num') })" />
                    <FormItem :label="t('task.top_switch')" type="switch" v-model="baTable.form.items!.top_switch" prop="top_switch" :data="{ content: { 0: t('task.top_switch 0'), 1: t('task.top_switch 1') } }" />
                    <FormItem :label="t('task.recommend_switch')" type="switch" v-model="baTable.form.items!.recommend_switch" prop="recommend_switch" :data="{ content: { 0: t('task.recommend_switch 0'), 1: t('task.recommend_switch 1') } }" />
                    <FormItem :label="t('task.endtime')" type="datetime" v-model="baTable.form.items!.endtime" prop="endtime" :placeholder="t('Please select field', { field: t('task.endtime') })" />
                    <FormItem :label="t('task.weigh')" type="number" prop="weigh" :input-attr="{ step: 1 }" v-model.number="baTable.form.items!.weigh" :placeholder="t('Please input field', { field: t('task.weigh') })" />
                    <FormItem :label="t('task.status')" type="switch" v-model="baTable.form.items!.status" prop="status" :data="{ content: { 0: t('task.status 0'), 1: t('task.status 1') } }" />
                </el-form>
            </div>
        </el-scrollbar>
        <template #footer>
            <div :style="'width: calc(100% - ' + baTable.form.labelWidth! / 1.8 + 'px)'">
                <el-button @click="baTable.toggleForm('')">{{ t('Cancel') }}</el-button>
                <el-button v-blur :loading="baTable.form.submitLoading" @click="baTable.onSubmit(formRef)" type="primary">
                    {{ baTable.form.operateIds && baTable.form.operateIds.length > 1 ? t('Save and edit next item') : t('Save') }}
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref, inject } from 'vue'
import { useI18n } from 'vue-i18n'
import type baTableClass from '/@/utils/baTable'
import FormItem from '/@/components/formItem/index.vue'
import type { ElForm, FormItemRule } from 'element-plus'
import { buildValidatorData } from '/@/utils/validate'

const formRef = ref<InstanceType<typeof ElForm>>()
const baTable = inject('baTable') as baTableClass

const { t } = useI18n()

const rules: Partial<Record<string, FormItemRule[]>> = reactive({
    price: [buildValidatorData({ name: 'float', title: t('task.price') })],
    content: [buildValidatorData({ name: 'editorRequired', title: t('task.content') })],
    total_price: [buildValidatorData({ name: 'float', title: t('task.total_price') })],
    max_num: [buildValidatorData({ name: 'number', title: t('task.max_num') })],
    apply_num: [buildValidatorData({ name: 'number', title: t('task.apply_num') })],
    endtime: [buildValidatorData({ name: 'date', title: t('task.endtime') })],
    create_time: [buildValidatorData({ name: 'date', title: t('task.create_time') })],
    update_time: [buildValidatorData({ name: 'date', title: t('task.update_time') })],
})
</script>

<style scoped lang="scss"></style>
