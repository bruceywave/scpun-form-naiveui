<template>
    <n-form-item :label="t('designer.setting.label')">
        <n-input v-model:value="optionModel.label" />
    </n-form-item>
</template>
  
<script>
import { useI18n } from "/@/locale/useI18n";

export default {
    name: "LabelEditor",
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