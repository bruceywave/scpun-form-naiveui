<template>
    <s-form-item-wrapper :designer="designer" :field="field" :rules="rules" :design-state="designState"
        :parent-widget="parentWidget" :parent-list="parentList" :index-of-parent-list="indexOfParentList"
        :sub-form-row-index="subFormRowIndex" :sub-form-col-index="subFormColIndex" :sub-form-row-id="subFormRowId">
        <n-checkbox-group ref="fieldEditor" v-model:value="fieldModel"
            :disabled="designState ? true : field.options.disabled" :size="field.options.size"
            @update-value="handleChangeEvent">
            <n-checkbox v-for="(item, index) in field.options.optionItems" :key="index" v-model:checked="item.value"
                :disabled="designState ? true : field.options.disabled">
                {{ item.label }}
            </n-checkbox>
        </n-checkbox-group>
    </s-form-item-wrapper>
</template>

<script lang="ts">
import useFieldMixin from './useFieldMixin';

export default defineComponent({
    name: 'SFormCheckboxWidget',
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

        const data = reactive({
            oldFieldValue: null, //field组件change之前的值
            fieldModel: null,
            rules: [],
        })

        const methods = {

        }

        /* 注意：子组件mounted在父组件created之后、父组件mounted之前触发，故子组件mounted需要用到的prop
         需要在父组件created中初始化！！ */
        fieldMixins.initOptionItems(undefined)
        fieldMixins.initFieldModel()
        fieldMixins.registerToRefList(undefined)
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
            ...fieldMixins,
            ...toRefs(data),
            ...methods,
        }
    }

})
</script>