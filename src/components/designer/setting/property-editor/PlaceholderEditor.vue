<template>
    <n-form-item :label="t('designer.setting.placeholder')">
        <n-input v-model:value="optionModel.placeholder" clearable placeholder="请输入默认值"/>
    </n-form-item>
</template>
  
<script>
import { useI18n } from "/@/locale/useI18n";


export default defineComponent({
    name: "PlaceholderEditor",
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
  