<template>
    <div class="field-wrapper" :class="{ 'design-time-bottom-margin': !!designer }">
        <n-form-item v-if="!!field.formItemFlag && (!field.options.hidden || (designState === true))" :label="label"
            :label-width="labelWidth" :size="field.options.size" :rule="rules" :path="getPropName()" :show-feedback="false"
            :class="[selected ? 'selected' : '', labelAlign, customClass, field.options.required ? 'required' : '']"
            :show-label="field.options.showLabel"
            :show-require-mark="field.options.showRequireMark"
            :require-mark-placement="field.options.requireMarkPlacement"
            @click.stop="selectField(field)">
            <!-- 定义label 暂时不做处理 -->
            <slot></slot>
        </n-form-item>

        <template v-if="!!designer">
            <div class="field-action" v-if="designer.selectedId === field.id" @click.stop="removeFieldWidget()">
                <n-button-group>
                    <n-button size="tiny" type="primary" @click.stop="selectParentWidget()">
                        <template #icon>
                            <n-icon>
                                <ArrowLeftOutlined />
                            </n-icon>
                        </template>
                    </n-button>
                    <n-button size="tiny" type="primary" v-if="!!parentList && parentList.length > 1"
                        @click.stop="moveUpWidget()">
                        <template #icon>
                            <n-icon>
                                <ArrowUpOutlined />
                            </n-icon>
                        </template>
                    </n-button>
                    <n-button size="tiny" type="primary" v-if="!!parentList && parentList.length > 1"
                        @click.stop="moveDownWidget()">
                        <template #icon>
                            <n-icon>
                                <ArrowDownOutlined />
                            </n-icon>
                        </template>
                    </n-button>
                    <n-button size="tiny" type="primary" @click.stop="removeFieldWidget()">
                        <template #icon>
                            <n-icon>
                                <DeleteOutlined />
                            </n-icon>
                        </template>
                    </n-button>
                </n-button-group>
            </div>

            <div class="drag-handler background-opacity" v-if="designer.selectedId === field.id">
                <n-button size="tiny" type="primary">
                    <template #icon>
                        <n-icon>
                            <Move />
                        </n-icon>
                    </template>
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
    DeleteOutlined
} from '@vicons/antd'
import { Move } from '@vicons/ionicons5'

export default defineComponent({
    name: 'SFormItemWrapper',
    components: {
        ArrowLeftOutlined,
        ArrowUpOutlined,
        ArrowDownOutlined,
        DeleteOutlined,
        Move
    },
    props: {
        field: {
            type: Object,
            required: true
        },
        designer: {
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
            default: 0
        },
        designState: {
            type: Boolean,
            default: false
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
        rules: Array,
    },
    setup(props) {
        const { t } = useI18n()

        const { designer, field, parentWidget, parentList, indexOfParentList, designState } = props

        const getFormConfig = inject('getFormConfig', () => { })

        const computeds = {
            formConfig: computed(() => getFormConfig()),
            selected: computed(() => !!designer && field.id === designer.selectedId),
            label: computed(() => {
                if (!!field.options.labelHidden) {
                    return ''
                }
                return field.options.label
            }),
            labelWidth: computed(() => {
                if (!!field.options.labelHidden) {
                    return 'auto'
                }

                if (!!field.options.labelWidth) {
                    return field.options.labelWidth
                }

                if (!!designer) {
                    return designer.formConfig.labelWidth
                } else {
                    return computeds.formConfig.labelWidth
                }
            }),
            labelAlign: computed(() => {
                if (!!field.options.labelAlign) {
                    return field.options.labelAlign
                }

                if (!!designer) {
                    return designer.formConfig.labelAlign || 'left'
                } else {
                    return computeds.formConfig.labelAlign || 'left'
                }
            }),
            customClass: computed(() => !!field.options.customClass ? field.options.customClass.join(' ') : ''),
            subFormName: computed(() => !!parentWidget ? parentWidget.options.name : ''),
            subFormItemFlag: computed(() => !!parentWidget ? parentWidget.type === 'sub-form' : false),
        }

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
                    let nextSelected;
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

            getPropName() {
                if (computeds.subFormItemFlag && !designState) {
                    return computeds.subFormName + "." + computeds.subFormRowIndex + "." + field.options.name + ""
                } else {
                    return field.options.name
                }
            },
        }

        return {
            ...computeds,
            ...methods,
            t,
        }
    }
})
</script>

<style lang="less" scoped>
.design-time-bottom-margin {
    margin-bottom: 10px;
}

.field-wrapper {
    position: relative;

    .field-action {
        content: "";
        position: absolute;
        bottom: 0px;
        right: 0;
        height: 22px;
        display: flex;
        align-items: center;
        justify-content: start;
        background: var(--app-primary-color);
        z-index: 9;

        span,
        i {
            display: block;
            font-size: 14px;
            color: #fff;
            margin: 0 3px;
            cursor: pointer;
        }
    }

    .drag-handler {
        position: absolute;
        top: 0px;
        //bottom: -22px;  /* 拖拽手柄位于组件下方，有时无法正常拖动，原因未明？？ */
        left: -1px;
        display: flex;
        align-items: center;
        justify-content: start;
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
        margin-left: 0;
        margin-right: 0;
    }
}

.n-form-item {
    //margin-bottom: 0 !important;
    //margin-bottom: 6px;

    //margin-top: 2px;
    position: relative;

    :deep(.n-form-item__label) {
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    span.custom-label i {
        margin: 0 3px;
    }
}

.required :deep(.n-form-item__label)::before {
    content: '*';
    color: #F56C6C;
    margin-right: 4px;
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
}
</style>