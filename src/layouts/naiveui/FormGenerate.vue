<template>
  <div class="scpun-designer-generate">
    <n-form ref="generateForm" :model="model" :rules="rules" 
      :label-align="widgetForm.config.labelAlign"
      :label-placement="widgetForm.config.lablePlacement"
      :show-require-mark="widgetForm.config.hideRequiredMark">
      <template v-for="(element, _index) of widgetForm.list">
        <FormGenerateItem v-model:model="model" :element="element" :config="data.config" :disabled="disabled" />
      </template>
    </n-form>
  </div>
</template>

<script lang="ts">

import FormGenerateItem from './FormGenerateItem.vue';
import { naiveui } from '/@/config';

export default defineComponent({
  name: 'FormGenerate',
  components: {
    FormGenerateItem,
  },
  props: {
    data: {
      type: Object,
      default: () => naiveui.widgetForm
    },
    value: {
      type: Object
    },
    disabled: {
      type: Boolean,
      default: () => false,
    },
    submitFunc: {
      type: Function
    },
    requestFunc: {
      type: Function,
      default: () => ({}),
      required: false,
    }
  },
  setup(props) {
    const formState = reactive({
      generateForm: null as any,
      model: {} as any,
      rules: {} as any,
      widgetForm: (props.data && JSON.parse(JSON.stringify(props.data))) ?? naiveui.widgetForm
    })

    function getData() {
      return new Promise((resolve, reject) => {
        formState.generateForm?.validate((errors) => {
          if (!errors) {
            resolve(formState.model)
          }
        }).catch((error: Error) => {
          reject(error)
        })
      })
    }

    return {
      ...toRefs(formState),
      getData
    }
  }
})
</script>