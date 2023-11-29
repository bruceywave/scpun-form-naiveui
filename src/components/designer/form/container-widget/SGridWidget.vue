<template>
    <s-container-wrapper :designer="designer" :widget="widget" :parent-widget="parentWidget" :parent-list="parentList"
        :index-of-parent-list="indexOfParentList">
        <n-row :key="widget.id" :gutter="widget.options.gutter" class="grid-container"
            :class="[selected ? 'selected' : '', customClass]" @click.stop="selectWidget(widget)">
            <template v-for="(colWidget, colIdx) in widget.cols" :key="colWidget.id">
                <s-grid-col-widget :widget="colWidget" :designer="designer" :parent-list="widget.cols"
                    :index-of-parent-list="colIdx" :parent-widget="widget" :col-height="widget.options.colHeight" />
            </template>
        </n-row>
    </s-container-wrapper>
</template>

<script lang="ts">
import { useDesignMixin } from '../../useDesignMixin';
import useContainerMixin from './useContainerMixin';

export default defineComponent({
    name: 'SGridWidget',
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
.n-row.grid-container {
    min-height: 50px;
    width: 100% !important;
    margin: 0 !important;
    //line-height: 48px;
    //padding: 6px;
    outline: 1px dashed var(--app-border-color);

    .form-widget-list {
        min-height: 28px;
    }

}

.grid-container.selected,
.grid-cell.selected {
    outline: 2px solid var(--app-primary-color) !important;
}
</style>
