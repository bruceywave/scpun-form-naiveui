<template>
    <n-col v-if="widget.type === 'grid-col'" class="grid-cell" v-bind="layoutProps"
        :class="[selected ? 'selected' : '', customClass]" :style="colHeightStyle" :key="widget.id"
        @click.stop="selectWidget(widget)">
        <draggable :list="widget.widgetList" item-key="id" class="form-widget-list"
            v-bind="{ group: 'dragGroup', ghostClass: 'ghost', animation: 200 }" handle=".drag-handler"
            :no-transition-on-drag="true" @end="(evt) => onGridDragEnd(evt, widget.widgetList)"
            @add="(evt) => onGridDragAdd(evt, widget.widgetList)" @update="onGridDragUpdate" :move="checkContainerMove">
            <template #item="{ element: subWidget, index: swIdx }">
                <transition-group name="fade" tag="div">
                    <template v-if="'container' === subWidget.category">
                        <component :is="`S${upperFirst(widget.type)}Widget`" :widget="subWidget" :designer="designer"
                            :key="subWidget.id" :parent-list="widget.widgetList" :index-of-parent-list="swIdx"
                            :parent-widget="widget"></component>
                    </template>
                    <template v-else>
                        <component :is="`SForm${upperFirst(subWidget.type)}Widget`" :field="subWidget" :designer="designer"
                            :key="subWidget.id" :parent-list="widget.widgetList" :index-of-parent-list="swIdx"
                            :parent-widget="widget" :design-state="true"></component>
                    </template>
                </transition-group>
            </template>
        </draggable>

        <div class="grid-col-action" v-if="designer.selectedId === widget.id && widget.type === 'grid-col'">
            <n-button size="tiny" type="primary" @click.stop="selectParentWidget()">
                <n-icon>
                    <ArrowLeftOutlined />
                </n-icon>
            </n-button>
            <n-button v-if="!!parentList && parentList.length > 1" size="tiny" type="primary" @click.stop="moveUpWidget()">
                <n-icon>
                    <ArrowUpOutlined />
                </n-icon>
            </n-button>
            <n-button v-if="!!parentList && parentList.length > 1" size="tiny" type="primary" @click.stop="moveDownWidget()">
                <n-icon>
                    <ArrowUpOutlined />
                </n-icon>
            </n-button>
            <n-button size="tiny" type="primary" @click.stop="cloneGridCol(widget)">
                <n-icon>
                    <CopyOutlined />
                </n-icon>
            </n-button>
            <n-button size="tiny" type="primary" @click.stop="removeWidget()">
                <n-icon>
                    <DeleteOutlined />
                </n-icon>
            </n-button>
        </div>

        <div class="grid-col-handler" v-if="designer.selectedId === widget.id && widget.type === 'grid-col'">
            <n-button size="tiny" type="primary">
                <n-icon size="14">
                    <Move />
                </n-icon>
                <i>{{ t("designer.widgetLabel." + widget.type) }}</i>
            </n-button>
        </div>
    </n-col>
</template>

<script lang="ts">
import Draggable from 'vuedraggable'
import { useDesignMixin } from '../../useDesignMixin'
import { upperFirst } from 'lodash-es'
import {
    ArrowLeftOutlined,
    ArrowUpOutlined,
    ArrowDownOutlined,
    CopyOutlined,
    DeleteOutlined
} from '@vicons/antd'
import { Move } from '@vicons/ionicons5'
import FieldComponents from '../field-widget'
export default defineComponent({
    name: 'SGridWidget',
    components: {
        Draggable,
        ArrowLeftOutlined,
        ArrowUpOutlined,
        ArrowDownOutlined,
        CopyOutlined,
        DeleteOutlined,
        Move,
        ...FieldComponents
    },
    props: {
        widget: {
            type: Object,
            required: true
        },
        parentWidget: {
            type: Object,
            required: true
        },
        parentList: {
            type: Array,
            required: true
        },
        indexOfParentList: {
            type: Number,
            required: true
        },
        designer: {
            type: Object,
            required: true
        },
        colHeight: {
            type: String,
            default: null
        },
    },
    setup(props, context) {
        const designMixin = useDesignMixin(props, context)

        const { widget, colHeight, designer, parentWidget, parentList, indexOfParentList } = props

        const data = reactive({
            layoutProps: {
                span: widget.options.span || 12,
                // md: widget.options.md || 12,
                // sm: widget.options.sm || 12,
                // xs: widget.options.xs || 12,
                offset: widget.options.offset || 0,
                push: widget.options.push || 0,
                pull: widget.options.pull || 0,
            },
            colHeightStyle: computed(() => !!colHeight ? { height: colHeight + 'px' } : {}),
            selected: computed(() => props.widget.id === props.designer.selectedId),
            customClass: computed(() => widget.options.customClass || '')
        })


        const methods = {
            getWidgetName(widget) {
                return `S${upperFirst(widget.type)}Widget`
            },
            initLayoutProps() {
                if (!!widget.options.responsive) {
                    let lyType = designer.formConfig.layoutType
                    if (lyType === 'H5') {
                        data.layoutProps.span = widget.options.xs || 12
                    } else if (lyType === 'Pad') {
                        data.layoutProps.span = widget.options.sm || 12
                    } else {
                        data.layoutProps.span = widget.options.md || 12
                    }
                } else {
                    data.layoutProps.span = widget.options.span
                }
            },

            onGridDragEnd(_evt, _subList) {
                //
            },

            onGridDragAdd(evt, subList) {
                const newIndex = evt.newIndex
                if (!!subList[newIndex]) {
                    designer.setSelected(subList[newIndex])
                }

                designer.emitHistoryChange()
            },

            onGridDragUpdate() {
                designer.emitHistoryChange()
            },

            selectWidget(widget) {
                console.log('id: ' + widget.id)
                designer.setSelected(widget)
            },

            checkContainerMove(evt) {
                return designer.checkWidgetMove(evt)
            },

            selectParentWidget() {
                if (parentWidget) {
                    designer.setSelected(parentWidget)
                } else {
                    designer.clearSelected()
                }
            },

            moveUpWidget() {
                designer.moveUpWidget(parentList, indexOfParentList)
            },

            moveDownWidget() {
                designer.moveDownWidget(parentList, indexOfParentList)
            },

            cloneGridCol(widget) {
                designer.cloneGridCol(widget, parentWidget)
            },

            removeWidget() {
                if (!!parentList) {
                    let nextSelected
                    if (parentList.length === 1) {
                        if (!!parentWidget) {
                            nextSelected = parentWidget
                        }
                    } else if (parentList.length === (1 + indexOfParentList)) {
                        nextSelected = parentList[indexOfParentList - 1]
                    } else {
                        nextSelected = parentList[indexOfParentList + 1]
                    }

                    nextTick(() => {
                        parentList.splice(indexOfParentList, 1)
                        //if (!!nextSelected) {
                        designer.setSelected(nextSelected)
                        //}

                        designer.emitHistoryChange()
                    })
                }
            },
        }


        //初始化
        designMixin.initRefList()
        methods.initLayoutProps()

        return {
            ...toRefs(data),
            ...designMixin,
            ...methods,
            upperFirst
        }
    }
})
</script>



<style lang="less" scoped>
.grid-cell {
    min-height: 38px !important;
    //margin: 6px 0;  /* 设置了margin，栅格列的offset、push、pull会失效！！ */
    padding: 3px;
    outline: 1px dashed #336699;
    position: relative;

    .form-widget-list {
        min-height: 28px;
    }

    .grid-col-action {
        position: absolute;
        bottom: 0;
        right: -2px;
        background: var(--app-primary-color);
        z-index: 999;
    }

    .grid-col-handler {
        position: absolute;
        top: -2px;
        left: -2px;
        background: var(--app-primary-color);
        z-index: 9;
    }
}

.grid-col-action,
.grid-col-handler {
    :deep(.svg-icon) {
        margin-left: 0.1em;
        margin-right: 0.1em;
    }
}
</style>