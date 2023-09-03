<template>
  <n-space justify="space-between" style="width: 100%;">
    <div class="header-logo">
      <img src="/@/assets/logo.png" />
      <span class="header-title">NaivueUI <span>表单设计器</span> </span>
    </div>
    <div style="display: flex; align-items: center; flex: 1; height: 100%;">
      <n-radio-group v-model:value="currentTheme" @update:value="handleChangeTheme">
        <n-radio-button value="lightTheme">
          亮色主题
        </n-radio-button>
        <n-radio-button value="darkTheme">
          黑色主题
        </n-radio-button>
        <n-radio-button value="systemTheme">
          跟随系统
        </n-radio-button>
      </n-radio-group>
    </div>
  </n-space>
</template>

<script lang="ts">

export default defineComponent({
  name: 'FormHeader',
  emits: ['updateTheme'],
  setup(_props, context) {
    const currentTheme = ref('lightTheme')

    const handleChangeTheme = function (theme) {
      currentTheme.value = theme
      context.emit('updateTheme', theme)
    }
    return {
      currentTheme,
      handleChangeTheme
    }
  }
})

</script>