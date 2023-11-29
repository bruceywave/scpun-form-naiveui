<template>
    <div class="scpun-designer-widget">
        <n-tabs type="segment" justify-content="space-evenly">
            <!-- 组件面板 -->
            <n-tab-pane name="widgets" tab="表单组件" style="padding: 5px">
                <n-space vertical :size="5">
                    <n-input-group>
                        <n-input placeholder="请输入组件过滤"> </n-input>
                        <n-button> 过滤 </n-button>
                    </n-input-group>
                    <n-card :content-style="{ padding: 0 }">
                        <n-scrollbar class="scpun-designer-widget__w-scrollbar">
                            <n-collapse arrow-placement="right" :default-expanded-names="expandedPanels">
                                <!-- 布局组件 -->
                                <n-collapse-item :title="t('designer.containerTitle')" name="container">
                                    <s-widget-draggable-group v-if="containers?.length" :list="containers"
                                        :clone="handleContainerWidgetClone" :move="checkContainerMove"
                                        @end="onContainerDragEnd" @dbclick="addContainerByDbClick" />
                                    <n-empty v-else description="开发中，敬请期待" />
                                </n-collapse-item>
                                <!-- 基础组件 -->
                                <n-collapse-item :title="t('designer.basicFieldTitle')" name="basic">
                                    <s-widget-draggable-group v-if="basicFields?.length" :list="basicFields"
                                        :move="checkFieldMove" :clone="handleFieldWidgetClone"
                                        @dbclick="addFieldByDbClick" />
                                    <n-empty v-else description="开发中，敬请期待" />
                                </n-collapse-item>
                                <!-- 高级组件 -->
                                <n-collapse-item :title="t('designer.advancedFieldTitle')" name="advanced">
                                    <s-widget-draggable-group v-if="advancedFields?.length" :list="advancedFields"
                                        :move="checkFieldMove" :clone="handleFieldWidgetClone"
                                        @dbclick="addFieldByDbClick" />
                                    <n-empty v-else description="开发中，敬请期待" />
                                </n-collapse-item>
                                <!-- 自定义组件 -->
                                <n-collapse-item :title="t('designer.customFieldTitle')" name="custom">
                                    <s-widget-draggable-group v-if="customFields?.length" :list="customFields"
                                        :move="checkFieldMove" :clone="handleFieldWidgetClone"
                                        @dbclick="addFieldByDbClick" />
                                    <n-empty v-else description="开发中，敬请期待" />
                                </n-collapse-item>
                            </n-collapse>
                        </n-scrollbar>
                    </n-card>
                </n-space>
            </n-tab-pane>

            <!-- 模版面板 -->
            <n-tab-pane name="templates" tab="表单模版" style="padding: 5px">
                <n-card :content-style="{ padding: 0 }">
                    <n-scrollbar class="scpun-designer-widget__t-scrollbar">
                    </n-scrollbar>
                </n-card>
            </n-tab-pane>
        </n-tabs>
    </div>
</template>

<script lang="ts">
import { ContainerConfig } from "./widgetsConfig";
import { advancedFields, basicFields, containers } from "./widgetsConfig";
import { useI18n } from "/@/locale/useI18n";

export default defineComponent({
    name: "SFormWidgetPanel",
    props: {
        designer: {
            type: Object,
            required: true
        },
    },
    setup(props) {
        const getBannedWidgets = inject('getBannedWidgets', () => [])

        const getDesignerConfig = inject('getDesignerConfig', () => Object)

        const data = reactive({
            designerConfig: getDesignerConfig(),
            expandedPanels: ['container', 'basic', 'advanced', 'custom'],
            containers: containers,
            basicFields: basicFields,
            advancedFields: advancedFields,
            customFields: []
        });

        const { t } = useI18n()

        const { designer } = props

        const methods = {
            loadWidgets() {
                data.containers = data.containers.map((item) => {
                    return {
                        ...item,
                        displayName: t(`designer.widgetLabel.${item.type}`)
                    };
                }).filter(item => {
                    return !(item as ContainerConfig).internal && !methods.isBanned(item.type);
                })
                data.basicFields = data.basicFields.map((item) => {
                    return {
                        ...item,
                        displayName: t(`designer.widgetLabel.${item.type}`)
                    };
                }).filter(item => {
                    return !methods.isBanned(item.type)
                });
                data.advancedFields = data.advancedFields.map((item) => {
                    return {
                        ...item,
                        displayName: t(`designer.widgetLabel.${item.type}`)
                    };
                }).filter(item => {
                    return !methods.isBanned(item.type)
                });
            },
            isBanned(wName) {
                return getBannedWidgets().indexOf(wName as never) > -1
            },
            showFormTemplates() {
                if (data.designerConfig['formTemplates'] === undefined) {
                    return true
                }
                return !!data.designerConfig['formTemplates']
            },
            handleContainerWidgetClone(origin) {
                return designer.copyNewContainerWidget(origin)
            },
            handleFieldWidgetClone(origin) {
                return designer.copyNewFieldWidget(origin)
            },
            checkContainerMove(evt) {
                return designer.checkWidgetMove(evt)
            },
            checkFieldMove(evt) {
                return designer.checkFieldMove(evt)
            },
            onContainerDragEnd(_evt) {
                //console.log('Drag end of container: ')
                //console.log(evt)
            },
            addContainerByDbClick(container) {
                designer.addContainerByDbClick(container)
            },

            addFieldByDbClick(widget) {
                designer.addFieldByDbClick(widget)
            },
        };

        onMounted(() => {
            methods.loadWidgets()
        })

        return {
            ...toRefs(data),
            ...methods,
            t,
        };
    },
});
</script>
<style lang="less" scoped>
.scpun-designer-widget {

    :deep(.n-tabs-rail) {
        border-bottom: 1px solid var(--n-border-color);
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
.scpun-designer-widget {
    &__w-scrollbar {
        height: calc(100vh - 180px) !important;
        padding: 5px;
    }

    &__t-scrollbar {
        height: calc(100vh - 140px) !important;
    }
}
</style>
