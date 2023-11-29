<template>
    <s-form-item-wrapper :designer="designer" :field="field" :rules="rules" :design-state="designState"
                     :parent-widget="parentWidget" :parent-list="parentList" :index-of-parent-list="indexOfParentList"
                     :sub-form-row-index="subFormRowIndex" :sub-form-col-index="subFormColIndex" :sub-form-row-id="subFormRowId">
        <n-input ref="fieldEditor" v-model:value="fieldModel"
            :clearable="field.options.clearable"
            :default-value="field.options.defaultValue"
            :readonly="field.options.readonly"
            :disabled="designState ? true: field.options.disabled"
            :placeholder="field.options.placeholder"
            :round="field.options.round"
            :show-count="field.options.showCount"
            :size="field.options.size"
            :type="field.options.type">
        </n-input>            
    </s-form-item-wrapper>
</template>

<script lang="ts">
export default defineComponent({
    name: 'SFormInputWidget',
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
    setup() {
        const data = reactive({
            oldFieldValue: null, //field组件change之前的值
            fieldModel: null,
            rules: [],
        })

        return {
            ...toRefs(data)
        }
    }
})
</script>