<template>
  <n-form label-placement="left" :key="data.key" :label-width="70" size="small" label-align="left">
    <n-form-item label="字段标识">
      <n-input placeholder="字段标识" v-model:value="data.model" />
    </n-form-item>
    <n-form-item label="标题">
      <n-input placeholder="标题" v-model:value="data.label" />
    </n-form-item>
    <n-form-item label="宽度">
      <n-input placeholder="宽度(%,px,em等)" v-model:value="data.options.width" />
    </n-form-item>
    <n-form-item label="占位内容">
      <n-input placeholder="占位内容" v-model:value="data.options.placeholder" />
    </n-form-item>
    <n-form-item label="默认内容">
      <n-input placeholder="请输入默认内容" v-model:value="data.options.defaultValue" />
    </n-form-item>
    <n-form-item label="长度限制">
      <n-input-group>
        <n-input-number :show-button="false" placeholder="最大长度" v-model:value="data.options.maxLength" />
        <n-input-number :show-button="false" placeholder="最小长度" v-model:value="data.options.minLength" />
      </n-input-group>
    </n-form-item>
    <n-form-item label="大小限制">
      <n-input-group>
        <n-input-number :show-button="false" placeholder="最小值" v-model:value="data.options.max" />
        <n-input-number :show-button="false" placeholder="最大值" v-model:value="data.options.min" />
      </n-input-group>
    </n-form-item>
    <n-form-item label="步长">
      <n-input-group>
        <n-input-number placeholder="步长" v-model:value="data.options.step" min="0" />
      </n-input-group>
    </n-form-item>
  </n-form>
</template>


<script lang="ts">
export default defineComponent({
  name: 'FormWidgetConfig',
  props: {
    select: {
      type: Object
    },
    request: {
      type: Function,
      default: () => ({})
    }
  },
  setup(props, context) {
    const data = ref<any>(props.select)

    watch(
      () => props.select,
      (val) => data.value = val
    )

    watch(data, (val) => context.emit('update:select', val))

    return {
      data
    }
  }
})
</script>