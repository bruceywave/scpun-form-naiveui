<template>
    <n-form-item :label="t('designer.setting.controlsPosition')">
        <n-radio-group v-model:value="optionModel.buttonPlacement">
            <n-radio-button value="both">
                两边
            </n-radio-button>
            <n-radio-button value="right">
                右边
            </n-radio-button>
        </n-radio-group>
    </n-form-item>
</template>
  
<script>
import { useI18n } from "/@/locale/useI18n";


export default defineComponent({
    name: "ButtonPlacementEditor",
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
  