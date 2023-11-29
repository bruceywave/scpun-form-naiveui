<template>
    <div class="form-widget-container">
        <n-form class="full-height-width widget-form" :label-placement="labelPosition"
            :class="[customClass, layoutType + '-layout']" :size="size">
            <template v-if="designer.widgetList.length === 0">
                <div class="no-widget-hint">
                    <n-empty :description="t('designer.noWidgetHint')" />
                </div>
            </template>

            <draggable :list="designer.widgetList" item-key="id" class="form-widget-list"
                v-bind="{ group: 'dragGroup', ghostClass: 'ghost', animation: 300 }" handle=".drag-handler" @end="onDragEnd"
                :no-transition-on-drag="true" @add="onDragAdd" @update="onDragUpdate" :move="checkMove">
                <template #item="{ element: widget, index }">
                    <transition-group name="fade" tag="div" class="transition-group-el">
                        <template v-if="'container' === widget.category">
                            <component :is="`S${upperFirst(widget.type)}Widget`" :widget="widget" :designer="designer"
                                :key="widget.id" :parent-list="designer.widgetList" :index-of-parent-list="index"
                                :parent-widget="null">
                            </component>
                        </template>
                        <template v-else>
                            <component :is="`SForm${upperFirst(widget.type)}Widget`" :field="widget" :designer="designer"
                                :key="widget.id" :parent-list="designer.widgetList" :index-of-parent-list="index"
                                :design-state="true" :parent-widget="null"></component>
                        </template>
                    </transition-group>
                </template>
            </draggable>
        </n-form>
    </div>
</template>

<script lang="ts">
import { upperFirst } from 'lodash-es'
import Draggable from 'vuedraggable'
import ContainerComponents from "./container-widget"
import FieldComponents from './field-widget'
import designer from '/@/locale/lang/en/designer'
import { useI18n } from '/@/locale/useI18n'
export default defineComponent({
    name: 'SFormWidget',
    components: {
        Draggable,
        ...ContainerComponents,
        ...FieldComponents
    },
    props: {
        designer: {
            type: Object,
            required: true,
        },
        formConfig: {
            type: Object,
            required: true,
        },
        optionData: { //prop传入的选项数据
            type: Object,
            default: () => ({})
        },
        globalDsv: {
            type: Object,
            default: () => ({})
        },
    },
    setup(props, _context) {
        const { formConfig, globalDsv, optionData, designer } = props
        const getDesignerConfig = inject('getDesignerConfig', () => Object)

        // const message = useMessage()
        const { t } = useI18n()
        const data = reactive({
            formModel: {},
            widgetRefList: {},
            labelPosition: computed(() => {
                if (!!designer.formConfig && !!designer.formConfig.labelPosition) {
                    return designer.formConfig.labelPosition
                }
                return 'left'
            }),
            size: computed(() => {
                if (!!designer.formConfig && !!designer.formConfig.size) {
                    return designer.formConfig.size
                }
                return 'default'
            }),
            customClass: computed(() => {
                return designer.formConfig.customClass || ''
            }),
            layoutType: computed(() => designer.getLayoutType())
        })


        provide("refList", data.widgetRefList)
        provide('getFormConfig', () => formConfig)
        provide("getGlobalDsv", () => globalDsv)
        provide('globalOptionData', optionData)
        provide("globalModel", {
            formModel: data.formModel,
        })

        const methods = {
            getWidgetName(widget) {
                return `S${upperFirst(widget.type)}Widget`
            },
            disableFirefoxDefaultDrop() {
                let isFirefox = (navigator.userAgent.toLowerCase().indexOf("firefox") !== -1)
                if (isFirefox) {
                    document.body.ondrop = function (event) {
                        event.stopPropagation();
                        event.preventDefault();
                    }
                }
            },

            onDragEnd(_evt) {
                //console.log('drag end000', evt)
            },

            onDragAdd(evt) {
                const newIndex = evt.newIndex
                console.log(designer.widgetList)
                if (!!designer.widgetList[newIndex]) {
                    designer.setSelected(designer.widgetList[newIndex])
                }
                designer.emitHistoryChange()
            },

            onDragUpdate() {  /* 在VueDraggable内拖拽组件发生位置变化时会触发update，未发生组件位置变化不会触发！！ */
                designer.emitHistoryChange()
            },

            checkMove(evt) {
                return designer.checkWidgetMove(evt)
            },

            getFormData() {
                return data.formModel
            },

            getWidgetRef(widgetName, showError = false) {
                let foundRef = data.widgetRefList[widgetName]
                if (!foundRef && !!showError) {
                    console.error(t('designer.hint.refNotFound') + widgetName)
                }
                return foundRef
            },

            getSelectedWidgetRef() {
                let wName = designer.selectedWidgetName
                return methods.getWidgetRef(wName)
            },

            clearWidgetRefList() {
                Object.keys(data.widgetRefList).forEach(key => {
                    delete data.widgetRefList[key]
                })
            },

            deleteWidgetRef(widgetRefName) {
                delete data.widgetRefList[widgetRefName]
            },
        }

        watch(
            () => designer.widgetList,
            (_newValue) => {
            },
            { deep: true }
        )

        watch(
            () => designer.formConfig,
            (_newValue) => { },
            { deep: true }
        )

        // 初始化设计器
        // @ts-expect-error
        designer.initDesigner(!!getDesignerConfig().resetFormJson);
        // @ts-expect-error
        designer.loadPresetCssCode(getDesignerConfig().presetCssCode)

        onMounted(() => {
            const currentInstance = getCurrentInstance()
            currentInstance?.attrs;
            // 禁用Firefox默认拖拽搜索功能!!
            methods.disableFirefoxDefaultDrop()
            designer.registerFormWidget(methods)
        })

        return {
            ...toRefs(data),
            ...methods,
            t,
            upperFirst
        }
    },

})
</script>


<style lang="less" scoped>
.form-widget-container {
    padding: 10px;
    background: var(--n-color);

    overflow-x: hidden;
    overflow-y: auto;

    .n-form.full-height-width {
        height: 100%;
        padding: 3px;
        background: var(--n-color);

        .no-widget-hint {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            font-size: 18px;
            color: #999999;
        }

        .form-widget-list {
            min-height: calc(100vh - 178px);
            padding: 3px;
        }
    }

    .n-form.Pad-layout {
        margin: 0 auto;
        max-width: 960px;
        border-radius: 15px;
        box-shadow: 0 0 1px 10px var(--app-border-color);
    }

    .n-form.H5-layout {
        margin: 0 auto;
        width: 420px;
        border-radius: 15px;
        //border-width: 10px;
        box-shadow: 0 0 1px 10px var(--app-border-color);
    }

    .n-form.widget-form :deep(.n-row) {
        padding: 2px;
        border: 1px dashed rgba(170, 170, 170, 0.75);
    }
}

.grid-cell {
    min-height: 30px;
    border-right: 1px dotted #cccccc;

}

.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
