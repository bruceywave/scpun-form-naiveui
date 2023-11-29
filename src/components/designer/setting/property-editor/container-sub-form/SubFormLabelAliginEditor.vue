<template>
    <n-form-item  :label="t('designer.setting.labelAlign')" :show-feedback="false" size="small">
        <n-radio-group v-model:value="optionModel.labelAlign">
            <n-radio-button>{{i18nt('designer.setting.leftAlign')}}</n-radio-button>
            <n-radio-button>{{i18nt('designer.setting.centerAlign')}}</n-radio-button>
            <n-radio-button>{{i18nt('designer.setting.rightAlign')}}</n-radio-button>
        </n-radio-group>
    </n-form-item>
</template>

<script>
import { useI18n } from "/@/locale/useI18n";

/**
 * 表单标签位置编辑器
 */
export default defineComponent({
    name: "SubFormLabelAliginEditor",
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
  
<style scoped>
 .radio-group-custom {
    :deep(.el-radio-button__inner) {
      padding-left: 12px;
      padding-right: 12px;
    }
  }
</style>