<template>
    <n-form-item :label="t('designer.setting.minLength')">
        <n-input-number v-model:value="optionModel.minlength" clearable placeholder="最小长度"/>
    </n-form-item>
</template>
  
<script>
import { useI18n } from "/@/locale/useI18n";


export default defineComponent({
    name: "MinlengthEditor",
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
  