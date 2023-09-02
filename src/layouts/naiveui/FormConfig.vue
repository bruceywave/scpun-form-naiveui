<template>
  <div class="form-config-container">
    <n-form size="small" label-placement="left" :label-width="80" label-align="left" :model="data">
      <n-form-item label="表单布局">
        <n-radio-group v-model:value="data.inline">
          <n-radio-button :value="true">
            行内布局
          </n-radio-button>
          <n-radio-button :value="false">
            垂直布局
          </n-radio-button>
        </n-radio-group>
      </n-form-item>

      <n-form-item label="标签位置">
        <n-radio-group v-model:value="data.lablePlacement">
          <n-radio-button value="top">
            上方
          </n-radio-button>
          <n-radio-button value="left">
            左边
          </n-radio-button>
        </n-radio-group>
      </n-form-item>

      <n-form-item label="标签对齐">
        <n-radio-group v-model:value="data.labelAlign">
          <n-radio-button value="left">
            左对齐
          </n-radio-button>
          <n-radio-button value="right">
            右对齐
          </n-radio-button>
        </n-radio-group>
      </n-form-item>

      <n-form-item label="标签宽度">
        <n-input-number v-model:value="(data.lableWidth as number)" placeholder="请输入标签宽度" clearable>
          <template #prefix>
            <n-checkbox v-model:checked="data.lableWidth" checked-value="auto" @update:checked="(checked) => {
              if (checked) {
                data.lableWidth = 'auto'
              } else {
                data.lableWidth = 120
              }
            }">自动</n-checkbox>
          </template>
        </n-input-number>

      </n-form-item>

      <n-form-item label="显示标签">
        <n-radio-group v-model:value="data.showLabel">
          <n-radio-button :value="true">
            显示
          </n-radio-button>
          <n-radio-button :value="false">
            隐藏
          </n-radio-button>
        </n-radio-group>
      </n-form-item>

      <n-form-item label="组件尺寸">
        <n-radio-group v-model:value="data.size">
          <n-radio-button value="small">
            小
          </n-radio-button>
          <n-radio-button value="medium">
            中等
          </n-radio-button>
          <n-radio-button value="large">
            大
          </n-radio-button>
        </n-radio-group>
      </n-form-item>

      <n-form-item label="必填标记">
        <n-switch v-model:value="data.hideRequiredMark" :round="false" :checked-value="true" :unchecked-value="false">
          <template #checked>
            显示
          </template>
          <template #unchecked>
            隐藏
          </template>
        </n-switch>
      </n-form-item>
    </n-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
import { WidgetForm } from '/@/config/naiveui'

export default defineComponent({
  name: 'AntdFormConfig',
  props: {
    config: {
      type: Object as PropType<WidgetForm['config']>,
      required: true
    }
  },
  emits: ['update:config'],
  setup(props, context) {

    const data = ref<WidgetForm['config']>(props.config)

    watch(data, () => context.emit('update:config', data))

    return {
      data
    }
  }
})
</script>
