<template>
    <n-form-item :label="t('designer.setting.maxValue')">
        <n-input-number v-model:value="optionModel.max" clearable placeholder="最大值"/>
    </n-form-item>
</template>
  
<script>
import { useI18n } from "/@/locale/useI18n";


export default defineComponent({
    name: "MaxEditor",
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
  