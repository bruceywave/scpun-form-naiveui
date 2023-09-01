<template>
  <div class="scpun-form-designer">
    <n-layout>
      <!-- 头部区域开始 -->
      <n-layout-header class="scpun-form-designer__header">
        <FormHeader @updateTheme="changeTheme"/>
      </n-layout-header>
      <!-- 头部区域结束 -->

      <n-layout has-sider>

        <!-- 左边区域开始 -->
        <n-layout-sider collapse-mode="transform" show-trigger="bar" bordered>
          <FormLeft />
        </n-layout-sider>
        <!-- 左边区域结束 -->

        <n-layout has-sider sider-placement="right">
          <n-layout>
            <!-- 工具栏区域开始 -->
            <n-layout-header>
              <FormToolbar />
            </n-layout-header>
            <!-- 工具栏区域结束 -->

            <!-- 内容区域开始 -->
            <n-layout-content class="scpun-form-designer__content" :class="{ 'widget-empty': widgetForm.list }">
              <FormWidgetPane ref="widgetFormRef" v-model:widgetForm="widgetForm"
                v-model:widgetFormSelect="widgetFormSelect" />
            </n-layout-content>
            <!-- 内容区域结束 -->
          </n-layout>

          <!-- 右边区域开始 -->
          <n-layout-sider collapse-mode="transform" show-trigger="bar" bordered>
            <FormRight />
          </n-layout-sider>
          <!-- 右边区域结束 -->
        </n-layout>
      </n-layout>
    </n-layout>
  </div>
</template>

<script lang="ts">
import { useI18n } from '../../locale/useI18n';
import FormHeader from './FormHeader.vue';
import FormLeft from './FormLeft.vue';
import FormRight from './FormRight.vue';
import FormToolbar from './FormToolbar.vue';
import { naiveui } from '/@/config';

export default defineComponent({
  name: 'FormDesigner',
  components: {
    FormHeader,
    FormLeft,
    FormRight,
    FormToolbar
  },
  emits: ['updateTheme'],
  setup(_props, context) {

    // 定义国际化语言
    const { t } = useI18n()

    // 定义数据
    const data = reactive({
      widgetForm: JSON.parse(JSON.stringify(naiveui.widgetForm)),
      widgetFormSelect: undefined,
    })

    function changeTheme(theme) {
      context.emit('updateTheme', theme)
    }


    return {
      ...toRefs(data),
      t,
      changeTheme
    }
  }
})




</script>

<style lang="less">
.scpun-form-designer {
  height: 100vh;

  &__header {
    height: 50px;
    border-bottom: 1px solid var(--n-border-color);
    display: flex;
    align-items: center;
    padding: 5px;
    justify-content: space-between;

    .header-logo {
      color: var(--app-text-color-base);
      display: flex;
      align-items: center;

      img {
        width: 40px;
        height: 40px;
        display: inline-block;
      }

      .header-title {
        padding: 5px;
        font-weight: 600;
        font-size: 24px;

        span {
          font-size: 18px;
        }
      }
    }
  }

  &__content {
    height: calc(100vh - 90px);
    background: var(--app-border-color);
    padding: 20px;
    // border-top: 2px solid #ccc;
  }

  &__drag {
    overflow: auto;
    padding: 2px;
    box-sizing: border-box;
  }

  &__drag,
  .draggable-drag {
    background: #fff;
    height: 100%;
    position: relative;
  }

  &__drag>form,
  &__drag>form>.n-row {
    height: 100%;
  }
}
</style>