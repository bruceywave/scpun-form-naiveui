<!-- 静态表格单元格 -->
<template>
    <td class="table-cell" :class="[selected ? 'selected' : '', customClass]"
        :style="{ width: widget.options.cellWidth + '!important' || '', height: widget.options.cellHeight + '!important' || '', 'word-break': !!widget.options.wordBreak ? 'break-all' : 'normal' }"
        :colspan="widget.options.colspan || 1" :rowspan="widget.options.rowspan || 1" @click.stop="selectWidget(widget)">

        <draggable :list="widget.widgetList" item-key="id" style="height: 100%;"
            v-bind="{ group: 'dragGroup', ghostClass: 'ghost', animation: 200 }" handle=".drag-handler"
            @end="(evt) => onTableDragEnd(evt, widget.widgetList)" @add="(evt) => onTableDragAdd(evt, widget.widgetList)"
            @update="onTableDragUpdate" :move="checkContainerMove" :no-transition-on-drag="true">
            <template #item="{ element: subWidget, index: swIdx }">
                <transition-group name="fade" tag="div" class="form-widget-list">
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

        <div class="table-cell-action" v-if="designer.selectedId === widget.id && widget.type === 'table-cell'">
            <n-button size="tiny" type="primary" @click.stop="selectParentWidget()">
                <n-icon>
                    <ArrowLeftOutlined />
                </n-icon>
            </n-button>
            <n-dropdown :options="tableActionDropdowns" placement="bottom-start" trigger="click"
                @select="handleTableCellCommand" size="small">
                <n-button size="tiny" type="primary">
                    <n-icon :title="t('designer.hint.cellSetting')">
                        <MenuOutlined />
                    </n-icon>
                </n-button>
            </n-dropdown>
        </div>

        <div class="table-cell-handler" v-if="designer.selectedId === widget.id && widget.type === 'table-cell'">
            <i>{{ t('designer.widgetLabel.' + widget.type) }}</i>
        </div>
    </td>
</template>

<script lang="ts">
import { upperFirst } from 'lodash-es';
import { useDesignMixin } from '../../useDesignMixin';
import Draggable from 'vuedraggable'
import FieldComponents from '../field-widget'
import { MenuOutlined, ArrowLeftOutlined } from '@vicons/antd';

export default defineComponent({
    name: 'STableCellWidget',
    components: {
        Draggable,
        ...FieldComponents,
        MenuOutlined,
        ArrowLeftOutlined
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
        designer: {
            type: Object,
            required: true
        },
        rowIndex: {
            type: Number,
            required: true
        },
        colIndex: {
            type: Number,
            required: true
        },
        rowLength: {
            type: Number,
            required: true
        },
        colLength: {
            type: Number,
            required: true
        },
        colArray: {
            type: Array,
            required: true,
            default: []
        },
        rowArray: {
            type: Array,
            required: true,
            default: []
        },
    },
    setup(props, context) {
        const designMixin = useDesignMixin(props, context)

        const {
            rowIndex,
            colIndex,
            rowLength,
            colLength,
            colArray,
            rowArray,
            widget,
            designer,
            parentWidget
        } = props

        const data = reactive({
            // @ts-expect-error
            mergeLeftColDisabled: computed(() => (colIndex <= 0) || (colArray[colIndex - 1].options.rowspan !== widget.options.rowspan)),
            mergeRightColDisabled: computed(() => {
                let rightColIndex = colIndex + widget.options.colspan
                return (colIndex >= colLength - 1) || (rightColIndex > colLength - 1)
                    // @ts-expect-error
                    || (colArray[rightColIndex].options.rowspan !== widget.options.rowspan)
            }),
            mergeWholeRowDisabled: computed(() => (colLength <= 1) || (colLength === widget.options.colspan)),
            mergeAboveRowDisabled: computed(() => {
                // @ts-expect-error
                return (rowIndex <= 0) || (rowArray[rowIndex - 1].cols[colIndex].options.colspan
                    !== widget.options.colspan)
            }),
            mergeBelowRowDisabled: computed(() => {
                let belowRowIndex = rowIndex + widget.options.rowspan
                return (rowIndex >= rowLength - 1) || (belowRowIndex > rowLength - 1)
                    // @ts-expect-error
                    || (rowArray[belowRowIndex].cols[colIndex].options.colspan !== widget.options.colspan)
            }),
            mergeWholeColDisabled: computed(() => {
                return (rowLength <= 1) || (rowLength === widget.options.rowspan)
            }),
            undoMergeColDisabled: computed(() => {
                return widget.merged || (widget.options.colspan <= 1)
            }),
            undoMergeRowDisabled: computed(() => {
                return widget.merged || (widget.options.rowspan <= 1)
            }),
            deleteWholeColDisabled: computed(() => {
                return (colLength === 1) || (widget.options.colspan === colLength)
            }),
            deleteWholeRowDisabled: computed(() => {
                return (rowLength === 1) || (widget.options.rowspan === rowLength)
            }),
            selected: computed(() => props.widget.id === props.designer.selectedId),
            customClass: computed(() => widget.options.customClass || ''),
        })

        const tableActionDropdowns = ref([
            {
                label: designMixin.t('designer.setting.insertColumnToLeft'),
                key: 'insertLeftCol'
            },
            {
                label: designMixin.t('designer.setting.insertColumnToRight'),
                key: 'insertRightCol'
            },
            {
                label: designMixin.t('designer.setting.insertRowAbove'),
                key: 'insertAboveRow'
            },
            {
                label: designMixin.t('designer.setting.insertRowBelow'),
                key: 'insertBelowRow'
            },
            {
                type: 'divider',
                key: 'd1'
            },
            {
                label: designMixin.t('designer.setting.mergeEntireColumn'),
                key: 'mergeWholeCol',
                disabled: data.mergeWholeColDisabled,
            },
            {
                label: designMixin.t('designer.setting.mergeLeftColumn'),
                key: 'mergeLeftCol',
                disabled: data.mergeLeftColDisabled,
            },
            {
                label: designMixin.t('designer.setting.mergeRightColumn'),
                key: 'mergeRightCol',
                disabled: data.mergeRightColDisabled,
            },
            {
                type: 'divider',
                key: 'd2'
            },
            {
                label: designMixin.t('designer.setting.mergeEntireRow'),
                key: 'mergeWholeRow',
                disabled: data.mergeLeftColDisabled,
            },
            {
                label: designMixin.t('designer.setting.mergeRowAbove'),
                key: 'mergeAboveRow',
                disabled: data.mergeAboveRowDisabled,
            },
            {
                label: designMixin.t('designer.setting.mergeRowBelow'),
                key: 'mergeBelowRow',
                disabled: data.mergeBelowRowDisabled,
            },
            {
                type: 'divider',
                key: 'd3'
            },
            {
                label: designMixin.t('designer.setting.undoMergeRow'),
                key: 'undoMergeRow',
                disabled: data.undoMergeRowDisabled,
            },
            {
                label: designMixin.t('designer.setting.undoMergeCol'),
                key: 'undoMergeCol',
                disabled: data.undoMergeColDisabled,
            },
            {
                type: 'divider',
                key: 'd4'
            },
            {
                label: designMixin.t('designer.setting.deleteEntireCol'),
                key: 'deleteWholeCol',
                disabled: data.deleteWholeColDisabled,
            },
            {
                label: designMixin.t('designer.setting.deleteEntireRow'),
                key: 'deleteWholeRow',
                disabled: data.deleteWholeRowDisabled,
            },
        ])

        const methods = {
            selectWidget(widget) {
                designer.setSelected(widget)
            },

            checkContainerMove(evt) {
                return designer.checkWidgetMove(evt)
            },

            onTableDragEnd(_obj, _subList) {
                //
            },

            onTableDragAdd(evt, subList) { //重复代码，可合并
                const newIndex = evt.newIndex
                if (!!subList[newIndex]) {
                    designer.setSelected(subList[newIndex])
                }

                designer.emitHistoryChange()
            },

            onTableDragUpdate() {
                designer.emitHistoryChange()
            },

            selectParentWidget() {
                if (parentWidget) {
                    designer.setSelected(parentWidget)
                } else {
                    designer.clearSelected()
                }
            },

            handleTableCellCommand(command) {
                if (command === 'insertLeftCol') {
                    methods.insertLeftCol()
                } else if (command === 'insertRightCol') {
                    methods.insertRightCol()
                } else if (command === 'insertAboveRow') {
                    methods.insertAboveRow()
                } else if (command === 'insertBelowRow') {
                    methods.insertBelowRow()
                } else if (command === 'mergeLeftCol') {
                    methods.mergeLeftCol()
                } else if (command === 'mergeRightCol') {
                    methods.mergeRightCol()
                } else if (command === 'mergeWholeCol') {
                    methods.mergeWholeCol()
                } else if (command === 'mergeAboveRow') {
                    methods.mergeAboveRow()
                } else if (command === 'mergeBelowRow') {
                    methods.mergeBelowRow()
                } else if (command === 'mergeWholeRow') {
                    methods.mergeWholeRow()
                } else if (command === 'undoMergeCol') {
                    methods.undoMergeCol()
                } else if (command === 'undoMergeRow') {
                    methods.undoMergeRow()
                } else if (command === 'deleteWholeCol') {
                    methods.deleteWholeCol()
                } else if (command === 'deleteWholeRow') {
                    methods.deleteWholeRow()
                }
            },

            insertLeftCol() {
                designer.insertTableCol(parentWidget, colIndex, rowIndex, true)
            },

            insertRightCol() {
                designer.insertTableCol(parentWidget, colIndex, rowIndex, false)
            },

            insertAboveRow() {
                designer.insertTableRow(parentWidget, rowIndex, rowIndex, colIndex, true)
            },

            insertBelowRow() {
                designer.insertTableRow(parentWidget, rowIndex, rowIndex, colIndex, false)
            },

            mergeLeftCol() {
                designer.mergeTableCol(rowArray, colArray, rowIndex, colIndex, true, widget)
            },

            mergeRightCol() {
                designer.mergeTableCol(rowArray, colArray, rowIndex, colIndex, false, widget)
            },

            mergeWholeRow() {
                designer.mergeTableWholeRow(rowArray, colArray, rowIndex, colIndex)
            },

            mergeAboveRow() {
                designer.mergeTableRow(rowArray, rowIndex, colIndex, true, widget)
            },

            mergeBelowRow() {
                designer.mergeTableRow(rowArray, rowIndex, colIndex, false, widget)
            },

            mergeWholeCol() {
                designer.mergeTableWholeCol(rowArray, colArray, rowIndex, colIndex)
            },

            undoMergeCol() {
                designer.undoMergeTableCol(rowArray, rowIndex, colIndex,
                    widget.options.colspan, widget.options.rowspan)
            },

            undoMergeRow() {
                designer.undoMergeTableRow(rowArray, rowIndex, colIndex,
                    widget.options.colspan, widget.options.rowspan)
            },

            deleteWholeCol() {
                designer.deleteTableWholeCol(rowArray, colIndex)
            },

            deleteWholeRow() {
                designer.deleteTableWholeRow(rowArray, rowIndex)
            },
        }

        // 初始化
        designMixin.initRefList()

        return {
            ...toRefs(data),
            ...designMixin,
            ...methods,
            upperFirst,
            tableActionDropdowns
        }
    }
})
</script>


<style lang="less" scoped>
.table-cell {
    //padding: 3px;
    border: 1px dashed #336699;
    display: table-cell;
    position: relative;

    .draggable-div {
        position: relative;
        height: 100%;
    }

    .form-widget-list {
        border: 1px dashed #336699;
        margin: 3px;
        min-height: 28px;
        //height: 100%;
    }

    .table-cell-action {
        position: absolute;
        //bottom: -30px;
        bottom: -2px;
        right: -2px;
        background: var(--app-primary-color);
        z-index: 999;
    }

    .table-cell-handler {
        position: absolute;
        top: -2px;
        //bottom: -24px;  /* 拖拽手柄位于组件下方，有时无法正常拖动，原因未明？？ */
        left: -2px;
        background: var(--app-primary-color);
        z-index: 9;
    }

}

.table-cell-action,
.table-cell-handler {
    :deep(.svg-icon) {
        margin-left: 0.1em;
        margin-right: 0.1em;
    }
}

.table-cell.selected {
    outline: 2px solid var(--app-primary-color) !important;
}
</style>
