<template>
    <n-form-item :label="t('designer.setting.colPullTitle')" :show-feedback="false" size="small">
        <n-input-number v-model:value="(optionModel as any).pull" :min="0" :max="24" :placeholder="t('designer.setting.colPullTitle')"/>
    </n-form-item>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { usePropertyMixin } from '../propertyMixin'

export default defineComponent({
    name: "PullEditor",
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