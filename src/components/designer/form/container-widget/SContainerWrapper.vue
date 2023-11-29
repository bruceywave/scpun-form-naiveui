<template>
    <div class="container-wrapper" :class="[customClass]">
        <slot></slot>

        <div class="container-action" v-if="designer.selectedId === widget.id && !widget.internal">
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
                    <ArrowDownOutlined />
                </n-icon>
            </n-button>
            <n-button v-if="widget.type === 'table'" size="tiny" type="primary" @click.stop="appendTableRow(widget)">
                <n-icon>
                    <InsertRowAboveOutlined />
                </n-icon>
            </n-button>
            <n-button v-if="widget.type === 'table'" size="tiny" type="primary" @click.stop="appendTableCol(widget)">
                <n-icon>
                    <InsertRowLeftOutlined />
                </n-icon>
            </n-button>
            <n-button v-if="widget.type === 'grid' || widget.type === 'table'" size="tiny" type="primary" @click.stop="cloneContainer(widget)">
                <n-icon>
                    <CopyOutlined />
                </n-icon>
            </n-button>
            <n-button v-if="widget.type === 'grid' || widget.type === 'table'" size="tiny" type="primary" @click.stop="removeWidget()">
                <n-icon>
                    <DeleteOutlined />
                </n-icon>
            </n-button>
        </div>

        <div class="drag-handler" v-if="designer.selectedId === widget.id && !widget.internal">
            <n-button size="tiny" type="primary">
                <n-icon size="14">
                    <Move />
                </n-icon>
                <i>{{ t("designer.widgetLabel." + widget.type) }}</i>
            </n-button>
        </div>
    </div>
</template>

<script lang="ts">
import useContainerMixin from './useContainerMixin';
import {
    ArrowLeftOutlined,
    ArrowUpOutlined,
    ArrowDownOutlined,
    InsertRowAboveOutlined,
    InsertRowLeftOutlined,
    CopyOutlined,
    DeleteOutlined
} from '@vicons/antd'
import { Move } from '@vicons/ionicons5'

export default defineComponent({
    name: "SContainerWrapper",
    components: {
        ArrowLeftOutlined,
        ArrowUpOutlined,
        ArrowDownOutlined,
        InsertRowAboveOutlined,
        InsertRowLeftOutlined,
        CopyOutlined,
        DeleteOutlined,
        Move
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
        const containerMixins = useContainerMixin(props, context)

        return {
            ...containerMixins
        }
    }
})
</script>


<style lang="less" scoped>
.container-wrapper {
    position: relative;
    margin-bottom: 5px;

    .container-action {
        position: absolute;
        //bottom: -30px;
        bottom: 0;
        right: 0px;
        height: 28px;
        line-height: 32px;
        background: var(--app-primary-color);
        z-index: 999;
    }

    .drag-handler {
        position: absolute;
        top: -2px;
        //bottom: -24px;  /* 拖拽手柄位于组件下方，有时无法正常拖动，原因未明？？ */
        left: 0px;
        padding: 3px;
        background: var(--app-primary-color);
        z-index: 9;

        i {
            line-height: 18px;
            color: #fff;
            cursor: move;
        }
    }
}
</style>