<template>
    <n-form-item :label="t('designer.setting.labelAlign')">
        <n-select v-model:value="optionModel.labelAlign" clearable :options="selectOptions" :placeholder="t('designer.setting.labelAlign')"></n-select>
    </n-form-item>
</template>
  
<script>
import { useI18n } from "/@/locale/useI18n";


export default defineComponent({
    name: "LabelAlignEditor",
    props: {
        designer: Object,
        selectedWidget: Object,
        optionModel: Object,
    },
    setup() {
        const { t } = useI18n()

        const data = reactive({
            selectOptions: [
                {label: '左边对齐', value: 'left'},
                {label: '右边对齐', value: 'right'},
            ]
        })

        return {
            ...toRefs(data),
            t,
        }
    }
})
</script>
  
<style scoped></style>
  