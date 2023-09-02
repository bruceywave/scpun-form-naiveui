<template>
  <div class="designer-left">
    <n-tabs type="segment" justify-content="space-evenly">
      <n-tab-pane name="widgets" tab="表单组件" style="padding: 5px;">
        <n-space vertical :size="5">
          <n-input-group>
            <n-input placeholder="请输入组件过滤">
            </n-input>
            <n-button>
              过滤
            </n-button>
          </n-input-group>
          <n-card :content-style="{ padding: 0 }">
            <n-scrollbar class="designer-left-widgets__scrollbar">
              <n-collapse arrow-placement="right" :default-expanded-names="expandedCollapse">
                <n-collapse-item title="基础组件" name="basic">
                  <ComponentGroup :fields="basicFields" :list="naiveui.basicComponents"/>
                </n-collapse-item>
                <n-collapse-item title="高级组件" name="advance">
                  <ComponentGroup :fields="advanceFields" :list="naiveui.advanceComponents"/>
                </n-collapse-item>
                <n-collapse-item title="布局组件" name="layout">
                  <ComponentGroup :fields="layoutFields" :list="naiveui.layoutComponents"/>
                </n-collapse-item>
              </n-collapse>
            </n-scrollbar>
          </n-card>
        </n-space>
      </n-tab-pane>
      <n-tab-pane name="templates" tab="表单模版" style="padding: 5px;">
        <n-card :content-style="{ padding: '10px' }">
          <n-scrollbar class="designer-left-templates__scrollbar">
            <n-empty description="表单模版，待开发" />
          </n-scrollbar>
        </n-card>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<script setup lang="ts" name="FormLeft">
import { naiveui } from '/@/config';
import ComponentGroup from '/@/components/ComponentGroup.vue';

// import draggable from 'vuedraggable';
// import { useI18n } from '../../composables/useI18n';

// const { t } = useI18n()

defineProps({
  basicFields: {
    type: Array as PropType<Array<string>>,
    default: () => [
      'input',
      'password',
      'textarea',
      'number',
      'radio',
      'checkbox',
      'time',
      'date',
      'rate',
      'select',
      'switch',
      'slider',
      'text'
    ]
  },
  advanceFields: {
    type: Array as PropType<Array<string>>,
    default: () => ['img-upload', 'richtext-editor', 'cascader']
  },
  layoutFields: {
    type: Array as PropType<Array<string>>,
    default: () => ['grid']
  }
})

const expandedCollapse = ['basic', 'advance', 'layout']


</script>

<style lang="less" scoped>
.designer-left {

  :deep(.n-tabs-rail) {
    border-bottom: 1px solid var(--n-border-color);
  }

  :deep(.n-collapse-item) {
    margin: 0;

    .n-collapse-item__header {
      padding-top: 5px !important;
    }

    .n-collapse-item__header-main {
      justify-content: space-between;
      padding-left: 5px;
      padding-right: 5px;
      line-height: 30px;
      font-weight: 800 !important;
    }


    .n-collapse-item__content-inner {
      padding-top: 0 !important;
    }
  }

}
</style>

<style lang="less">
.designer-left {

  &-widgets__scrollbar {
    height: calc(100vh - 140px) !important;
    padding: 5px;
  }

  &-templates__scrollbar {
    height: calc(100vh - 122px) !important;
  }
}
</style>