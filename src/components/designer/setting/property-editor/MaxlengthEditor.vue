<template>
    <n-form-item :label="t('designer.setting.maxLength')">
        <n-input-number v-model:value="optionModel.maxlength" clearable placeholder="最大长度"/>
    </n-form-item>
</template>
  
<script>
import { useI18n } from "/@/locale/useI18n";


export default defineComponent({
    name: "MaxlengthEditor",
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
  