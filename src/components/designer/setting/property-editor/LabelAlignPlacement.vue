<template>
    <n-form-item :label="t('designer.setting.labelPosition')">
        <n-select v-model:value="optionModel.lablePlacement" clearable :options="selectOptions" :placeholder="t('designer.setting.labelPosition')"></n-select>
    </n-form-item>
</template>
  
<script>
import { useI18n } from "/@/locale/useI18n";


export default defineComponent({
    name: "LabelAlignPlacement",
    props: {
        designer: Object,
        selectedWidget: Object,
        optionModel: Object,
    },
    setup() {
        const { t } = useI18n()

        const data = reactive({
            selectOptions: [
                {label: '组件顶部', value: 'top'},
                {label: '组件左边', value: 'left'},
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
  