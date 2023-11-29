<template>
    <n-form-item :label="t('designer.setting.widgetColumnWidth')">
        <n-input v-model:value="optionModel.columnWidth" :placeholder="t('designer.setting.widgetColumnWidth')"/>
    </n-form-item>
</template>
  
<script>
import { useI18n } from "/@/locale/useI18n";

export default {
    name: "ColumnWidthEditor",
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