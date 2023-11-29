<template>
     <s-form-item-wrapper :designer="designer" :field="field" :rules="rules" :design-state="designState"
                     :parent-widget="parentWidget" :parent-list="parentList" :index-of-parent-list="indexOfParentList"
                     :sub-form-row-index="subFormRowIndex" :sub-form-col-index="subFormColIndex" :sub-form-row-id="subFormRowId">
        <n-input-number ref="fieldEditor" v-model:value="fieldModel"
            :disabled="designState? true: field.options.disabled"
            :size="field.options.size"
            :clearable="field.options.clearable"
            :placeholder="field.options.placeholder"
            :min="field.options.min"
            :max="field.options.max"
            :precision="field.options.precision"
            :step="field.options.step"
            :show-button="field.options.showButton"
            :default-value="field.options.defaultValue"
            :button-placement="field.options.buttonPlacement"
            @focus="handleFocusCustomEvent" 
            @blur="handleBlurCustomEvent"
            @update:value="handleChangeEvent">

        </n-input-number>
    </s-form-item-wrapper>
</template>

<script lang="ts">
import useFieldMixin from './useFieldMixin';

export default defineComponent({
    name: 'SFormNumberWidget',
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
        const data = reactive({
            oldFieldValue: null, //field组件change之前的值
            fieldModel: null,
            rules: [],
        })

        const fieldMixins = useFieldMixin(props, context)

        return {
            ...toRefs(data),
            ...fieldMixins
        }
    }
})
</script>