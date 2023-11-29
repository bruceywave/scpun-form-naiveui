<template>
    <s-form-item-wrapper :designer="designer" :field="field" :rules="rules" :design-state="designState"
        :parent-widget="parentWidget" :parent-list="parentList" :index-of-parent-list="indexOfParentList"
        :sub-form-row-index="subFormRowIndex" :sub-form-col-index="subFormColIndex" :sub-form-row-id="subFormRowId">
        <n-time-picker ref="fieldEditor" style="width: 100%;" v-model:value="fieldModel" :clearable="field.options.clearable"
            :default-value="field.options.defaultValue" :input-readonly="field.options.readonly"
            :disabled="designState ? true : field.options.disabled" :placeholder="field.options.placeholder"
            :size="field.options.size" :actions="field.options.actions" :hours="field.options.hours"
            :minutes="field.options.meinus" :seconds="field.options.seconds" :use-12-hours="field.options.use12Hours"
            :time-zone="field.options.timeZone" @focus="handleFocusCustomEvent" @blur="handleBlurCustomEvent"
                    @update:value="handleChangeEvent">
        </n-time-picker>
    </s-form-item-wrapper>
</template>

<script lang="ts">
import useFieldMixin from './useFieldMixin'

export default defineComponent({
    name: 'SFormTimeWidget',
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

        const data = reactive({
            oldFieldValue: null, //field组件change之前的值
            fieldModel: null,
            rules: [],
        })

         /* 注意：子组件mounted在父组件created之后、父组件mounted之前触发，故子组件mounted需要用到的prop
        需要在父组件created中初始化！！ */
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
            ...fieldMixins,
        }
    }
})
</script>