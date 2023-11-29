<template>
    <n-form-item :label="t('designer.setting.cellWidth')" :show-feedback="false" size="small">
        <n-input v-model:value="(optionModel as any).cellWidth" :placeholder="t('designer.setting.cellWidth')" />
    </n-form-item>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { usePropertyMixin } from '../propertyMixin'

export default defineComponent({
    name: "CellWidthEditor",
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
        return {
            ...toRefs(data),
            ...propertyMixin,
        }
    }
});
</script>