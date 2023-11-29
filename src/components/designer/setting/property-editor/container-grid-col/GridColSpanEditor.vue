<template>
    <n-form-item :label="t('designer.setting.colSpanTitle') + '(PC)'" :show-feedback="false" size="small"
        v-if="(formConfig.layoutType === 'PC')">
        <n-input-number v-model:value="(optionModel as any).span" :min="0" :max="24"
            :placeholder="t('designer.setting.colSpanTitle') + '(PC)'" />
    </n-form-item>
    <n-form-item :label="t('designer.setting.colSpanTitle') + '(Pad)'" :show-feedback="false" size="small"
        v-if="(formConfig.layoutType === 'Pad')">
        <n-input-number v-model:value="(optionModel as any).span" :min="0" :max="24"
            :placeholder="t('designer.setting.colSpanTitle') + '(Pad)'" />
    </n-form-item>
    <n-form-item :label="t('designer.setting.colSpanTitle') + '(H5)'" :show-feedback="false" size="small"
        v-if="(formConfig.layoutType === 'H5')">
        <n-input-number v-model:value="(optionModel as any).span" :min="0" :max="24"
            :placeholder="t('designer.setting.colSpanTitle') + '(H5)'" />
    </n-form-item>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { usePropertyMixin } from '../propertyMixin'

export default defineComponent({
    name: "SpanEditor",
    props: {
        designer: {
            type: Object,
            required: true
        },
        selectedWidget: {
            type: Object,
            required: true
        },
        optionModel: {
            type: Object,
            required: true
        },
    },
    setup(props, context) {
        const propertyMixin = usePropertyMixin(props, context)
        const data = reactive({
            formConfig: props.designer.formConfig
        })
        return {
            ...toRefs(data),
            ...propertyMixin,
        }
    }
});
</script>