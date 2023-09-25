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
                    <FormItem :label="t('channel.uuid')" type="string" v-model="baTable.form.items!.uuid" prop="uuid" :placeholder="t('Please input field', { field: t('channel.uuid') })" />
                    <FormItem :label="t('channel.name')" type="string" v-model="baTable.form.items!.name" prop="name" :placeholder="t('Please input field', { field: t('channel.name') })" />
                    <FormItem :label="t('channel.version_code')" type="string" v-model="baTable.form.items!.version_code" prop="version_code" :placeholder="t('Please input field', { field: t('channel.version_code') })" />
                    <FormItem :label="t('channel.version_name')" type="string" v-model="baTable.form.items!.version_name" prop="version_name" :placeholder="t('Please input field', { field: t('channel.version_name') })" />
                    <FormItem :label="t('channel.platform_type')" type="radio" v-model="baTable.form.items!.platform_type" prop="platform_type" :data="{ content: { 1: t('channel.platform_type 1'), 2: t('channel.platform_type 2') } }" :placeholder="t('Please select field', { field: t('channel.platform_type') })" />
                    <FormItem :label="t('channel.update_switch')" type="switch" v-model="baTable.form.items!.update_switch" prop="update_switch" :data="{ content: { 0: t('channel.update_switch 0'), 1: t('channel.update_switch 1') } }" />
                    <FormItem :label="t('channel.download_url')" type="string" v-model="baTable.form.items!.download_url" prop="download_url" :placeholder="t('Please input field', { field: t('channel.download_url') })" />
                    <FormItem :label="t('channel.update_log')" type="string" v-model="baTable.form.items!.update_log" prop="update_log" :placeholder="t('Please input field', { field: t('channel.update_log') })" />
                    <FormItem :label="t('channel.status')" type="radio" v-model="baTable.form.items!.status" prop="status" :data="{ content: { 0: t('channel.status 0'), 1: t('channel.status 1') } }" :placeholder="t('Please select field', { field: t('channel.status') })" />
                    <FormItem :label="t('channel.weigh')" type="number" prop="weigh" :input-attr="{ step: 1 }" v-model.number="baTable.form.items!.weigh" :placeholder="t('Please input field', { field: t('channel.weigh') })" />
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
    create_time: [buildValidatorData({ name: 'date', title: t('channel.create_time') })],
    update_time: [buildValidatorData({ name: 'date', title: t('channel.update_time') })],
})
</script>

<style scoped lang="scss"></style>
