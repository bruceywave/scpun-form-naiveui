<template>
    <n-form-item :label="t('designer.setting.gridColHeight')" :show-feedback="false" size="small">
        <n-input-number v-model:value="(optionModel as any).colHeight" min="0" :placeholder="t('designer.setting.gridColHeight')"/>
    </n-form-item>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { usePropertyMixin } from '../propertyMixin'

export default defineComponent({
    name: "ColHeightEditor",
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