<template>
    <s-static-content-wrapper :designer="designer" :field="field" :rules="rules" :design-state="designState"
        :parent-widget="parentWidget" :parent-list="parentList" :index-of-parent-list="indexOfParentList"
        :sub-form-row-index="subFormRowIndex" :sub-form-col-index="subFormColIndex" :sub-form-row-id="subFormRowId">
        <n-button ref="fieldEditor" :type="field.options.type" :dashed="field.options.dashed"
            :attr-type="field.options.attrType" :block="field.options.block" :bordered="field.options.bordered"
            :circle="field.options.circle" :color="field.options.color"
            :disabled="designState ? true : field.options.disabled" :focusable="field.options.focusable"
            :ghost="field.options.ghost" :icon-placement="field.options.iconPlacement" :keyboard="field.options.keyboard"
            :quaternary="field.options.quaternary" :round="field.options.round" :size="widgetSize"
            :secondary="field.options.secondary" :strong="field.options.strong" :tertiary="field.options.tertiary"
            :text="field.options.text" :text-color="field.options.textColor">
            <template v-if="field.options.buttonIcon" #icon>
                <div style="display: none;">按钮图标暂时不做处理</div>
            </template>
            {{ field.options.label }}
        </n-button>
    </s-static-content-wrapper>
</template>

<script lang="ts">
import useFieldMixin from './useFieldMixin';

export default defineComponent({
    name: 'SFormButtonWidget',
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
    setup(props, context) {
        const fieldMixins = useFieldMixin(props, context)


        fieldMixins.registerToRefList(false)
        fieldMixins.initEventHandler()

        fieldMixins.handleOnCreated()

        onMounted(() => {
            fieldMixins.handleOnMounted()
        })

        onBeforeUnmount(() => {
            fieldMixins.unregisterFromRefList()
        })

        return {
            ...fieldMixins
        }
    }
})
</script>