<!-- 选项卡组件 -->
<template>
    <s-container-wrapper :designer="designer" :widget="widget" :parent-widget="parentWidget" :parent-list="parentList"
        :index-of-parent-list="indexOfParentList">
        <div :key="widget.id" class="tab-container" :class="{ 'selected': selected }" @click.stop="selectWidget(widget)">
            <n-tabs :type="widget.displayType" :default-value="activeTab" @tab-click="onTabClick">
                <n-tab-pane v-for="(tab, index) in widget.tabs" :key="index" :tab="tab.options.label"
                    :name="tab.options.name" @click.stop="selectWidget(widget)">
                    <draggable :list="tab.widgetList" item-key="id" class="form-widget-list" 
                        v-bind="{ group: 'dragGroup', ghostClass: 'ghost', animation: 200 }" handle=".drag-handler"
                        @add="(evt) => onContainerDragAdd(evt, tab.widgetList)" @update="onContainerDragUpdate"
                        :move="checkContainerMove" :no-transition-on-drag="true">
                        <template #item="{ element: subWidget, index: swIdx }">
                            <transition-group name="fade" tag="div">
                                <template v-if="'container' === subWidget.category">
                                    <component :is="`S${upperFirst(widget.type)}Widget`" :widget="subWidget"
                                        :designer="designer" :key="subWidget.id" :parent-list="tab.widgetList"
                                        :index-of-parent-list="swIdx" :parent-widget="widget"></component>
                                </template>
                                <template v-else>
                                    <component :is="`SForm${upperFirst(subWidget.type)}Widget`" :field="subWidget"
                                        :designer="designer" :key="subWidget.id" :parent-list="tab.widgetList"
                                        :index-of-parent-list="swIdx" :parent-widget="widget" :design-state="true">
                                    </component>
                                </template>
                            </transition-group>
                        </template>
                    </draggable>
                </n-tab-pane>
            </n-tabs>
        </div>
    </s-container-wrapper>
</template>

<script lang="ts">
import { useDesignMixin } from '../../useDesignMixin';
import useContainerMixin from './useContainerMixin';
import Draggable from 'vuedraggable'
import FieldComponents from '../field-widget'
import { upperFirst } from 'lodash-es';
export default defineComponent({
    name: 'STabWidget',
    components: {
        Draggable,
        ...FieldComponents
    },
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
        const designMixin = useDesignMixin(props, context)
        const containerMixins = useContainerMixin(props, context)

        const { widget } = props

        const data = reactive({
            activeTab: 'tab1',
            selected: computed(() => props.widget.id === props.designer.selectedId),
            customClass: computed(() => widget.options.customClass || '')
        })

        const methods = {
            onTabClick(paneName) {
                widget.tabs.forEach((tp) => {
                    tp.options.active = tp.options.name === paneName;
                })
            },
        }

        // 初始化
        designMixin.initRefList()

        return {
            ...toRefs(data),
            ...containerMixins,
            ...designMixin,
            ...methods,
            upperFirst
        }
    }
})
</script>


<style lang="less" scoped>
.tab-container {
    //padding: 5px;
    margin: 2px;

    .form-widget-list {
        min-height: 28px;
    }

    :deep(.n-tab-pane) {
        min-height: 28px;
    }
}

.tab-container.selected {
    outline: 2px solid var(--app-primary-color) !important;
}
</style>
