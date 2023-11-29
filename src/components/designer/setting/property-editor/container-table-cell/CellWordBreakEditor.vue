<template>
    <n-form-item :label="t('designer.setting.wordBreak')" :show-feedback="false" size="small">
        <n-switch v-model:value="(optionModel as any).wordBreak" />
    </n-form-item>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { usePropertyMixin } from '../propertyMixin'

export default defineComponent({
    name: "CellWordBreakEditor",
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