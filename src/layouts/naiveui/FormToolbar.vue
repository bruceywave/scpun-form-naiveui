<template>
  <div class="designer-toolbar">
    <n-space>
      <n-button-group>
        <n-button>撤销</n-button>
        <n-button>恢复</n-button>
      </n-button-group>
      <n-button-group>
        <n-button>PC</n-button>
        <n-button>PAD</n-button>
        <n-button>H5</n-button>
      </n-button-group>
    </n-space>
    <n-space>
      <n-button type="primary" text>清空</n-button>
      <n-button type="primary" text>预览</n-button>
      <n-button type="primary" text>导入JSON</n-button>
      <n-button type="primary" text>生成JSON</n-button>
      <n-button type="primary" text>生成代码</n-button>
    </n-space>
  </div>
</template>

<style lang="less" scoped>
.designer-toolbar {
  height: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 10px;
  padding-right: 10px;
  border-bottom: 1px solid var(--n-border-color);
}
</style>