<template>
    <n-form-item :label="t('designer.setting.customClass')" :show-feedback="false">
        <n-select v-model:value="optionModel.customClass" multiple filterable clearable default-first-option
            :placeholder="t('designer.setting.customClass')" size="small"/>
    </n-form-item>
</template>
  
<script>
import { deepClone } from "../../designer";
import { useI18n } from "/@/locale/useI18n";


export default defineComponent({
    name: "CustomClassEditor",
    props: {
        designer: Object,
        selectedWidget: Object,
        optionModel: Object,
    },
    setup(props) {
        const { t } = useI18n()

        const data = reactive({
            cssClassList: [],
        })

        data.cssClassList = deepClone(props.designer.getCssClassList())
        //监听表单css代码改动事件并重新加载！
        props.designer.handleEvent('form-css-updated', (cssClassList) => {
            data.cssClassList = cssClassList
        })

        return {
            ...toRefs(data),
            t,
        }
    }
})
</script>
  
<style scoped></style>
  