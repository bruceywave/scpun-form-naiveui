<template>
    <div class="field-wrapper" :class="{ 'design-time-bottom-margin': !!designer }" :style="{ display: displayStyle }">
        <div class="static-content-item" v-if="!field.options.hidden || (designState === true)"
            :style="{ display: displayStyle }" :class="[selected ? 'selected' : '', customClass]"
            @click.stop="selectField(field)">
            <slot></slot>
        </div>

        <template v-if="!!designer">
            <div class="field-action" v-if="designer.selectedId === field.id">
                <n-button size="tiny" type="primary" :title="t('designer.hint.selectParentWidget')"
                    @click.stop="selectParentWidget()">
                    <n-icon>
                        <ArrowLeftOutlined />
                    </n-icon>
                </n-button>
                <n-button v-if="!!parentList && (parentList.length > 1)" size="tiny" type="primary"
                    :title="t('designer.hint.moveUpWidget')" @click.stop="moveUpWidget()">
                    <n-icon>
                        <ArrowUpOutlined />
                    </n-icon>
                </n-button>
                <n-button v-if="!!parentList && (parentList.length > 1)" size="tiny" type="primary"
                    :title="t('designer.hint.moveDownWidget')" @click.stop="moveDownWidget()">
                    <n-icon>
                        <ArrowUpOutlined />
                    </n-icon>
                </n-button>
                <n-button size="tiny" type="primary" :title="t('designer.hint.remove')" @click.stop="removeFieldWidget">
                    <n-icon>
                        <DeleteOutlined />
                    </n-icon>
                </n-button>
            </div>

            <div class="drag-handler background-opacity" v-if="designer.selectedId === field.id">
                <n-button size="tiny" type="primary">
                    <n-icon size="14">
                        <Move />
                    </n-icon>
                    <i>{{ t("designer.widgetLabel." + field.type) }}</i>
                </n-button>
                <n-button v-if="field.options.hidden === true" size="tiny" type="primary">
                    <n-icon size="14">
                        <EyeInvisibleOutlined />
                    </n-icon>
                    <i>{{ t("designer.widgetLabel." + field.type) }}</i>
                </n-button>
            </div>
        </template>
    </div>
</template>

<script lang="ts">
import { useI18n } from '/@/locale/useI18n'
import {
    ArrowLeftOutlined,
    ArrowUpOutlined,
    ArrowDownOutlined,
    EyeInvisibleOutlined,
    DeleteOutlined
} from '@vicons/antd'
import { Move } from '@vicons/ionicons5'
export default defineComponent({
    name: 'SStaticContentWrapper',
    components: {
        ArrowLeftOutlined,
        ArrowUpOutlined,
        ArrowDownOutlined,
        DeleteOutlined,
        EyeInvisibleOutlined,
        Move
    },
    props: {
        field: {
            type: Object,
            required: true,
        },
        designer: {
            type: Object,
            required: true,
        },
        parentWidget: Object,
        parentList: Array,
        indexOfParentList: {
            type: Number,
            required: true,
        },

        designState: {
            type: Boolean,
            default: false
        },

        displayStyle: {
            type: String,
            default: 'block'
        },

        subFormRowIndex: { /* 子表单组件行索引，从0开始计数 */
            type: Number,
            default: -1
        },
        subFormColIndex: { /* 子表单组件列索引，从0开始计数 */
            type: Number,
            default: -1
        },
        subFormRowId: { /* 子表单组件行Id，唯一id且不可变 */
            type: String,
            default: ''
        },
    },
    setup(props) {
        const { t } = useI18n()
        const { designer, field, parentWidget, parentList, indexOfParentList } = props
        const data = reactive({
            selected: computed(() => !!designer && field.id === designer.selectedId),
            customClass: computed(() => !!field.options.customClass ? field.options.customClass.join(' ') : '')
        })

        const methods = {
            selectField(field) {
                if (!!designer) {
                    designer.setSelected(field)
                    designer.emitEvent('field-selected', parentWidget)  //发送选中组件的父组件对象
                }
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
                designer.emitHistoryChange()
            },

            moveDownWidget() {
                designer.moveDownWidget(parentList, indexOfParentList)
                designer.emitHistoryChange()
            },

            removeFieldWidget() {
                if (!!parentList) {
                    const fieldRefName = designer.selectedWidgetName
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
                        designer.setSelected(nextSelected)

                        designer.formWidget.deleteWidgetRef(fieldRefName)  //删除组件ref！！！
                        designer.emitHistoryChange()
                    })
                }
            },
        }

        return {
            ...toRefs(data),
            ...methods,
            t
        }
    }
})
</script>


<style lang="less" scoped>

.design-time-bottom-margin {
    margin-bottom: 5px;
}

.field-wrapper {
    position: relative;

    .field-action {
        position: absolute;
        //bottom: -24px;
        bottom: 0;
        right: -2px;
        height: 22px;
        line-height: 22px;
        background: var(--app-primary-color);
        z-index: 9;
    }

    .drag-handler {
        position: absolute;
        top: 0;
        //bottom: -22px;  /* 拖拽手柄位于组件下方，有时无法正常拖动，原因未明？？ */
        left: -1px;
        height: 20px;
        line-height: 20px;
        //background: $--color-primary;
        z-index: 9;

        &:hover {
            //opacity: 1;
            background: var(--app-primary-color);
        }
    }
}

.field-action,
.drag-handler {
    :deep(.svg-icon) {
        margin-left: 0.1em;
        margin-right: 0.1em;
    }
}

.static-content-item {
    min-height: 20px;
    display: flex;
    /* 垂直居中 */
    align-items: center;
    /* 垂直居中 */

    :deep(.el-divider--horizontal) {
        margin: 0;
    }
}

.n-form-item.selected,
.static-content-item.selected {
    outline: 2px solid var(--app-primary-color);
}</style>