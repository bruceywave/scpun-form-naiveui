<template>
  <div class="scpun-form-designer">
    <n-layout>
      <!-- 头部区域开始 -->
      <n-layout-header class="scpun-form-designer__header">
        <FormHeader @updateTheme="changeTheme" />
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
              <FormToolbar @preview="handlePreview" @generateJson="handleGenerateJson" @generateCode="handleGenerateCode"
                @clearable="handleClearable" />
            </n-layout-header>
            <!-- 工具栏区域结束 -->

            <!-- 内容区域开始 -->
            <n-layout-content class="scpun-form-designer__content" :class="{ 'widget-empty': widgetForm.list }">
              <FormWidgetPane ref="widgetFormRef" v-model:widgetForm="widgetForm"
                v-model:widget-form-select="widgetFormSelect" />
            </n-layout-content>
            <!-- 内容区域结束 -->
          </n-layout>

          <!-- 右边区域开始 -->
          <n-layout-sider collapse-mode="transform" show-trigger="bar" bordered :width="300">
            <FormRight :widget-form="widgetForm" v-model:widget-form-select="widgetFormSelect" />
          </n-layout-sider>
          <!-- 右边区域结束 -->
        </n-layout>
      </n-layout>
    </n-layout>


    <!-- 预览数据窗体 -->
    <n-modal v-model:show="previewVisible" :segmented="true" style="width: 800px" title="表单预览" preset="card" size="small"
      :show-icon="false" transform-origin="center" content-style="overflow:auto;max-height: 50vh;;">
      <div>
        <FormGenerate v-if="widgetForm.list?.length" ref="formGenerateRef" :data="widgetForm" />
        <div v-else style="display: flex;align-items: center;justify-content: center;flex: 1;min-height: 20vh;">
          <n-empty  description="当前没有任何组件，请设计" />
        </div>
      </div>
      <template #footer>
        <n-space justify="center">
          <n-button @click="handlePreviewCancle">
            取消
          </n-button>
          <n-button @click="handlePreviewReset" type="success">
            重置
          </n-button>
          <n-button type="primary" @click="handlePreviewData">
            获取数据
          </n-button>
        </n-space>
      </template>
    </n-modal>

    <!-- 获取数据窗体 -->
    <n-modal v-model:show="dataJsonVisible" :segmented="true" style="width: 800px" title="表单数据" preset="card" size="small"
      :show-icon="false" transform-origin="center">
      <n-card>
        <n-code language="json" :code="dataJsonTemplate" :word-wrap="true" show-line-numbers />
      </n-card>
    </n-modal>

    <!-- 生成JSON窗体-->
    <n-modal v-model:show="generateJsonVisible" :segmented="true" style="width: 800px" title="生成JSON" preset="card"
      size="small" :show-icon="false" transform-origin="center">
      <n-card>
        <n-code language="json" :code="generateJsonTemplate" :word-wrap="true" show-line-numbers />
      </n-card>
    </n-modal>

    <!-- 生成代码窗体 -->
    <n-modal v-model:show="dataCodeVisible" :segmented="true" style="width: 800px" title="生成JSON" preset="card"
      size="small" :show-icon="false" transform-origin="center">
      <n-tabs v-model:value="codeLanguage" type="card">
        <n-tab-pane tab="Vue3组件" :name="CodeType.Vue">
          <n-card>
            <n-code language="html" :code="dataCodeTemplate" :word-wrap="true" show-line-numbers />
          </n-card>
        </n-tab-pane>
        <n-tab-pane tab="HTML" :name="CodeType.Html">
          <n-card>
            <n-code language="html" :code="dataCodeTemplate" :word-wrap="true" show-line-numbers />
          </n-card>
        </n-tab-pane>
      </n-tabs>
    </n-modal>
  </div>
</template>

<script lang="ts">
import { merge } from 'lodash-es';
import { useI18n } from '../../locale/useI18n';
import { naiveui } from '/@/config';
import { CodeType, PlatformType } from '/@/enums';
import generateCode from '/@/utils/generateCode';

export default defineComponent({
  name: 'FormDesigner',
  components: {},
  emits: ['updateTheme'],
  setup(_props, context) {

    // 定义国际化语言
    const { t } = useI18n()

    // 定义数据
    const state = reactive({
      widgetForm: JSON.parse(JSON.stringify(naiveui.widgetForm)),
      widgetFormSelect: undefined,
      codeLanguage: CodeType.Vue,
      previewVisible: false,
      dataJsonVisible: false,
      generateJsonVisible: false,
      dataCodeVisible: false,
      formGenerateRef: null,
      dataJsonTemplate: '',
      generateJsonTemplate: JSON.stringify(naiveui.widgetForm, null, 2),
      dataCodeTemplate: '',
    })

    function changeTheme(theme) {
      context.emit('updateTheme', theme)
    }

    function handlePreview() {
      state.previewVisible = true
    }
    function handlePreviewCancle() {
      state.previewVisible = false
    }
    function handlePreviewReset() {

    }
    function handlePreviewData() {
      // @ts-expect-error
      state.formGenerateRef?.getData().then((data) => {
        state.dataJsonTemplate = JSON.stringify(data, null, 2)
        console.log(state.dataJsonTemplate)
        state.dataJsonVisible = true
      })
    }

    function handleGenerateJson() {
      (state.generateJsonTemplate = JSON.stringify(
        state.widgetForm,
        null,
        2
      )) && (state.generateJsonVisible = true)

    }

    watchEffect(() => {
      if (state.dataCodeVisible) {
        state.dataCodeTemplate = generateCode(
          state.widgetForm,
          state.codeLanguage,
          PlatformType.NaiveUI
        )!
      }
    })

    function handleGenerateCode() {
      state.codeLanguage = CodeType.Vue
      state.dataCodeVisible = true
    }

    const handleClearable = () => {
      state.widgetForm.list = []
      merge(state.widgetForm, JSON.parse(JSON.stringify(naiveui.widgetForm)))
      state.widgetFormSelect = undefined
    }

    provide("designerData", toRefs(state))
    provide("handlePreview", handlePreview)
    provide("handlePreviewCancle", handlePreviewCancle)
    provide("handlePreviewReset", handlePreviewReset)
    provide("handlePreviewData", handlePreviewData)
    provide("handleGenerateJson", handleGenerateJson)
    provide("handleGenerateCode", handleGenerateCode)
    provide("handleClearable", handleClearable)

    return {
      ...toRefs(state),
      t,
      CodeType,
      changeTheme,
      handlePreview,
      handlePreviewCancle,
      handlePreviewReset,
      handlePreviewData,
      handleGenerateJson,
      handleGenerateCode,
      handleClearable
    }
  }
})




</script>

<style lang="less" scoped>
:deep(.n-card__content) {
  pre.__code__ {
    max-height: 50vh;
    overflow: auto;
  }
}
</style>

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