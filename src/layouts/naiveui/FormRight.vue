<template>
  <div class="designer-right">
    <n-tabs type="segment" justify-content="space-evenly">
      <n-tab-pane name="fieldProperty" tab="组件属性" style="padding: 5px;">
        <n-space vertical :size="5">
          <n-card :content-style="{ padding: '10px' }">
            <n-scrollbar class="designer-right-field__scrollbar">
              112<br />
              112<br />
              112<br />
              112<br />
              112<br />
              112<br />
              112<br />
              112<br />
              112<br />
              112<br />
              112<br />
              112<br />
              112<br />
              112<br />
              112<br />
              112<br />
              112<br />
              112<br />
              112<br />
              112<br />
              112<br />
              112<br />
              112<br />
              112<br />
              112<br />
              112<br />
              112<br />
              112<br />
              112<br />
              112<br />
              112<br />
              112<br />
              112<br />
              112<br />
              112<br />
              112<br />
              112<br />
              112<br />
              112<br />
              112<br />
              112<br />
              112<br />
              112<br />
              112<br />
            </n-scrollbar>
          </n-card>
        </n-space>
      </n-tab-pane>
      <n-tab-pane name="formProperty" tab="表单属性" style="padding: 5px;">
        <n-card :content-style="{ padding: '10px' }">
          <n-scrollbar class="designer-right-form__scrollbar">
            112<br />
            112<br />
            112<br />
            112<br />
            112<br />
            112<br />
            112<br />
            112<br />
            112<br />
            112<br />
            112<br />
            112<br />
            112<br />
            112<br />
            112<br />
            112<br />
            112<br />
            112<br />
            112<br />
            112<br />
            112<br />
            112<br />
            112<br />
            112<br />
            112<br />
            112<br />
            112<br />
            112<br />
            112<br />
            112<br />
            112<br />
            112<br />
            112<br />
            112<br />
            112<br />
            112<br />
            112<br />
            112<br />
            112<br />
            112<br />
            112<br />
            112<br />
            112<br />
            112<br />
          </n-scrollbar>
        </n-card>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

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