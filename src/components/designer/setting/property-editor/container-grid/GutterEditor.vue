<template>
    <n-form-item :label-width="0" :show-feedback="false" size="small">
        <n-divider>
            {{ t('designer.setting.columnSetting') }}
        </n-divider>
    </n-form-item>
    <n-form-item :label="t('designer.setting.gutter')" :show-feedback="false" size="small">
        <n-input-number v-model:value="(optionModel as any).gutter" min="0" :placeholder="t('designer.setting.gutter')" />
    </n-form-item>
    <n-form-item :label="t('designer.setting.colSpanTitle')" :show-feedback="false" size="small">
        <n-space vertical>
            <n-input-group v-for="( colItem, colIdx ) in  selectedWidget.cols " :key="colIdx">
                <n-input-number v-model:value="colItem.options.span" :min="1" :max="24" @update:value="spanChanged"
                    class="cell-span-input" :show-button="false"
                    :placeholder="t('designer.setting.colSpanTitle') + (colIdx + 1)" />
                <n-button-group size="small">
                    <n-button>
                        <n-icon>
                            <plus-outlined />
                        </n-icon>
                    </n-button>
                    <!--第一列不能有删除 -->
                    <n-button v-if="colIdx != 0">
                        <n-icon>
                            <minus-outlined />
                        </n-icon>
                    </n-button>
                </n-button-group>
            </n-input-group>
        </n-space>
    </n-form-item>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { usePropertyMixin } from '../propertyMixin'

import {
    PlusOutlined,
    MinusOutlined
} from '@vicons/antd'

export default defineComponent({
    name: "GutterEditor",
    components: {
        PlusOutlined,
        MinusOutlined
    },
    props: {
        designer: {
            type: Object,
            required: true
        },
        selectedWidget: {
            type: Object,
            required: true
        },
        optionModel: {
            type: Object,
            required: true
        },
    },
    setup(props, context) {
        const propertyMixin = usePropertyMixin(props, context)
        const data = reactive({})

        const { designer, selectedWidget } = props

        const methods = {
            spanChanged(_newValue) {
                let spanSum = 0
                const curGrid = selectedWidget
                curGrid.cols.forEach((colItem) => {
                    spanSum += colItem.options.span
                })
                if (spanSum > 24) {
                    //$message.info('列栅格之和超出24')
                    console.log('列栅格之和超出24')
                    //TODO: 语言字符串资源化
                }
                designer.saveCurrentHistoryStep()
            },

            deleteCol(curGrid, colIdx) {
                designer.deleteColOfGrid(curGrid, colIdx)
                designer.emitHistoryChange()
            },

            addNewCol(curGrid) {
                designer.addNewColOfGrid(curGrid)
                designer.emitHistoryChange()
            },
        }
        return {
            ...toRefs(data),
            ...propertyMixin,
            ...methods
        }
    }
});
</script>

<style lang="less">
.n-divider:not(.n-divider--vertical) {
    margin: 0
}
</style>
