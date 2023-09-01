<template>
  <slot />
</template>

<script setup lang="ts" name="DesignConfigure">
import { useCssVar } from '@vueuse/core';
import { kebabCase } from "lodash-es";
import { useThemeVars } from "naive-ui";

const prefix = '--app'

const themeVars = useThemeVars()
const cssVarsMap = new Map()

const cssVarsList: [string, string?][] = [
  ['primaryColor'],
  ['borderColor'],
  ['textColorBase'],
  ['primaryColorHover'],
  ['primaryColorPressed'],
  ['primaryColorSuppl'],
  ['textColorBase', 'textColor'],
  ['textColor1'],
  ['textColor2'],
  ['textColor3'],
  ['bodyColor'],
  ['borderColor'],
  ['hoverColor'],
  ['pressedColor'],
  ['cubicBezierEaseInOut', 'bezier'],
  ['cubicBezierEaseIn', 'bezier-in'],
  ['cubicBezierEaseOut', 'bezier-out'],
]

const el = document.documentElement

for (const item of cssVarsList)
  cssVarsMap.set(...genCssVarMapParameters(...item))

function genCssVarMapParameters(keyName: string, alias?: string) {
  return [useCssVar(`${prefix}-${kebabCase(alias ?? keyName)}`, el), keyName] as const
}

watch(
  themeVars,
  (list) => {
    for (const [key, val] of cssVarsMap)
      key.value = list[val] ?? val
  },
  { immediate: true },
)


</script>