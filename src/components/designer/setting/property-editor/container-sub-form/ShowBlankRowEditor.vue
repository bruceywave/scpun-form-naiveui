<template>
    <n-form-item :label="t('designer.setting.hidden')" :show-feedback="false" size="small">
        <n-switch v-model:value="optionModel.hidden" />
    </n-form-item>
</template>
  
<script>
import { useI18n } from "/@/locale/useI18n";

/**
 * 显示空行属性编辑器
 */
export default defineComponent({
    name: "ShowBlankRowEditor",
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