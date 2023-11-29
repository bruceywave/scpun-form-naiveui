<template>
    <n-form-item :label="t('designer.setting.displayType')" :show-feedback="false" size="small">
        <n-select :options="typeOptions" v-model:value="(optionModel as any).type" :placeholder="t('designer.setting.displayType')"></n-select>
    </n-form-item>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { usePropertyMixin } from '../propertyMixin'

export default defineComponent({
    name: "ButtonTypeEditor",
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
        const types = ['default','tertiary' , 'primary' ,'success', 'info', 'warning' , 'error']
        const data = reactive({
            typeOptions: computed(() => {
                const options: any[] = []
                types.forEach(item => {
                    options.push({label: item, value: item} as any)
                })
                return options
            })
        })
        return {
            ...toRefs(data),
            ...propertyMixin,
        }
    }
});
</script>