<!-- 静态表格组件 -->
<template>
    <s-container-wrapper :designer="designer" :widget="widget" :parent-widget="parentWidget" :parent-list="parentList"
        :index-of-parent-list="indexOfParentList">
        <div :key="widget.id" class="table-container" :class="[selected ? 'selected' : '', customClass]"
            @click.stop="selectWidget(widget)">
            <table class="table-layout">
                <tbody>
                    <tr v-for="(row, rowIdx) in widget.rows" :key="row.id">
                        <template v-for="(colWidget, colIdx) in row.cols">
                            <s-table-cell-widget v-if="!colWidget.merged" :widget="colWidget" :designer="designer"
                                :key="colWidget.id" :parent-list="widget.cols" :row-index="rowIdx"
                                :row-length="widget.rows.length" :col-index="colIdx" :col-length="row.cols.length"
                                :col-array="row.cols" :row-array="widget.rows" :parent-widget="widget" />
                        </template>
                    </tr>
                </tbody>
            </table>
        </div>
    </s-container-wrapper>
</template>

<script lang="ts">
import { useDesignMixin } from '../../useDesignMixin';
import useContainerMixin from './useContainerMixin';

export default defineComponent({
    name: 'STableWidget',
    props: {
        widget: {
            type: Object,
            required: true
        },
        parentWidget: {
            type: Object,
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
    },
    setup(props, context) {
        const containerMixins = useContainerMixin(props, context)
        const designMixin = useDesignMixin(props, context)

        designMixin.initRefList()

        return {
            ...designMixin,
            ...containerMixins
        }
    }
})
</script>

<style lang="less" scoped>
div.table-container {
    padding: 5px;
    border: 1px dashed #336699;
    box-sizing: border-box;

    table.table-layout {
        width: 100%;
        //border: 1px solid #c8ebfb;
        border-collapse: collapse;
        table-layout: fixed;

        :deep(td) {
            height: 48px;
            border: 1px dashed #336699;
            padding: 3px;
            display: table-cell;
        }

        .form-widget-list {
            border: 1px dashed #336699;
            min-height: 36px;
        }
    }
}

.table-container.selected {
    outline: 2px solid var(--app-primary-color) !important;
}
</style>
