<template>
  <Draggable tag="div" item-key="type" ghostClass="ghost" :group="{ name: 'default', pull: 'clone', put: false }"
    :sort="false" :list="list" class="widget-layout">
    <template #item="{ element }">
      <div class="widget-layout-item">
        <div class="widget-layout-item__icon">
          <n-icon-wrapper :size="32">
            <n-icon :size="24">
              <SvgIcon :type="element.type" />
            </n-icon>
          </n-icon-wrapper>
        </div>
        <div class="widget-layout-item__name">
          <n-ellipsis>
            {{ element.label }}
          </n-ellipsis>
        </div>
      </div>
    </template>
  </Draggable>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Draggable from 'vuedraggable'
import SvgIcon from './SvgIcon.vue'

export default defineComponent({
  name: 'ComponentGroup',
  components: {
    Draggable,
    SvgIcon
  },
  props: {
    fields: {
      type: Array as PropType<Array<string>>,
      required: true
    },
    list: {
      type: Array,
      required: true,
      default: () => []
    },
  },
})
</script>

<style lang="less">
div.widget-layout {
  padding: 5px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;

  div.widget-layout-item {
    width: 58px;
    height: 65px;
    margin: 1px;
    text-align: center;
    // background-color: #243F49;
    border: 1px solid var(--n-border-color);

    &:hover {
      border-style: dashed;
      border-width: 2px;
      border-color: var(--app-border-color);
      color: var(--app-text-color-base);
      cursor: move;
    }


    .widget-layout-item__icon {
      height: 38px;
      padding: 5px;
    }

    .widget-layout-item__name {
      font-size: 8px;
      padding: 2px;
      height: 25px;
    }
  }

}
</style>