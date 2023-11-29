<template>
    <n-form-item :label="t('designer.setting.defaultValue')">
        <n-input v-model:value="optionModel.defaultValue" clearable placeholder="请输入默认值"/>
    </n-form-item>
</template>
  
<script>
import { useI18n } from "/@/locale/useI18n";


export default defineComponent({
    name: "DefaultValueEditor",
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
  