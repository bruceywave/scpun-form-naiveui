<template>
  <div class="widget-item-container">
    <n-form-item v-if="element" class="widget-view" :key="element.key"
      :class="{ active: selectWidget?.key === element.key }" :label="element.label" :rules="element.options.rules">
      <!-- 输入框组件 -->
      <template v-if="element.type === 'input'">
        <n-input readonly :size="((config.size || 'medium') as Size)" :autosize="element.options.autosize"
          :value="element.options.defaultValue" :style="{ width: element.options.width }"
          :placeholder="element.options.placeholder" :maxlength="element.options.maxlength"
          :minlength="element.options.minlength" :clearable="element.options.clearable"
          :disabled="element.options.disabled" />
      </template>

      <!-- 密码框 -->
      <template v-if="element.type === 'password'">
        <n-input type="password" readonly :size="((config.size || 'medium') as Size)" :autosize="element.options.autosize"
          :value="element.options.defaultValue" :style="{ width: element.options.width }"
          :placeholder="element.options.placeholder" :maxlength="element.options.maxlength"
          :minlength="element.options.minlength" :clearable="element.options.clearable"
          :disabled="element.options.disabled" :showPasswordOn="element.options.showPasswordOn" />
      </template>

      <!-- 多行文本框 -->
      <template v-if="element.type === 'textarea'">
        <n-input type="textarea" readonly :size="((config.size || 'medium') as Size)" :autosize="element.options.autosize"
          :value="element.options.defaultValue" :style="{ width: element.options.width }"
          :placeholder="element.options.placeholder" :maxlength="element.options.maxlength"
          :minlength="element.options.minlength" :clearable="element.options.clearable"
          :disabled="element.options.disabled" />
      </template>

      <!-- 计数器 -->
      <template v-if="element.type === 'number'">
        <n-input-number readonly :size="((config.size || 'medium') as Size)" :autosize="element.options.autosize"
          :value="element.options.defaultValue" :style="{ width: element.options.width }"
          :placeholder="element.options.placeholder" :max="element.options.max" :min="element.options.min"
          :clearable="element.options.clearable" :disabled="element.options.disabled" />
      </template>

      <!-- 单选框组 -->
      <template v-if="element.type === 'radio'">
        <n-radio-group readonly :size="config.size || 'medium'" :value="element.options.defaultValue"
          :style="{ width: element.options.width }" :disabled="element.options.disabled">
          <template v-if="element.options.type === 'radio'">
            <n-radio v-for="item of element.options.remote
              ? element.options.remoteOptions
              : element.options.options" :key="item.value" :value="item.value">
              {{ element.options.showLabel ? item.label : item.value }}
            </n-radio>
          </template>

          <template v-if="element.options.type === 'button'">
            <n-radio-button v-for="item of element.options.remote
              ? element.options.remoteOptions
              : element.options.options" :key="item.value" :value="item.value">
              {{ element.options.showLabel ? item.label : item.value }}
            </n-radio-button>
          </template>
        </n-radio-group>
      </template>

      <!-- 多选框组 -->
      <template v-if="element.type === 'checkbox'">
        <n-checkbox-group :value="element.options.defaultValue"
          :style="{ width: element.options.width }"
          :disabled="element.options.disabled">
          <n-checkbox v-for="item of element.options.remote
              ? element.options.remoteOptions
              : element.options.options"
            :key="item.value"
            :value="item.value">
            {{ element.options.showLabel ? item.label : item.value }}
          </n-checkbox>
        </n-checkbox-group>
      
      </template>


    </n-form-item>

    <div class="widget-view-action" v-if="selectWidget?.key === element.key">
      <SvgIcon type="copy" @click.stop="$emit('copy')" />
      <SvgIcon type="delete" @click.stop="$emit('delete')" />
    </div>

    <div class="widget-view-drag" v-if="selectWidget?.key === element.key">
      <SvgIcon type="move" className="drag-widget" />
    </div>
  </div>
</template>

<script lang="ts">
import { WidgetForm } from '/@/config/naiveui';
import moment from 'moment';
import RichTextEditor from '/@/components/RichTextEditor.vue'
import { Size } from 'naive-ui/es/select/src/interface';
import SvgIcon from '/@/components/SvgIcon.vue';

export default defineComponent({
  name: 'FormWidgetPaneItem',
  components: {
    RichTextEditor,
    SvgIcon
  },
  props: {
    config: {
      type: Object as PropType<WidgetForm['config']>,
      required: true
    },
    element: {
      type: Object,
      required: true
    },
    selectWidget: {
      type: Object
    }
  },
  emits: ['copy', 'delete'],
  setup() {
    const handleFilterOption = (input: string, option: { label: string }) =>
      option.label.toLowerCase().includes(input)

    return {
      handleFilterOption,
      moment
    }
  }
})
</script>

<style lang="less" scoped>
.widget-item-container {
  position: relative;

  :deep(.n-form-item) {
    padding-bottom: 0 !important;
  }

}
</style>