<template>
    <n-form-item :label="t('designer.setting.uniqueName')" path="name" :rule="nameRequiredRule" :show-feedback="false" size="small">
        <template v-if="!!selectedWidget.category || noFieldList">
            <n-input type="text" v-model:value="optionModel.name" :readonly="widgetNameReadonly" @change="updateWidgetNameAndRef"
                :placeholder="t('designer.setting.fieldName')" />
        </template>
        <template v-else>
            <n-select v-model:value="optionModel.name" allow-create filterable :disabled="widgetNameReadonly"
                :placeholder="t('designer.setting.fieldName')" @change="updateWidgetNameAndRef" :options="serverFieldList"
                label-field="label" value-field="name" />
        </template>
    </n-form-item>
</template>
  
<script>
import { useI18n } from "/@/locale/useI18n";

export default {
    name: "NameEditor",
    props: {
        designer: Object,
        selectedWidget: Object,
        optionModel: Object,
    },
    setup(props) {
        const { t } = useI18n()
        const { designer, selectedWidget } = props
        const serverFieldList = inject('serverFieldList', [])
        const getDesignerConfig = inject('getDesignerConfig', () => Object)
        const data = reactive({
            nameRequiredRule: [{ required: true, message: t('designer.setting.fieldName') }],
            widgetNameReadonly: computed(() => {
                return !!getDesignerConfig().widgetNameReadonly
            }),
            noFieldList: computed(() => !serverFieldList || (serverFieldList.length <= 0))
        })

        const methods = {
            updateWidgetNameAndRef(newName) {
                let oldName = designer.selectedWidgetName
                if (isEmptyStr(newName)) {
                    selectedWidget.options.name = oldName
                    // $message.info(i18nt('designer.hint.nameRequired'))
                    return
                }

                if (!!designer.formWidget) {
                    let foundRef = designer.formWidget.getWidgetRef(newName) // 检查newName是否已存在！！
                    if (!!foundRef) {
                        selectedWidget.options.name = oldName
                        // $message.info(i18nt('designer.hint.duplicateName') + newName)
                        return
                    }

                    let widgetInDesign = designer.formWidget.getWidgetRef(oldName)
                    if (!!widgetInDesign && !!widgetInDesign.registerToRefList) {
                        widgetInDesign.registerToRefList(oldName)  //注册组件新的ref名称并删除老的ref！！
                        let newLabel = getLabelByFieldName(newName)
                        designer.updateSelectedWidgetNameAndLabel(selectedWidget, newName, newLabel)
                    }
                }
            },

            getLabelByFieldName(fieldName) {
                for (let i = 0; i < serverFieldList.length; i++) {
                    if (serverFieldList[i].name === fieldName) {
                        return serverFieldList[i].label
                    }
                }
                return null
            },

        }
        return {
            ...toRefs(data),
            ...methods,
            t
        }
    }
}
</script>

<style scoped></style>
  
<style scoped></style>