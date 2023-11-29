<template>
    <div class="scpun-form-designer">
        <n-layout>
            <!-- 头部区域开始 -->
            <n-layout-header class="scpun-form-designer__header" bordered>
                <s-form-header :form-version="version" @update-theme="changeTheme" />
            </n-layout-header>
            <!-- 头部区域结束 -->
            <!-- 中间部分 -->
            <n-layout has-sider>
                <!-- 左边区域开始 -->
                <n-layout-sider collapse-mode="transform" show-trigger="arrow-circle" :show-collapsed-content="false"
                    bordered>
                    <s-form-widget-panel :designer="designer" />
                </n-layout-sider>
                <!-- 左边区域结束 -->

                <!-- 中间及右边部分 -->
                <n-layout has-sider sider-placement="right">
                    <n-layout>
                        <!-- 工具栏区域开始 -->
                        <n-layout-header bordered>
                            <s-form-toolbar :designer="designer" />
                        </n-layout-header>
                        <!-- 工具栏区域结束 -->

                        <!-- 内容区域开始 -->
                        <n-layout-content class="scpun-form-designer__content">
                            <s-form-widget :designer="designer" :form-config="designer.formConfig" :global-dsv="globalDsv"
                                ref="formRef" />
                        </n-layout-content>
                        <!-- 内容区域结束 -->
                    </n-layout>

                    <!-- 右边区域开始 -->
                    <n-layout-sider collapse-mode="transform" show-trigger="arrow-circle" :show-collapsed-content="false"
                        bordered :width="300">
                        <s-form-setting :designer="designer" :form-config="designer.formConfig"
                            :selected-widget="(designer.selectedWidget || {})" />
                    </n-layout-sider>
                    <!-- 右边区域结束 -->
                </n-layout>
            </n-layout>

            <n-layout-footer bordered>
                <div class="scpun-form-designer__footer">版权归易智码所有</div>
            </n-layout-footer>
        </n-layout>
    </div>
</template>

<script lang="ts">
import { VARIANT_FORM_VERSION } from "./designer";
import { createDesigner, addWindowResizeHandler } from "./designer";
import { useLocale } from "/@/locale/useLocale";
import { getNaiveLocale } from "/@/utils/localeUtils";
import { NaiveLocale } from "/@/utils/localeUtils";
import SFormWidget from './form/index.vue'

export default defineComponent({
    name: "SFormDesigner",
    components: {
        SFormWidget
    },
    props: {
        /* 后端字段列表API */
        fieldListApi: {
            type: Object,
            default: null,
        },
        /* 禁止显示的组件名称数组 */
        bannedWidgets: {
            type: Array,
            default: () => []
        },
        designerConfig: {
            type: Object,
            default: () => {
                return {
                    languageMenu: true,  //是否显示语言切换菜单
                    externalLink: true,  //是否显示GitHub、文档等外部链接
                    formTemplates: true,  //是否显示表单模板
                    widgetNameReadonly: false,  //禁止修改组件名称
                    eventCollapse: true,  //是否显示组件事件属性折叠面板

                    clearDesignerButton: true,  //是否显示清空设计器按钮
                    previewFormButton: true,  //是否显示预览表单按钮
                    importJsonButton: true,  //是否显示导入JSON按钮
                    exportJsonButton: true,  //是否显示导出JSON器按钮
                    exportCodeButton: true,  //是否显示导出代码按钮
                    generateSFCButton: true,  //是否显示生成SFC按钮

                    toolbarMaxWidth: 450,  //设计器工具按钮栏最大宽度（单位像素）
                    toolbarMinWidth: 300,  //设计器工具按钮栏最小宽度（单位像素）

                    presetCssCode: '',  //设计器预设CSS样式代码

                    resetFormJson: false,  //是否在设计器初始化时将表单内容重置为空
                }
            }
        },
        /* 全局数据源变量 */
        globalDsv: {
            type: Object,
            default: () => ({})
        },
    },
    setup(props, context) {
        const currentInstance = getCurrentInstance()
        const data = reactive({
            version: VARIANT_FORM_VERSION,
            localeName: "zh-CN" as unknown as NaiveLocale,
            docUrl: "",
            gitUrl: "",
            chatUrl: "",
            scrollerHeight: 0,
            designer: createDesigner(currentInstance),
            fieldList: []
        });

        provide("serverFieldList", data.fieldList)
        provide("getDesignerConfig", () => props.designerConfig)
        provide("getBannedWidgets", () => props.bannedWidgets)

        const methods = {
            openHome() { },
            initLocale() {
                const locale = getNaiveLocale();
                data.localeName = locale as unknown as NaiveLocale;
            },
            changeLanguage(langName) {
                useLocale().changeLocale(langName);
            },
            setFormJson(formJson) {
                if (!!formJson) {
                    let modifiedFlag = false;
                    if (typeof formJson === "string") {
                        modifiedFlag = data.designer.loadFormJson(JSON.parse(formJson));
                    } else if (formJson.constructor === Object) {
                        modifiedFlag = data.designer.loadFormJson(formJson);
                    }

                    if (modifiedFlag) {
                        data.designer.emitHistoryChange();
                    }
                }
            },
            changeTheme(theme) {
                context.emit("updateTheme", theme);
            },
        };

        onMounted(() => {
            methods.initLocale();

            data.scrollerHeight = window.innerHeight - 56 - 36;
            addWindowResizeHandler(() => {
                nextTick(() => {
                    data.scrollerHeight = window.innerHeight - 56 - 36;
                });
            });
        });

        return {
            ...toRefs(data),
            ...methods,
        };
    },
});
</script>

<style lang="less">
.scpun-form-designer {
    &__content {
        height: calc(100vh - 128px);
        background: var(--app-tab-color);
        padding: 10px;
    }

    &__footer {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 40px;
        color: var(--app-text-color-base);
    }
}
</style>
