<template>
    <n-form-item :label="t('designer.setting.precision')">
        <n-input-number v-model:value="optionModel.precision" clearable placeholder="精度"/>
    </n-form-item>
</template>
  
<script>
import { useI18n } from "/@/locale/useI18n";


export default defineComponent({
    name: "PrecisionEditor",
    props: {
        designer: Object,
        selectedWidget: Object,
        optionModel: Object,
    },
    setup() {
        const { t } = useI18n()

        return {
            t,
        }
    }
})
</script>
  
<style scoped></style>
  