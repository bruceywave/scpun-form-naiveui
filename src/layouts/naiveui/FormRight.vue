<template>
  <div class="designer-right">
    <n-tabs type="segment" justify-content="space-evenly">
      <n-tab-pane name="fieldProperty" tab="组件属性" style="padding: 5px;">
        <n-space vertical :size="5">
          <n-card :content-style="{ padding: '10px' }">
            <n-scrollbar class="designer-right-field__scrollbar">
              <form-widget-config v-if="selectData" v-model:select="selectData" />
              <n-empty v-else description="当前无任何组件" />
            </n-scrollbar>
          </n-card>
        </n-space>
      </n-tab-pane>
      <n-tab-pane name="formProperty" tab="表单属性" style="padding: 5px;">
        <n-card :content-style="{ padding: '10px' }">
          <n-scrollbar class="designer-right-form__scrollbar">
            <form-config v-model:config="data.config" />
          </n-scrollbar>
        </n-card>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<script lang="ts">
import { WidgetForm } from '/@/config/naiveui/types';

export default defineComponent({
  name: 'FormRight',
  props: {
    widgetForm: {
      type: Object as PropType<WidgetForm>,
      require: true,
    },
    widgetFormSelect: {
      type: Object as PropType<WidgetForm>,
      require: true,
    },
  },
  emits: ['update:select'],
  setup(props, _context) {
    const data = ref<WidgetForm>(props.widgetForm as unknown as WidgetForm)
    const selectData = ref<WidgetForm>(props.widgetFormSelect as unknown as WidgetForm)
    watch(
      () => props.widgetFormSelect,
      (val) => {
        selectData.value = val as unknown as WidgetForm
      }
    )
    return {
      data,
      selectData
    }
  }
})
</script>

<style lang="less" scoped>
.designer-right {

  :deep(.n-tabs-rail) {
    border-bottom: 1px solid var(--n-tab-border-color);
  }

}
</style>

<style lang="less">
.designer-right {

  &-field__scrollbar {
    height: calc(100vh - 122px) !important;
  }

  &-form__scrollbar {
    height: calc(100vh - 122px) !important;
  }
}
</style>