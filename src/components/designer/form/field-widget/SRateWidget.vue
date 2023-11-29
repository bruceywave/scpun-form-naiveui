<template>
    <s-form-item-wrapper :designer="designer" :field="field" :rules="rules" :design-state="designState"
        :parent-widget="parentWidget" :parent-list="parentList" :index-of-parent-list="indexOfParentList"
        :sub-form-row-index="subFormRowIndex" :sub-form-col-index="subFormColIndex" :sub-form-row-id="subFormRowId">
        <n-rate ref="fieldEditor" v-model:value="fieldModel" 
            :default-value="field.options.defaultValue"
            :size="widgetSize" 
            :allow-half="field.options.allowHalf"
            :clearable="field.options.clearable"
            :color="field.options.color"
            :count="field.options.count"
            :readonly="designState ? true: field.options.readonly"
            @update-value="handleChangeEvent">
        </n-rate>
    </s-form-item-wrapper>
</template>

<script lang="ts">
import useFieldMixin from './useFieldMixin';

export default defineComponent({
    name: 'SFormRateWidget',
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
    },
    setup(props, context) {
        const data = reactive({
            oldFieldValue: null, //field组件change之前的值
            fieldModel: undefined,
            rules: [],
        })
        const fieldMixins = useFieldMixin(props, context)


        // 初始化操作
        fieldMixins.initOptionItems(false)
        fieldMixins.initFieldModel()
        fieldMixins.registerToRefList(false)
        fieldMixins.initEventHandler()
        fieldMixins.buildFieldRules()
        fieldMixins.handleOnCreated()



        onMounted(() => {
            fieldMixins.handleOnMounted()
        })

        onBeforeUnmount(() => {
            fieldMixins.unregisterFromRefList()
        })
        return {
            ...toRefs(data),
            ...fieldMixins
        }
    }
})
</script>