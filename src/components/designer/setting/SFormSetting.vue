<template>
    <div class="scpun-designer-setting">
        <n-tabs type="segment" justify-content="space-evenly" v-model:value="activeTab">
            <n-tab-pane name="fieldProperty" :tab="t('designer.hint.widgetSetting')" style="padding: 5px">
                <n-card :content-style="{ padding: '10px' }">
                    <n-scrollbar class="scpun-designer-setting__field-scrollbar">
                        <div v-if="!!designer.selectedWidget">
                            <!-- 如果存在选中的组件，且选中组件类型为空 -->
                            <template v-if="!designer.selectedWidget.category">
                                <n-form :model="(optionModel as any)" label-placement="left" label-align="left"
                                    label-width="100" @submit.prevent size="small" :show-feedback="false"
                                    require-mark-placement="left">
                                    <n-collapse :default-expanded-names="expandedPanels" arrow-placement="right"
                                        class="setting-collapse">
                                        <n-collapse-item name="1" v-if="showCollapse(commonProps)"
                                            :title="t('designer.setting.commonSetting')">
                                            <template v-for="(editorName, propName) in commonProps">
                                                <component v-if="hasPropEditor(propName, editorName)"
                                                    :is="getPropEditor(propName, editorName)" :designer="designer"
                                                    :selected-widget="selectedWidget" :option-model="optionModel">
                                                </component>
                                            </template>
                                        </n-collapse-item>
                                        <n-collapse-item name="1" v-if="showCollapse(advProps)"
                                            :title="t('designer.setting.advancedSetting')">
                                            <template v-for="(editorName, propName) in advProps">
                                                <component v-if="hasPropEditor(propName, editorName)"
                                                    :is="getPropEditor(propName, editorName)" :designer="designer"
                                                    :selected-widget="selectedWidget" :option-model="optionModel">
                                                </component>
                                            </template>
                                        </n-collapse-item>
                                        <n-collapse-item name="1" v-if="showEventCollapse() && showCollapse(eventProps)"
                                            :title="t('designer.setting.eventSetting')">
                                            <template v-for="(editorName, propName) in eventProps">
                                                <component v-if="hasPropEditor(propName, editorName)"
                                                    :is="getPropEditor(propName, editorName)" :designer="designer"
                                                    :selected-widget="selectedWidget" :option-model="optionModel">
                                                </component>
                                            </template>
                                        </n-collapse-item>
                                    </n-collapse>
                                </n-form>
                            </template>
                            <!-- 如果存在选中的组件，且选中组件类型不为空 -->
                            <template v-if="(!!designer.selectedWidget.category)">
                                <n-form :model="(optionModel as any)" label-placement="left" label-align="left"
                                    label-width="100" @submit.prevent>
                                    <n-collapse :default-expanded-names="expandedPanels" arrow-placement="right"
                                        class="setting-collapse">
                                        <n-collapse-item name="1" v-if="showCollapse(commonProps)"
                                            :title="t('designer.setting.commonSetting')">
                                            <template v-for="(editorName, propName) in commonProps">
                                                <component v-if="hasPropEditor(propName, editorName)"
                                                    :is="getPropEditor(propName, editorName)" :designer="designer"
                                                    :selected-widget="selectedWidget" :option-model="optionModel">
                                                </component>
                                            </template>
                                        </n-collapse-item>
                                        <n-collapse-item name="1" v-if="showCollapse(advProps)"
                                            :title="t('designer.setting.advancedSetting')">
                                            <template v-for="(editorName, propName) in advProps">
                                                <component v-if="hasPropEditor(propName, editorName)"
                                                    :is="getPropEditor(propName, editorName)" :designer="designer"
                                                    :selected-widget="selectedWidget" :option-model="optionModel">
                                                </component>
                                            </template>
                                        </n-collapse-item>
                                        <n-collapse-item name="1" v-if="showEventCollapse() && showCollapse(eventProps)"
                                            :title="t('designer.setting.eventSetting')">
                                            <template v-for="(editorName, propName) in eventProps">
                                                <component v-if="hasPropEditor(propName, editorName)"
                                                    :is="getPropEditor(propName, editorName)" :designer="designer"
                                                    :selected-widget="selectedWidget" :option-model="optionModel">
                                                </component>
                                            </template>
                                        </n-collapse-item>
                                    </n-collapse>
                                </n-form>
                            </template>
                        </div>
                        <div v-else>
                            <n-empty description="请选择需要设置的组件"></n-empty>
                        </div>
                    </n-scrollbar>
                </n-card>
            </n-tab-pane>
            <n-tab-pane name="formProperty" :tab="t('designer.hint.formSetting')" style="padding: 5px">
                <n-card :content-style="{ padding: '10px' }">
                    <n-scrollbar class="scpun-designer-setting__form-scrollbar">
                        <s-form-property-setting :form-config="formConfig" :designer="designer" />
                    </n-scrollbar>
                </n-card>
            </n-tab-pane>
        </n-tabs>
    </div>
</template>

<script lang="ts">
import { useI18n } from "/@/locale/useI18n";
import WidgetProperties from './propertyRegister'
import { propertyRegistered } from "./propertyRegister";
import { addWindowResizeHandler } from "../designer";
import { upperFirst } from "lodash-es";
import PropertyEditors from './property-editor'

const { COMMON_PROPERTIES, ADVANCED_PROPERTIES, EVENT_PROPERTIES } = WidgetProperties

export default defineComponent({
    name: "SFormSetting",
    components: {
        ...PropertyEditors
    },
    props: {
        designer: {
            type: Object,
            required: true,
        },
        selectedWidget: {
            type: Object,
            required: true,
        },
        formConfig: {
            type: Object,
            required: true,
        },
        globalDsv: {
            type: Object,
            default: () => ({}),
        },
    },
    setup(props) {
        const { t } = useI18n();

        const getDesignerConfig = inject('getDesignerConfig', () => Object)

        const data = reactive({
            designerConfig: getDesignerConfig(),
            activeTab: 'formProperty',
            scrollerHeight: '0px',
            expandedPanels: ['1', '2'],
            commonProps: COMMON_PROPERTIES,
            advProps: ADVANCED_PROPERTIES,
            eventProps: EVENT_PROPERTIES,
        });

        const optionModel = computed({
            set(newValue) {
                props.selectedWidget.options = newValue;
            },
            get() {
                return props.selectedWidget?.options;
            },
        });

        const methods = {
            showEventCollapse() {
                if (data.designerConfig['eventCollapse'] === undefined) {
                    return true
                }
                return !!data.designerConfig['eventCollapse']
            },
            showCollapse(propsObj) {
                let result = false;
                for (let propName in propsObj) {
                    if (!propsObj.hasOwnProperty(propName)) {
                        continue;
                    }

                    if (this.hasPropEditor(propName, propsObj[propName])) {
                        result = true;
                        break;
                    }
                }
                return result;
            },
            hasPropEditor(propName, editorName) {
                if (!editorName) {
                    return false;
                }

                /* alert组件注册了两个type属性编辑器，跳过第一个type属性编辑器，只显示第二个alert-type属性编辑器！！ */
                if (propName.indexOf("-") <= -1) {
                    let uniquePropName = props.selectedWidget.type + "-" + propName;
                    if (propertyRegistered(uniquePropName)) {
                        return false;
                    }
                }

                let originalPropName = propName.replace(
                    props.selectedWidget.type + "-",
                    ""
                ); //去掉组件名称前缀-，如果有的话！！
                return props.designer.hasConfig(props.selectedWidget, originalPropName);
            },
            getPropEditor(propName, editorName) {
                let originalPropName = propName.replace(props.selectedWidget.type + '-', '')  //去掉组件名称前缀-，如果有的话！！
                let ownPropEditorName = `${upperFirst(props.selectedWidget.type)}${upperFirst(originalPropName)}Editor`

                const currentInstance = getCurrentInstance()
                // console.log(ownPropEditorName, currentInstance?.components, currentInstance?.components[ownPropEditorName])
                //@ts-expect-error
                if (!!currentInstance.components[ownPropEditorName]) {  //局部注册的属性编辑器组件
                    return ownPropEditorName
                }

                return !!currentInstance?.appContext.components[ownPropEditorName] ? ownPropEditorName : editorName  //Vue3全局注册的属性编辑器组件
            },
        };
        watch(
            () => props.selectedWidget,
            (val) => {
                if (!!val) {
                    data.activeTab = 'fieldProperty'
                } else{
                    data.activeTab = 'formProperty'
                }
            }
        )

        watch(
            () => props.selectedWidget.options,
            () => props.designer.saveCurrentHistoryStep()
        )

        watch(
            () => props.formConfig,
            () => props.designer.saveCurrentHistoryStep()
        )

        onMounted(() => {
            if (!props.designer.selectedWidget) {
                data.activeTab = "formProperty"
            } else {
                data.activeTab = "fieldProperty"
            }

            data.scrollerHeight = window.innerHeight - 56 - 48 + 'px'
            addWindowResizeHandler(() => {
                nextTick(() => {
                    data.scrollerHeight = window.innerHeight - 56 - 48 + 'px'
                    //console.log(this.scrollerHeight)
                })
            })
        })

        return {
            ...toRefs(data),
            ...methods,
            optionModel,
            t,
        };
    },
});
</script>

<style lang="less" scoped>
.scpun-designer-setting {
    :deep(.n-tabs-rail) {
        border-bottom: 1px solid var(--n-tab-border-color);
    }

    :deep(.n-tabs-rail) {
        border-bottom: 1px solid var(--n-border-color);
    }

    :deep(.n-form-item) {
        padding-bottom: 10px !important;
    }

    .n-divider:not(.n-divider--vertical) {
        margin: 0
    }

    :deep(.n-collapse-item) {
        margin: 0;

        .n-collapse-item__header {
            padding-top: 5px !important;
        }

        .n-collapse-item__header-main {
            justify-content: space-between;
            padding-left: 5px;
            padding-right: 5px;
            line-height: 30px;
            font-weight: 800 !important;
        }


        .n-collapse-item__content-inner {
            padding-top: 0 !important;
        }
    }
}
</style>

<style lang="less">
.scpun-designer-setting {
    &__field-scrollbar {
        height: calc(100vh - 162px) !important;
    }

    &__form-scrollbar {
        height: calc(100vh - 162px) !important;
    }
}
</style>
