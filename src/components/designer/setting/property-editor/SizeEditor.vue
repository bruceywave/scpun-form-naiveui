<template>
    <n-form-item :label="t('designer.setting.size')">
        <n-radio-group v-model:value="optionModel.size">
            <n-radio-button value="tiny">
                微
            </n-radio-button>
            <n-radio-button value="small">
                小
            </n-radio-button>
            <n-radio-button value="medium">
                中
            </n-radio-button>
            <n-radio-button value="large">
                大
            </n-radio-button>
        </n-radio-group>
    </n-form-item>
</template>
  
<script>
import { useI18n } from "/@/locale/useI18n";


export default defineComponent({
    name: "SizeEditor",
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
  