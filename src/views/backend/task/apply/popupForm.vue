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
                    <FormItem :label="t('task.apply.user_id')" type="remoteSelect" v-model="baTable.form.items!.user_id" prop="user_id" :input-attr="{ pk: '.id', field: 'name', 'remote-url': '' }" :placeholder="t('Please select field', { field: t('task.apply.user_id') })" />
                    <FormItem :label="t('task.apply.task_id')" type="remoteSelect" v-model="baTable.form.items!.task_id" prop="task_id" :input-attr="{ pk: '.id', field: 'name', 'remote-url': '' }" :placeholder="t('Please select field', { field: t('task.apply.task_id') })" />
                    <FormItem :label="t('task.apply.price')" type="number" prop="price" :input-attr="{ step: 1 }" v-model.number="baTable.form.items!.price" :placeholder="t('Please input field', { field: t('task.apply.price') })" />
                    <FormItem :label="t('task.apply.status')" type="radio" v-model="baTable.form.items!.status" prop="status" :data="{ content: { 0: t('task.apply.status 0'), 1: t('task.apply.status 1'), 2: t('task.apply.status 2'), 3: t('task.apply.status 3'), 4: t('task.apply.status 4') } }" :placeholder="t('Please select field', { field: t('task.apply.status') })" />
                    <FormItem :label="t('task.apply.remark')" type="string" v-model="baTable.form.items!.remark" prop="remark" :placeholder="t('Please input field', { field: t('task.apply.remark') })" />
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
    price: [buildValidatorData({ name: 'number', title: t('task.apply.price') })],
    create_time: [buildValidatorData({ name: 'date', title: t('task.apply.create_time') })],
    update_time: [buildValidatorData({ name: 'date', title: t('task.apply.update_time') })],
})
</script>

<style scoped lang="scss"></style>
