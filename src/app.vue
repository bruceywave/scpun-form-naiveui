
<template>
  <n-config-provider :theme="naiveTheme" :locale="locale" :theme-overrides="themeOverrides">
    <DesignConfigure>
      <NaiveDesignForm @update-theme="changeTheme" />
    </DesignConfigure>

  </n-config-provider>
</template>

<script setup lang="ts">
import { darkTheme, lightTheme, useOsTheme } from 'naive-ui';
import { BuiltInGlobalTheme } from 'naive-ui/es/themes/interface';
import { NaiveDesignForm } from '../src';
import { getNaiveLocale } from '../src/utils/localeUtils';

const naiveTheme = ref<BuiltInGlobalTheme>()

const osThemeRef = useOsTheme()

const locale = getNaiveLocale()

const themeOverrides = ref({
  common: {
    primaryColor: '#409eff'
  }
})


function changeTheme(currentTheme: string) {
  if (currentTheme === 'lightTheme') {
    naiveTheme.value = lightTheme
  } else if (currentTheme === 'darkTheme') {
    naiveTheme.value = darkTheme
  } else {
    naiveTheme.value = osThemeRef.value === 'dark' ? darkTheme : lightTheme
  }
}
</script>

<style scoped></style>