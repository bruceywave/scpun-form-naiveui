<template>
  <n-form-item v-if="element" :key="element.key" :label="element.label" :path="element.model">
    <template v-if="element.type === 'input'">
      <n-input v-model:value="data" :size="(config.size as Size)" :placeholder="element.options.placeholder"
        :style="{ width: element.options.width }"
        :maxlength="element.options.maxLength"
        :minlength="element.options.minLength"
        :clearable="element.options.clearable"
        :readonly="element.options.readonly"
        :disabled="element.options.disabled"/>
    </template>
  </n-form-item>
</template>

<script lang="ts">
import moment from 'moment';
import { WidgetForm } from '/@/config/naiveui';
import { Size } from 'naive-ui/es/input/src/interface';

export default defineComponent({
  name: 'FormGenerateItem',
  components: {},
  props: {
    config: {
      type: Object as PropType<WidgetForm['config']>,
      required: true
    },
    element: {
      type: Object,
      required: true,
    },
    model: {
      type: Object,
      required: true
    },
    disabled: {
      type: Boolean,
      required: true
    }
  },
  emits: ['update:model'],
  setup(props, context) {
    const data = computed({
      get: () => {
        if (props.element.type === 'date' || props.element.type === 'time') {
          if (props.element.options.valueFormat) {
            return (
              props.model[props.element.model] &&
              moment(
                props.model[props.element.model],
                props.element.options.valueFormat
              ).format(props.element.options.valueFormat)
            )
          } else {
            return (
              props.model[props.element.model] && moment(props.model[props.element.model])
            )
          }
        } else {
          return props.model[props.element.model]
        }
      },
      set: (val) => {
        const model = JSON.parse(JSON.stringify(props.model))
        if (val === null) {
          model[props.element.model] = undefined
        } else {
          model[props.element.model] = val
        }
        context.emit('update:model', model)
      }
    })
    const handleFilterOption = (input: string, option: { label: string }) =>
      option.label.toLowerCase().includes(input)

    const handleUploadChange = ({ fileList }: any) => {
      data.value = fileList
    }

    return {
      data,
      handleFilterOption,
      handleUploadChange
    }
  }
})
</script>