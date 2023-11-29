<template>
    <n-form-item v-if="optionModel.required" :label="t('designer.setting.requiredHint')">
        <n-input v-model:value="optionModel.requiredHint" :placeholder="t('designer.setting.requiredHint')"/>
    </n-form-item>
</template>
  
<script>
import { useI18n } from "/@/locale/useI18n";

export default {
    name: "RequiredHintEditor",
    props: {
        designer: Object,
        selectedWidget: Object,
        optionModel: Object,
    },
    setup() {
        const { t } = useI18n()
        return {
            t
        }
    }
}
</script>

<style scoped></style>
  
<style scoped></style>