<template>
    <draggable tag="div" item-key="key" ghostClass="ghost" :group="{ name: 'dragGroup', pull: 'clone', put: false }"
        :sort="false" :list="list" class="widget-layout" :move="move" @end="handleDragEnd"
        :clone="clone">
        <template #item="{ element }">
            <div class="widget-layout-item" @dblclick="handleDbclick(element)">
                <div class="widget-layout-item__icon">
                    <n-icon-wrapper :size="32" color="#eeddaa">
                        <n-icon :size="24">
                            <SvgIcon :type="element.icon" />
                        </n-icon>
                    </n-icon-wrapper>
                </div>
                <div class="widget-layout-item__name">
                    <n-ellipsis>
                        {{ element.displayName }}
                    </n-ellipsis>
                </div>
            </div>
        </template>
    </draggable>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Draggable from 'vuedraggable'
import SvgIcon from '../../SvgIcon.vue'

export default defineComponent({
    name: 'SWidgetDraggableGroup',
    components: {
        Draggable,
        SvgIcon
    },
    props: {
        list: {
            type: Array,
            required: true,
            default: () => []
        },
        move: {
            type: Function,
            default: Object as PropType<any>,
        },
        clone: {
            type: Function,
            default: (_original: any) => Object as PropType<any>,
        }

    },
    emits: ['end', 'dbclick'],
    setup(_props, context) {

        const methods = {
            handleDragEnd(evt) {
                context.emit("end", evt)
            },
            handleDbclick(element) {
                context.emit("dbclick", element)
            }
        }

        return {
            ...methods
        }
    }
})
</script>

<style lang="less">
div.widget-layout {
    padding: 5px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;

    div.widget-layout-item {
        width: 58px;
        height: 60px;
        margin: 1px;
        text-align: center;
        border: 1px solid var(--n-border-color);

        &:hover {
            border-style: solid;
            border-width: 1px;
            border-color: var(--app-primary-color);
            color: var(--app-text-color-base);
            cursor: move;

            .n-icon-wrapper{
                background-color: var(--app-primary-color) !important;
            }
        }

       


        .widget-layout-item__icon {
            height: 38px;
            padding: 5px;
        }

        .widget-layout-item__name {
            font-size: 8px;
            padding: 2px;
            height: 25px;
        }
    }

}
</style>