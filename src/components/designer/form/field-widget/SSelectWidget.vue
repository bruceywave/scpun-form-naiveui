<template>
     <s-form-item-wrapper :designer="designer" :field="field" :rules="rules" :design-state="designState"
        :parent-widget="parentWidget" :parent-list="parentList" :index-of-parent-list="indexOfParentList"
        :sub-form-row-index="subFormRowIndex" :sub-form-col-index="subFormColIndex" :sub-form-row-id="subFormRowId">

        <!-- 目前还不完善，只是简单的配置 -->
        <n-select ref="fieldEditor" v-model:value="fieldModel" :disabled="designState ? true : field.options.disabled"
            :clearable="field.options.clearable"
            :filterable="field.options.filterable"
            :multiple="field.options.multiple"
            :max-tag-count="field.options.maxTagCount"
            :placeholder="field.options.placeholder"
            :remote="field.options.remote"
            :options="field.options.optionItems"
            :label-field="field.options.labelField"
            :value-field="field.options.valueField"
            :children-field="field.options.childrenField"
            :show="field.options.show"
            :show-arrow="field.options.showArrow"
            :show-checkmark="field.options.showCheckmark"
            :size="widgetSize" @update-value="handleChangeEvent">

        </n-select>
    </s-form-item-wrapper>
</template>

<script lang="ts">
import useFieldMixin from './useFieldMixin';

export default defineComponent({
    name: 'SFormSelectWidget',
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
        const fieldMixins = useFieldMixin(props, context)

        const { field } = props

        const data = reactive({
            oldFieldValue: null, //field组件change之前的值
            fieldModel: null,
            rules: [],
            allowDefaultFirstOption: computed(() => (!!field.options.filterable && !!field.options.allowCreate)),
            remoteMethod: computed(() => {
                if (!!field.options.remote && !!field.options.onRemoteQuery) {
                    return fieldMixins.remoteQuery
                } else {
                    return undefined
                }
            })
        })

        /* 注意：子组件mounted在父组件created之后、父组件mounted之前触发，故子组件mounted需要用到的prop
        需要在父组件created中初始化！！ */
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
            ...fieldMixins,
        }
    }
})
</script>