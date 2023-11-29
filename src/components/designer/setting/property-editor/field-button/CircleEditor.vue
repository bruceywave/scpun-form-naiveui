<template>
    <n-form-item :label="i18nt('designer.setting.circle')">
        <n-switch v-model:value="optionModel.circle" />
    </n-form-item>
</template>
  
<script>
import { useI18n } from "/@/locale/useI18n";

/**
 * 是否圆角控制属性
 */
export default defineComponent({
    name: "CircleEditor",
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