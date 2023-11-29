<template>
    <n-form-item :label="t('designer.setting.clearable')">
        <n-switch v-model:value="optionModel.clearable" />
    </n-form-item>
</template>
  
<script>
import { useI18n } from "/@/locale/useI18n";


export default defineComponent({
    name: "ClearableEditor",
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
  