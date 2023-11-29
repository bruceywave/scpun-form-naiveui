<template>
    <s-form-item-wrapper :designer="designer" :field="field" :rules="rules" :design-state="designState"
        :parent-widget="parentWidget" :parent-list="parentList" :index-of-parent-list="indexOfParentList"
        :sub-form-row-index="subFormRowIndex" :sub-form-col-index="subFormColIndex" :sub-form-row-id="subFormRowId">
        <n-radio-group ref="fieldEditor" v-model:value="fieldModel" :disabled="designState ? true : field.options.disabled"
            :size="field.options.size" @update-value="handleChangeEvent">
            <template v-if="!!field.options.buttonStyle">
                <n-radio-button v-for="(item, index) in field.options.optionItems" :key="index" :value="item.value"
                    :disabled="designState ? true : field.options.disabled">
                    {{ item.label }}
                </n-radio-button>
            </template>
            <template v-else>
                <n-radio v-for="(item, index) in field.options.optionItems" :key="index" :value="item.value"
                    :disabled="designState ? true : field.options.disabled">
                    {{ item.label }}
                </n-radio>
            </template>
        </n-radio-group>
    </s-form-item-wrapper>
</template>

<script lang="ts">
import useFieldMixin from './useFieldMixin';

export default defineComponent({
    name: 'SFormRadioWidget',
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
            fieldModel: null,
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