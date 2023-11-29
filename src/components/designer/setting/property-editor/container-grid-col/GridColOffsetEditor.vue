<template>
    <n-form-item :label="t('designer.setting.colOffsetTitle')" :show-feedback="false" size="small">
        <n-input-number v-model:value="(optionModel as any).offset" :min="0" :max="24" :placeholder="t('designer.setting.colOffsetTitle')"/>
    </n-form-item>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { usePropertyMixin } from '../propertyMixin'

export default defineComponent({
    name: "OffsetRditor",
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